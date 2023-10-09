import axios from "axios";
import { STORAGE_URL } from "../constants/config";
import { LOCAL_STORAGE_ACCOUNT } from "../constants/localstorage";
// import { ROUTE_LOGIN } from "../constants/routes";

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCOUNT);
  // window.location.href = ROUTE_LOGIN;
};

export const handleLoginSuccess = (data) => {
  localStorage.setItem(LOCAL_STORAGE_ACCOUNT, JSON.stringify(data));
  window.location.href = window.location.href;
};

export const generateImageUrl = (src) => {
  return `${STORAGE_URL}/${src}`;
};
