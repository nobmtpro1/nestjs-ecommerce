import { API_URL } from "../constants/config";
import { LOCAL_STORAGE_ACCOUNT } from "../constants/localstorage";
import { ROUTE_LOGIN } from "../constants/routes";

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCOUNT);
  window.location.href = ROUTE_LOGIN;
};

export const generateImageUrl = (path, filename) => {
  return `${API_URL}/${path}/${filename}`;
};
