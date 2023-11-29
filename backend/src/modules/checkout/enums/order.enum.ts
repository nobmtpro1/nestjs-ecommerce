export enum PaymentEnum {
  COD = 'cod',
  BANK_TRANSFER = 'bank_transfer',
}

export const paymentOptions = [
  {
    name: 'Cash On Delivery',
    value: PaymentEnum.COD,
  },
  {
    name: 'Bank Transfer',
    value: PaymentEnum.BANK_TRANSFER,
  },
];

export enum FinancialStatusEnum {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  PARTIALLY_PAID = 'partially_paid',
  PAID = 'paid',
  PARTIALLY_REFUNDED = 'partially_refunded',
  REFUNDED = 'refunded',
  VOIDED = 'voided',
  // pending: The payments are pending. Payment might fail in this state. Check again to confirm whether the payments have been paid successfully.
  // authorized: The payments have been authorized.
  // partially_paid: The order has been partially paid.
  // paid: The payments have been paid.
  // partially_refunded: The payments have been partially refunded.
  // refunded: The payments have been refunded.
  // voided: The payments have been voided.
}

export enum FulfillmentStatusEnum {
  FULFILLED = 'fulfilled',
  NULL = 'null',
  PARTIAL = 'partial',
  RESTOCKED = 'restocked',
  // fulfilled: Every line item in the order has been fulfilled.
  // null: None of the line items in the order have been fulfilled.
  // partial: At least one line item in the order has been fulfilled.
  // restocked: Every line item in the order has been restocked and the order canceled.
}
