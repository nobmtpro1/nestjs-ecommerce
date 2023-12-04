import axios from "../ultils/axios";
import { STORAGE_URL } from "../constants/config";
import { toast } from "react-toastify";
import { API_COMMON } from "constants/api";
import { store } from "redux/store";
import { setCommon } from "redux/common";

export const generateImageUrl = (src) => {
  return `${STORAGE_URL}/${src}`;
};

export const alertResponseErrors = (error) => {
  // let message = error?.message;
  let message = error?.response?.data?.message
  if (!message) {
    message =error?.message
  }
  if (Array.isArray(message)) {
    for (const msg of message) {
      toast.error(msg);
    }
  } else {
    toast.error(message);
  }
};

export const getCommonData = () => {
  axios
    .get(API_COMMON)
    .then((res) => {
      if (res?.data?.success) {
        store.dispatch(setCommon(res?.data?.data));
      }
    })
    .catch((error) => alertResponseErrors(error));
};
