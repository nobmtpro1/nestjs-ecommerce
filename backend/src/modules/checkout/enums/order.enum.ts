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
