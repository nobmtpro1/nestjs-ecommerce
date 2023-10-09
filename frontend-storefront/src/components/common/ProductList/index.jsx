import React from "react";
import ProductListItem from "../ProductListItem";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-4 gap-10">
      {products?.map((e, i) => (
        <ProductListItem key={i} product={e} />
      ))}
    </div>
  );
};

export default ProductList;
