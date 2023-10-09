import axios from "axios";
import { LOCAL_STORAGE_ACCOUNT } from "../constants/localstorage";
import { handleLoginSuccess, logout } from "../ultils/helper";
import { API_URL } from "../constants/config";
import { API_REFRESH_TOKEN } from "constants/api";

const account = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT) || null)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT) || null)
  : null;

axios.defaults.baseURL = API_URL;
// axiosApiInstance.defaults.headers.common["Authorization"] =
//   "Bearer " + account?.access_token;
// axiosApiInstance.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = "Bearer " + account?.access_token;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return error?.response;
  }
);

let refreshTokenPromise;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === API_REFRESH_TOKEN) {
        logout();
      }
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        // check for an existing in-progress request
        // if nothing is in-progress, start a new refresh token request
        refreshTokenPromise = axios
          .post(API_REFRESH_TOKEN, {
            token: account?.access_token,
            refreshToken: account?.refresh_token,
          })
          .then((res) => {
            handleLoginSuccess(res?.data);
            return res?.data;
          })
          .then((data) => {
            refreshTokenPromise = null; // clear state
            return data; // resolve with the new token
          });
      }

      return refreshTokenPromise.then((data) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + data?.access_token;
        return axios(originalRequest);
      });
    }
    return error?.response;
  }
);

export default axios;
