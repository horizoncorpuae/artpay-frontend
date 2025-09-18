import React from "react";
import { PiCreditCardThin } from "react-icons/pi";
import { Box, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm.tsx";
import ContentCard from "./ContentCard.tsx";
import { usePayments } from "../hoc/PaymentProvider.tsx";
import { useTheme } from "@mui/material";
import { PaymentIntent, StripePaymentElement } from "@stripe/stripe-js";
import StripePaymentSkeleton from "./StripePaymentSkeleton.tsx";
import PaymentProviderCard from "../features/cdspayments/components/ui/paymentprovidercard/PaymentProviderCard.tsx";
import Checkbox from "./Checkbox.tsx";
import { Link } from "react-router-dom";
import { useDirectPurchase } from "../features/directpurchase";
import { useDirectPurchaseUtils } from "../features/directpurchase/hooks/useDirectPurchaseUtils";

export interface PaymentCardProps {
  tabTitles?: string[]; // Nuova proprietà per i titoli delle tab
  onReady?: (element: StripePaymentElement) => any;
  onCheckout?: () => void;
  onChange?: (payment_method: string) => void;
  checkoutButtonRef?: React.RefObject<HTMLButtonElement>;
  paymentIntent?: PaymentIntent;
  auction?: boolean;
  thankYouPage?: string;
  orderMode: string;
  paymentMethod: string;
}

  const providerCardStyles = {
    card:{
      style: "!bg-[#EAF0FF] ",
      bgColor: "#EAF0FF"
    },
    klarna : {
      style: "!bg-[#FFE9EE] ",
      bgcolor: "#FFE9EE"
    }
  }

const PaymentCard: React.FC<PaymentCardProps> = ({
  paymentIntent,
  onReady,
  onCheckout,
  onChange,
  checkoutButtonRef,
  thankYouPage,
  paymentMethod = "",
}) => {
  const payments = usePayments();
  const theme = useTheme();


  const {privacyChecked, updateState, isSaving} = useDirectPurchase()
  const { onCancelPaymentMethod } = useDirectPurchaseUtils()

  if (!paymentIntent) return <StripePaymentSkeleton />;

  return (
    <ContentCard
      title="Metodi di pagamento"
      icon={<PiCreditCardThin size="28px" />}
      contentPadding={0}
      contentPaddingMobile={0}>
      {/* Tabs for switching payment methods */}

      <PaymentProviderCard backgroundColor={providerCardStyles[paymentMethod as keyof typeof providerCardStyles]?.style } >
        <Box>
          <Elements
            stripe={payments.stripe}
            options={{
              clientSecret: paymentIntent?.client_secret || undefined,
              loader: "always",
              appearance: {
                theme: "flat",
                variables: {
                  gridColumnSpacing: "24px",
                  colorBackground: "#fff",
                  colorText: "#808791",
                },
                rules: {
                  ".AccordionItem": {
                    border: "none",
                    backgroundColor: paymentMethod == "klarna" ? "#FFE9EE" : "#EAF0FF",
                    padding: "24px",
                  },
                  ".Input": {
                    border: "1px solid #CDCFD3",
                  },
                  ".Input:focus": {
                    boxShadow: "none",
                    borderColor: theme.palette.primary.main,
                    borderWidth: "2px",
                  },
                  ".Input:hover": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              },
            }}>
            <CheckoutForm
              paymentMethod={paymentMethod}
              ref={checkoutButtonRef}
              onReady={onReady}
              onCheckout={onCheckout}
              onChange={onChange}
              thankYouPage={thankYouPage}
            />
          </Elements>
        </Box>
        <div className={'w-full flex flex-col items-center gap-'}>
          <button
            className={"cursor-pointer disabled:cursor-not-allowed disabled:opacity-45 mb-4"}
            onClick={onCancelPaymentMethod}
            disabled={isSaving}
          >
            Annulla
          </button>
          <Checkbox
            disabled={isSaving}
            checked={privacyChecked}
            onChange={(e) => updateState({ privacyChecked: e.target.checked })}
            label={
              <Typography variant="body1">
                Accetto le{" "}
                <Link to="/condizioni-generali-di-acquisto" target="_blank">
                  condizioni generali d'acquisto
                </Link>
              </Typography>
            }
          />
        </div>
      </PaymentProviderCard>
    </ContentCard>
  );
};

export default PaymentCard;
