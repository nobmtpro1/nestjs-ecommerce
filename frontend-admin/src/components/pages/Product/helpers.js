import axios from "ultils/axios";
import { API_PRODUCT, API_PRODUCT_RELATED_DATA } from "constants/api";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { uploadImages } from "ultils/helper";

export const requestSubmitForm = async (data, form, product) => {
  return await axios({
    method: product ? "put" : "post",
    url: API_PRODUCT,
    data: data,
  }).then((res) => {
    const resData = res?.data;
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
    axios.get(API_PRODUCT_RELATED_DATA).then((res) => {
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
    axios.get(API_PRODUCT + "/" + searchParams?.get("id")).then((res) => {
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
        {
          name: "simpleRegularPrice",
          value: product?.simpleData?.regularPrice,
        },
        {
          name: "simpleSalePrice",
          value: product?.simpleData?.salePrice,
        },
        {
          name: "simpleSalePriceFrom",
          value: product?.simpleData?.salePriceFrom,
        },
        {
          name: "simpleSalePriceTo",
          value: product?.simpleData?.salePriceTo,
        },
        {
          name: "simpleSku",
          value: product?.simpleData?.sku,
        },
        {
          name: "simpleStock",
          value: product?.simpleData?.stock,
        },
        {
          name: "simpleStockStatus",
          value: product?.simpleData?.stockStatus,
        },
        {
          name: "simpleSoldIndividually",
          value: product?.simpleData?.soldIndividually,
        },
        {
          name: "simpleWeight",
          value: product?.simpleData?.weight,
        },
        {
          name: "simpleHeight",
          value: product?.simpleData?.height,
        },
        {
          name: "simpleWidth",
          value: product?.simpleData?.width,
        },
        {
          name: "simpleLength",
          value: product?.simpleData?.length,
        },
      ];
      setProductFields(pFields);
      setDescription(product?.description);
      setFileList([
        {
          uid: product?.image?.id,
          name: product?.image?.src,
          status: "done",
          url: product?.image?.src,
        },
      ]);
      setGallery(
        product?.gallery?.map((image) => ({
          uid: image?.id,
          name: image?.src,
          status: "done",
          url: image?.src,
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
