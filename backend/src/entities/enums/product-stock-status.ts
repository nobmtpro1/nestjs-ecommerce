export enum ProductStockStatus {
  OUT_OF_STOCK = 0,
  IN_STOCK = 1,
}

export const productStockStatus = [
  { value: ProductStockStatus.OUT_OF_STOCK, name: 'Out of stock' },
  { value: ProductStockStatus.IN_STOCK, name: 'In stock' },
];
