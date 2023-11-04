export enum ProductType {
  VARIABLE = 'VARIABLE',
  GROUPED = 'GROUPED',
  EXTERNAL = 'EXTERNAL',
}

export const productTypes = [
  { value: ProductType.VARIABLE, name: 'Variable' },
  { value: ProductType.GROUPED, name: 'Grouped' },
  { value: ProductType.EXTERNAL, name: 'External' },
];

export enum ProductStockStatus {
  OUT_OF_STOCK = 0,
  IN_STOCK = 1,
}

export const productStockStatus = [
  { value: ProductStockStatus.OUT_OF_STOCK, name: 'Out of stock' },
  { value: ProductStockStatus.IN_STOCK, name: 'In stock' },
];

export enum ProductStatus {
  ACTIVE = 1,
  DRAFT = 0,
}

export const productStatus = [
  { value: ProductStatus.ACTIVE, name: 'Active' },
  { value: ProductStatus.DRAFT, name: 'Draft' },
];
