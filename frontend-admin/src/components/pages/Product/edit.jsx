import React from "react";
import ProductForm from "./ProductForm";
import { useFetchInitData, useFetchProduct } from "./helpers";

const ProductEdit = () => {
  const [initData] = useFetchInitData();
  const [product] = useFetchProduct();

  return <ProductForm initData={initData} product={product} />;
};

export default ProductEdit;
