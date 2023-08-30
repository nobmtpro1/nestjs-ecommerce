import React, { useEffect, useState } from "react";
import axios from "../../../../ultils/axios";
import { API_PRODUCT_FIND_BY_ID } from "../../../../constants/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const useFetchProduct = () => {
  const [product, setProduct] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    axios.get(API_PRODUCT_FIND_BY_ID.replace(":id", id)).then((res) => {
      const resData = res?.data;
      console.log(res);
      if (resData?.statusCode != 200) {
        toast.error(
          Array.isArray(resData?.message)
            ? resData?.message?.[0]
            : resData?.message
        );
      } else {
        toast.success("Success!");
        setProduct(resData?.data);
      }
    });
  }, []);
  return [product];
};

export default useFetchProduct;
