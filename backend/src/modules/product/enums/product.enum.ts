export enum ProductStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

export interface ProductStatusView {
  value: ProductStatus;
  name: string;
}

export const productStatus: ProductStatusView[] = [
  { value: ProductStatus.ACTIVE, name: 'Active' },
  { value: ProductStatus.DRAFT, name: 'Draft' },
];
