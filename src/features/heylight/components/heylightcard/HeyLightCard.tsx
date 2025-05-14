import PaymentProviderCard from "../../../cdspayments/components/ui/paymentprovidercard/PaymentProviderCard.tsx";
import { HeyLightPaymentRequest, PaymentProviderCardProps } from "../../../cdspayments/types.ts";
import AgreementCheckBox from "../../../cdspayments/components/ui/agreementcheckbox/AgreementCheckBox.tsx";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useData } from "../../../../hoc/DataProvider.tsx";
import usePaymentStore from "../../../cdspayments/stores/paymentStore.ts";
import { calculateArtPayFee } from "../../../cdspayments/utils.ts";
import axios from "axios";
import IFrameHeyLight from "../iFrameHeyLight.tsx";


const paymentRequest: HeyLightPaymentRequest = {
  amount: {
    currency: "EUR",
    amount: "2000.00"
  },
  amount_format: "DECIMAL",
  redirect_urls: {
    success_url: "https://staging2.artpay.art/acquisto-esterno",
    failure_url: "https://staging2.artpay.art/acquisto-esterno"
  },
  customer_details: {
    email_address: "giacomo.bartoli@me.com",
    contact_number: "3513027045",
    first_name: "Giacomo",
    last_name: "Bartoli"
  },
  billing_address: {
    country_code: "IT",
    is_client_validated: false,
    address_line_1: "VIA TAORMINA 29",
    zip_code: "09045",
    city: "QUARTU SE"
  },
  shipping_address: {
    country_code: "IT",
    is_client_validated: false,
    address_line_1: "VIA TAORMINA 29",
    zip_code: "09045",
    city: "QUARTU SE"
  },
  store_id: "ecommerce",
  store_name: "ecommerce",
  store_number: "ecommerce",
  products: [
    {
      sku: "GD001",
      quantity: 1,
      price: "2000.00",
      name: "LOTTO 111"
    }
  ],
  pricing_structure_code: "PC6",
  language: "it"
};


const authorizationRequest = {
  merchant_key: "329fa1a44aae7e6271d444f1de3d6bc90c86caeb"
}

const HeyLightCard = ({subtotal, disabled, paymentSelected = true} : Partial<PaymentProviderCardProps>) => {
  const [fee, setFee] = useState<number>(0);
  const data = useData();
  const { setPaymentData, order, paymentIntent } = usePaymentStore();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handlingHeyLightSelection = async (): Promise<void> => {
    if (!order) return;
    setPaymentData({
      loading: true,
    });
    try {
      if (paymentIntent) {
        const updatePayment = await data.updatePaymentIntent({
          wc_order_key: order.order_key,
          payment_method: "heylight",
        });
        if (!updatePayment) throw new Error("Error during updating payment intent");

        setPaymentData({
          paymentMethod: "heylight",
          paymentIntent: updatePayment,
        });
      }

      const updateOrder = await data.updateOrder(order.id, { payment_method: "heylight", needs_processing: false });
      if (!updateOrder) throw new Error("Error during updating order");


      setPaymentData({
        paymentMethod: "heylight",
        paymentIntent: null,
        order: updateOrder,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setPaymentData({
        loading: false,
      });
    }
  };

  const abortHeyLightSelection = async (): Promise<void> => {
    if (!order) return;
    setPaymentData({
      loading: true,
    });
    try {
      if (paymentIntent) {
        const updatePayment = await data.updatePaymentIntent({
          wc_order_key: order?.order_key,
          payment_method: "bnpl",
        });
        if (!updatePayment) throw new Error("Error during updating payment intent");

        setPaymentData({
          paymentIntent: updatePayment,
        })
      }

      const updateOrder = await data.updateOrder(order.id, { payment_method: "bnpl" });
      if (!updateOrder) throw new Error("Error during updating payment intent");

      setPaymentData({
        paymentMethod: "bnpl",
        paymentIntent: null,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setPaymentData({
        loading: false,
      });
    }
  };

  const handlePayment = async () => {
    if (!order) return;
    setPaymentData({
      loading: true,
    });
    try {
      const authorization = await axios.post("/api-sandbox/auth/v1/generate/", authorizationRequest, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!authorization) throw new Error("Error during authorization");

      const createApplication = await axios.post("/api-sandbox/api/checkout/v1/init/", paymentRequest, {
        headers: {
          Authorization: `Bearer ${authorization.data.data.token}`,
        },
      });
      const redirectUrl = createApplication.data.redirect_url;
      if (redirectUrl) window.open(redirectUrl, "_blank");

    } catch (e) {
      console.error(e);
    } finally {
      setPaymentData({
        loading: false,
      });
    }
  };

  useEffect(() => {
    if (order) {
      const artpayFee = calculateArtPayFee(order);
      setFee(artpayFee);
    }
  }, [order]);


  return (
    <PaymentProviderCard cardTitle={'HeyLight'} backgroundColor={'bg-[#F8F8F8]'} subtitle={'Fino a € 5000.00. Commissioni artpay: 6%'} disabled={disabled} subtotal={subtotal}>
        <IFrameHeyLight />
      {!disabled && paymentSelected ? (
        <>
          <ul className={"space-y-4 py-4"}>
            <li className={"w-full flex justify-between"}>
              Subtotale: <span>€&nbsp;{subtotal?.toFixed(2)}</span>
            </li>
            <li className={"w-full flex justify-between"}>
              Commissioni artpay: <span>€&nbsp;{fee.toFixed(2)}</span>
            </li>
            <li className={"w-full flex justify-between"}>
              <strong>Totale:</strong> <strong>€&nbsp;{(Number(subtotal) + Number(fee)).toFixed(2)}</strong>
            </li>
          </ul>
          {order?.payment_method == "heylight" ? (
            <>
              <AgreementCheckBox isChecked={isChecked} handleChange={handleCheckBox} />
              <button
                onClick={handlePayment}
                className={"artpay-button-style bg-[#FF2B11] text-white py-3! disabled:opacity-65"}
                disabled={!isChecked}>
                Avvia richiesta prestito
              </button>
              <button className={"w-full flex justify-center mb-4 mt-8 cursor-pointer"} onClick={abortHeyLightSelection}>Annulla</button>
            </>
          ) : (
            <>
              <div className={"flex justify-center"}>
                <button className={'artpay-button-style bg-[#FF2B11] text-white py-3!'} onClick={handlingHeyLightSelection}>Continua con HeyLight</button>
              </div>
              <NavLink to={"/"} className={"text-tertiary underline underline-offset-2 mt-8 block"}>
                Scopri di più
              </NavLink>
            </>
          )}
        </>
      ) : (
        disabled ? (<></>) : (
          <span>
          Ci hai ripensato?{" "}
            <button className={"cursor-pointer"} disabled={disabled}>
            <strong className={"underline"} onClick={handlingHeyLightSelection}>Paga con HeyLight</strong>
          </button>
        </span>
        )
      )}
    </PaymentProviderCard>
  );
};

export default HeyLightCard;