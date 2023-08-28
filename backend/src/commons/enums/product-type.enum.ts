export enum ProductType {
  SIMPLE = 1,
  GROUPED = 2,
  EXTERNAL = 3,
  VARIABLE = 4,
}

export const productTypes = [
  { value: ProductType.SIMPLE, name: 'Simple' },
  { value: ProductType.GROUPED, name: 'Grouped' },
  { value: ProductType.EXTERNAL, name: 'External' },
  { value: ProductType.VARIABLE, name: 'Variable' },
];
