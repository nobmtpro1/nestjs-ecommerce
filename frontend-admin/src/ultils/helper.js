import axios from "axios";
import { API_URL, STORAGE_URL } from "../constants/config";
import { LOCAL_STORAGE_ACCOUNT } from "../constants/localstorage";
import { ROUTE_LOGIN } from "../constants/routes";
import { API_UPLOAD_IMAGE } from "constants/api";
import { toast } from "react-toastify";

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCOUNT);
  window.location.href = ROUTE_LOGIN;
};

export const generateImageUrl = (src) => {
  return `${API_URL}/${src}`;
};

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const uploadImages = async (images) => {
  console.log("uploadImages");
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", image?.originFileObj);
  });

  return await axios({
    method: "post",
    url: API_UPLOAD_IMAGE,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => {
    console.log(res);
    if (res?.data?.statusCode != 200) {
      toast.error("error");
      return;
    }
    return res?.data?.data?.map((image) => ({
      uid: image?.id,
      name: image?.src,
      status: "done",
      url: STORAGE_URL + "/" + image?.src,
    }));
  });
};

// export const uploadImages = ({ file, onSuccess, onError }) => {
//   console.log("uploadImages");
//   const formData = new FormData();
//   formData.append("images", file);
//   axios({
//     method: "post",
//     url: API_UPLOAD_IMAGE,
//     data: formData,
//     headers: { "Content-Type": "multipart/form-data" },
//   }).then((res) => {
//     console.log(res);
//     if (res?.data?.statusCode != 200) {
//       const error = new Error("error");
//       onError({ err });
//     }
//     onSuccess("ok");
//   });
// };
