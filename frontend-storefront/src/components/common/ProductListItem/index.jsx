import { ROUTE_PRODUCT } from "constants/routes";
import React from "react";
import { Link } from "react-router-dom";

const ProductListItem = ({ product }) => {
  return (
    <div className="p-3 shadow-xl rounded-lg">
      <img
        className="w-full h-60 object-cover"
        src={product?.image?.src}
        alt=""
      />
      <div className="text-lg font-semibold	mt-2">{product?.title}</div>
      <div className="text-base font-semibold	mt-2 text-red-500	">
        {product?.variants?.[0]?.price} đ
      </div>
      <div className="flex justify-between align-middle gap-3 mt-3">
        <a
          href=""
          className="bg-black text-white p-3 flex-1 text-center text-sm"
        >
          ADD TO CART
        </a>
        <Link
          className="bg-black text-white p-3 flex-1 text-center text-sm"
          to={ROUTE_PRODUCT.replace(":slug", product?.handle)}
        >
          VIEW
        </Link>
      </div>
    </div>
  );
};

export default ProductListItem;
