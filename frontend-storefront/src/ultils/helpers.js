import axios from "axios";
import { STORAGE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const generateImageUrl = (src) => {
  return `${STORAGE_URL}/${src}`;
};

export const alertResponseErrors = (error) => {
  const message = error?.response?.data?.message;
  if (Array.isArray(message)) {
    for (const msg of message) {
      toast.error(msg);
    }
  } else {
    toast.error(message);
  }
};
