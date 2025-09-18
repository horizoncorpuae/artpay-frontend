import { useCallback } from "react";
import { isAxiosError } from "axios";
import { useSnackbars } from "../../../hoc/SnackbarProvider.tsx";
import { useData } from "../../../hoc/DataProvider.tsx";
import useDirectPurchaseStore from "../stores/directPurchaseStore.ts";
import { areBillingFieldsFilled } from "../../../utils.ts";
import { useDirectPurchaseData } from "./useDirectPurchaseData.ts";

export const useDirectPurchaseUtils = () => {
  const snackbar = useSnackbars();
  const data = useData();
  const { createPaymentIntent } = useDirectPurchaseData();

  const {
    orderMode,
    pendingOrder,
    userProfile,
    artworks,
    updateState,
    updatePageData,
  } = useDirectPurchaseStore();

  const showError = useCallback(async (err?: unknown, text: string = "Si è verificato un errore"): Promise<void> => {
    if (isAxiosError(err) && err.response?.data?.message) {
      text = err.response?.data?.message;
    }
    snackbar.error(text, { autoHideDuration: 60000 });
  }, [snackbar]);

  const onChangePaymentMethod = useCallback(async (payment: string): Promise<void> => {
    console.log("payment method", payment);
    updateState({ showCommissioni: false, isSaving: true });

    if (pendingOrder) {
      const wc_order_key = pendingOrder.order_key;

      const paymentMethodMap: Record<string, string> = {
        card: "Carta",
        klarna: "Klarna",
        Santander: "Santander",
        bank_transfer: "Bonifico",
      };

      const displayName = paymentMethodMap[payment] || payment;

      try {
        // 1. Aggiorna il metodo di pagamento su WooCommerce prima
        if (pendingOrder.id) {
          await data.updateOrder(pendingOrder.id, {
            payment_method: payment,
            payment_method_title: displayName,
          });
        }

        // 2. Crea il payment intent con il metodo di pagamento specificato
        const newPaymentIntent = await createPaymentIntent(pendingOrder, orderMode, payment);
        updatePageData({ paymentIntent: newPaymentIntent });

        // 3. Aggiorna lo stato locale (usa il valore raw per il renderer)
        updateState({ paymentMethod: payment });

        // 4. Recupera l'ordine aggiornato da WooCommerce
        let order;
        if (orderMode === "redeem" && window.location.pathname.includes('order_id')) {
          const orderId = +window.location.pathname.split('/').pop()!;
          order = await data.getOrder(orderId);
        } else if (orderMode === "onHold") {
          order = await data.getOnHoldOrder();
        } else {
          order = await data.getPendingOrder();
        }
        if (order) {
          updatePageData({ pendingOrder: order });
          console.log("Order updated both locally and on WooCommerce:", order);
        }

        updateState({ showCommissioni: true, isSaving: false });
      } catch (e) {
        console.error("Update payment method error: ", e);
        await showError(e, "Errore durante l'aggiornamento del metodo di pagamento");
        updateState({ showCommissioni: false, isSaving: false });
      }
    } else {
      updateState({ isSaving: false });
    }
  }, [pendingOrder, orderMode, data, updateState, updatePageData, showError, createPaymentIntent]);

  const getCurrentShippingMethod = useCallback((): string => {
    return pendingOrder?.shipping_lines?.length
      ? pendingOrder.shipping_lines[0].method_id
      : "local_pickup";
  }, [pendingOrder]);

  const getEstimatedShippingCost = useCallback((): number => {
    return [0, ...artworks.map((a) => +(a.estimatedShippingCost || "0"))].reduce((a, b) => a + b);
  }, [artworks]);

  const getThankYouPage = useCallback((): string => {
    return orderMode === "loan"
      ? `/opera-bloccata/${artworks.length ? artworks[0].slug : ""}`
      : `/thank-you-page/${pendingOrder?.id}`;
  }, [orderMode, artworks, pendingOrder]);

  const getCheckoutEnabled = useCallback((): boolean => {
    const currentShippingMethod = getCurrentShippingMethod();
    const { checkoutReady, privacyChecked, isSaving } = useDirectPurchaseStore.getState();

    return !!(checkoutReady &&
      privacyChecked &&
      !isSaving &&
      (currentShippingMethod || (orderMode === "loan" && areBillingFieldsFilled(userProfile?.billing))));
  }, [getCurrentShippingMethod, orderMode, userProfile]);

  const getShippingPrice = useCallback((): number => {
    const currentShippingMethod = getCurrentShippingMethod();
    const estimatedShippingCost = getEstimatedShippingCost();
    return currentShippingMethod === "local_pickup" || !currentShippingMethod ? 0 : estimatedShippingCost || 0;
  }, [getCurrentShippingMethod, getEstimatedShippingCost]);

  const getCardContentTitle = useCallback((): string => {
    return "Dettagli dell'ordine";
  }, []);

  return {
    showError,
    onChangePaymentMethod,
    getCurrentShippingMethod,
    getEstimatedShippingCost,
    getThankYouPage,
    getCheckoutEnabled,
    getShippingPrice,
    getCardContentTitle,
  };
};