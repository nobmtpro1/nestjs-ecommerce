export enum ProductStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

export const productStatus = [
  { value: ProductStatus.ACTIVE, name: 'Active' },
  { value: ProductStatus.DRAFT, name: 'Draft' },
];
