import React from "react";
import { generateImageUrl } from "ultils/helper";
import { renderProductItemPrice, useFetchProduct } from "ultils/productHelpers";

const Product = () => {
  const [product] = useFetchProduct();
  console.log(product);

  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="flex-1">
          <img src={generateImageUrl(product?.image?.src)} alt="" />
        </div>
        <div className="flex-1">
          <div className="text-3xl">{product?.name}</div>
          <div className="text-lg mt-2 text-red-500">
            {renderProductItemPrice(product)}
          </div>
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: product?.shortDescription }}
          ></div>
        </div>
      </div>
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{ __html: product?.description }}
      ></div>
    </div>
  );
};

export default Product;
