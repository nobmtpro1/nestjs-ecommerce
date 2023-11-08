export const API_URL = "http://localhost:8000/api";
export const STORAGE_URL = "http://localhost:8000";

export const PRODUCT_TYPE_SIMPLE = "simpleData";
export const PRODUCT_TYPE_GROUPED = "groupedData";
export const PRODUCT_TYPE_EXTERNAL = "externalData";
export const PRODUCT_TYPE_VARIABLE = "variableData";
export const PRODUCT_TYPES = [
  PRODUCT_TYPE_SIMPLE,
  PRODUCT_TYPE_GROUPED,
  PRODUCT_TYPE_EXTERNAL,
  PRODUCT_TYPE_VARIABLE,
];

export const PRODUCT_STATUS_ACTIVE = 1;
export const PRODUCT_STATUS_DRAFT = 0;
export const PRODUCT_STATUS = [PRODUCT_STATUS_ACTIVE, PRODUCT_STATUS_DRAFT];

export const PRODUCT_STOCK_STATUS_OUT_OF_STOCK = 0;
export const PRODUCT_STOCK_STATUS_IN_STOCK = 1;
export const PRODUCT_STOCK_STATUS = [
  PRODUCT_STOCK_STATUS_IN_STOCK,
  PRODUCT_STOCK_STATUS_OUT_OF_STOCK,
];
