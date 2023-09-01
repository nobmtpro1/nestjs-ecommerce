import axios from "ultils/axios";
import {
  API_PRODUCT_CREATE,
  API_PRODUCT_FIND_BY_ID,
  API_PRODUCT_UPDATE,
} from "constants/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { STORAGE_URL } from "constants/config";

export const requestSubmitForm = async (formData, form, product) => {
  return await axios({
    method: "post",
    url: product
      ? API_PRODUCT_UPDATE.replace(":id", product?.id)
      : API_PRODUCT_CREATE,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => {
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
      !product && form.resetFields();
    }
  });
};

export const useFetchInitData = () => {
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    axios.get(API_PRODUCT_CREATE).then((res) => {
      if (res?.status != 200) {
        alert(res?.data?.message);
      } else {
        setInitData(res?.data);
      }
    });
  }, []);
  return [initData];
};

export const useFetchProduct = () => {
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
        setProduct(resData?.data);
      }
    });
  }, []);
  return [product];
};

export const useProductFields = (product, setFileList, setDescription) => {
  const [productFields, setProductFields] = useState([]);
  useEffect(() => {
    if (product) {
      const pFields = [
        {
          name: "type",
          value: product?.type,
        },
        {
          name: "name",
          value: product?.name,
        },
        {
          name: "shortDescription",
          value: product?.shortDescription,
        },
      ];
      setProductFields(pFields);
      setDescription(product?.description);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: STORAGE_URL + "/" + product?.image?.src,
        },
      ]);
    }
  }, [product]);

  return [productFields];
};
