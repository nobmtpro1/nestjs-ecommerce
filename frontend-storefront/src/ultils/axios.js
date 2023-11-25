import axios from "axios";
import { LOCAL_STORAGE_ACCOUNT } from "../constants/localstorage";
import { API_URL } from "../constants/config";

const accountLocalStorage = localStorage.getItem(LOCAL_STORAGE_ACCOUNT);
const account = JSON.parse(accountLocalStorage ? accountLocalStorage : null)
  ? JSON.parse(accountLocalStorage || null)
  : null;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + account?.access_token;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
