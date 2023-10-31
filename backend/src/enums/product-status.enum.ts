export enum ProductStatus {
  ACTIVE = 1,
  DRAFT = 0,
}

export const productStatus = [
  { value: ProductStatus.ACTIVE, name: 'Active' },
  { value: ProductStatus.DRAFT, name: 'Draft' },
];
