import React from "react";
import ProductAttributeForm from "./ProductAttributeForm";
import { useFetchProductAttribute } from "./helpers";

const ProductAttributeEdit = () => {
  const [productAttribute] = useFetchProductAttribute();
  return <ProductAttributeForm productAttribute={productAttribute} />;
};

export default ProductAttributeEdit;
