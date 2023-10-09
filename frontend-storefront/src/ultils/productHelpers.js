import { useParams, useSearchParams } from "react-router-dom";
import axios from "./axios";
import { PRODUCT_TYPE_SIMPLE } from "constants/config";
import { useEffect, useState } from "react";
import { API_PRODUCT } from "constants/api";

export const useFetchProduct = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  useEffect(() => {
    axios.get(API_PRODUCT + "/" + params?.slug).then((res) => {
      const resData = res?.data;
      if (resData?.statusCode != 200) {
        toast.error(
          Array.isArray(resData?.message)
            ? resData?.message?.[0]
            : resData?.message
        );
      } else {
        setProduct(resData?.data);
      }
    });
  }, []);
  return [product];
};

export const getSimpleProductPrice = (product) => {
  const regularPrice = parseInt(product?.[product?.type]?.regularPrice) || 0;
  let salePrice = parseInt(product?.[product?.type]?.salePrice) || 0;
  const salePriceTo = product?.[product?.type]?.salePriceTo;

  if (salePriceTo) {
    const salePriceToTime = new Date(salePriceTo)?.getTime();
    const now = new Date()?.getTime();
    if (now > salePriceToTime) {
      salePrice = 0;
    }
  }

  return {
    regularPrice: regularPrice?.toLocaleString(),
    salePrice: salePrice?.toLocaleString(),
  };
};

export const renderProductItemPrice = (product) => {
  if (product?.type == PRODUCT_TYPE_SIMPLE) {
    const { regularPrice, salePrice } = getSimpleProductPrice(product);
    return (
      <>
        {salePrice > 0 ? (
          <span>
            {salePrice}đ <s>{regularPrice}đ</s>
          </span>
        ) : (
          <span>{regularPrice}đ</span>
        )}
      </>
    );
  }
};
