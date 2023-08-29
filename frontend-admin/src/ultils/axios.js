import axios from "axios";
import { LOCAL_STORAGE_ACCOUNT } from "../constants/localstorage";
import { logout } from "../ultils/helper";
import { API_URL } from "../constants/config";

const account = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT) || null)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT) || null)
  : null;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + account?.access_token;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      logout();
    }
    return error?.response;
  }
);

export default axios;
