import React from "react";
import { useFetchProduct } from "ultils/productHelpers";

const Product = () => {
  const [product] = useFetchProduct();
  console.log(product);

  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="flex-1">
          <img src={product?.image?.src} alt="" />
        </div>
        <div className="flex-1">
          <div className="text-3xl">{product?.title}</div>
          <div className="text-lg mt-2 text-red-500">
            {product?.variants?.[0]?.price} đ
          </div>
        </div>
      </div>
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{ __html: product?.body_html }}
      ></div>
    </div>
  );
};

export default Product;
