import { useParams, useSearchParams } from "react-router-dom";
import axios from "./axios";
import { useEffect, useState } from "react";
import { API_PRODUCT, API_PRODUCT_DETAIL } from "constants/api";

export const useFetchProduct = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  useEffect(() => {
    axios
      .get(API_PRODUCT_DETAIL.replace(":handle", params.slug))
      .then((res) => {
        const resData = res?.data;
        if (resData?.statusCode != 200) {
          // toast.error(
          //   Array.isArray(resData?.message)
          //     ? resData?.message?.[0]
          //     : resData?.message
          // );
        } else {
          setProduct(resData?.data);
        }
      });
  }, []);
  return [product];
};
