import axios from "ultils/axios";
import {
  API_PRODUCT_CREATE,
  API_PRODUCT_FIND_BY_ID,
  API_PRODUCT_UPDATE,
} from "constants/api";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { STORAGE_URL } from "constants/config";
import { uploadImages } from "ultils/helper";

export const requestSubmitForm = async (data, form, product) => {
  return await axios({
    method: "post",
    url: product
      ? API_PRODUCT_UPDATE.replace(":id", product?.id)
      : API_PRODUCT_CREATE,
    data: data,
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
      const resData = res?.data;
      if (resData?.statusCode != 200) {
        toast.error(res?.message);
      } else {
        setInitData(resData?.data);
      }
    });
  }, []);
  return [initData];
};

export const useFetchProduct = () => {
  const [product, setProduct] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(API_PRODUCT_FIND_BY_ID.replace(":id", searchParams?.get("id")))
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
          setProduct(resData?.data);
        }
      });
  }, []);
  return [product];
};

export const useProductFields = (
  product,
  setFileList,
  setDescription,
  setGallery
) => {
  const [productFields, setProductFields] = useState([]);
  useEffect(() => {
    if (product) {
      const pFields = [
        {
          name: "status",
          value: product?.status,
        },
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
        {
          name: "categories",
          value: product?.categories?.map((category) => category?.id),
        },
        {
          name: "tags",
          value: product?.tags?.map((tag) => tag?.id),
        },
        {
          name: "slug",
          value: product?.slug,
        },
      ];
      setProductFields(pFields);
      setDescription(product?.description);
      setFileList([
        {
          uid: product?.image?.id,
          name: product?.image?.src,
          status: "done",
          url: STORAGE_URL + "/" + product?.image?.src,
        },
      ]);
      setGallery(
        product?.gallery?.map((image) => ({
          uid: image?.id,
          name: image?.src,
          status: "done",
          url: STORAGE_URL + "/" + image?.src,
        }))
      );
    }
  }, [product]);

  return [productFields];
};

export const handleChangeUpload = async (
  file,
  fileList,
  event,
  handle,
  quantity
) => {
  if (file?.status == "removed") {
    handle((prev) => prev?.filter((x) => x?.uid != file?.uid));
  } else {
    const images = await uploadImages(fileList);
    if (images) {
      if (quantity == 1) {
        handle(images);
      } else {
        if (fileList?.length >= quantity) {
          return;
        }
        handle((prev) => [...prev, ...images]);
      }
    }
  }
};
