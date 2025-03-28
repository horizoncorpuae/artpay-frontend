import { Order } from "../../types/order.ts";

export const reverseFee = (order: Order): number => {
  return !order?.fee_lines.length ? Number(order?.total) / 1.06 : Number(order?.total) / 1.124658;
};

export const calculateKlarnaFee = (order: Order): number => {
  const initialValue = reverseFee(order);
  const klarnaFee = initialValue * 1.064658;

  return klarnaFee - initialValue;
};

export const calculateArtPayFee = (order: Order): number => {
  const initialValue = reverseFee(order);
  const artpayFee = initialValue * 1.06;

  return artpayFee - initialValue;
};

export const calculateTotalFee = (order: Order): number => {
  const artpayFee = calculateArtPayFee(order);
  const klarnaFee = calculateKlarnaFee(order);

  return artpayFee + klarnaFee;
};

export const clearLocalStorage = (order: Order) => {
  localStorage.removeItem(`payment-intents-cds-${order.order_key}`);
  localStorage.removeItem(`showCheckout`);
  localStorage.removeItem(`checkoutUrl`);
  localStorage.removeItem(`CdsOrder`);
  localStorage.setItem("checkOrder", "true")
}