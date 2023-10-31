export enum ProductType {
  SIMPLE = 'simpleData',
  GROUPED = 'groupedData',
  EXTERNAL = 'externalData',
  VARIABLE = 'variableData',
}

export const productTypes = [
  { value: ProductType.SIMPLE, name: 'Simple' },
  { value: ProductType.GROUPED, name: 'Grouped' },
  { value: ProductType.EXTERNAL, name: 'External' },
  { value: ProductType.VARIABLE, name: 'Variable' },
];
