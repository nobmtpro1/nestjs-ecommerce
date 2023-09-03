import React from "react";
import ProductForm from "./ProductForm";
import { useFetchInitData } from "./helpers";

const ProductAdd = () => {
  const [initData] = useFetchInitData();

  return <ProductForm initData={initData} />;
};

export default ProductAdd;
