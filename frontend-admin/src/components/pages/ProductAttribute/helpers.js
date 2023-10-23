import axios from "../../../ultils/axios";
import { API_PRODUCT_ATTRIBUTE } from "constants/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useFetchProductAttribute = () => {
  const [productAttribute, setProductAttribute] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(API_PRODUCT_ATTRIBUTE + "/" + searchParams?.get("id"))
      .then((res) => {
        const resData = res?.data;
        console.log(res);
        if (resData?.statusCode != 200) {
          toast.error(
            Array.isArray(resData?.message)
              ? resData?.message?.[0]
              : resData?.message
          );
        } else {
          setProductAttribute(resData?.data);
        }
      });
  }, []);
  return [productAttribute];
};
