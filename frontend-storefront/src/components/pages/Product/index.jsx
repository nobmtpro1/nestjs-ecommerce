import axios from "../../../ultils/axios";
import ProductList from "components/common/ProductList";
import { API_PRODUCT } from "constants/api";
import React, { useEffect, useState } from "react";
import { useFetchProduct } from "ultils/productHelpers";

const Product = () => {
  const [product] = useFetchProduct();
  console.log(product);

  return <div className="container mx-auto">{product?.name}</div>;
};

export default Product;
