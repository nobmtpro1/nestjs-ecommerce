import { API_USER_PROFILE } from "constants/api";
import { store } from "redux/store";
import axios from "../ultils/axios";
import { setAccount } from "redux/account";
import { LOCAL_STORAGE_ACCOUNT } from "../constants/localstorage";
import { ROUTE_HOME } from "constants/routes";

export const getAccountProfile = async () => {
  if (store.getState()?.account?.account) {
    return await axios
      .get(API_USER_PROFILE)
      .then((res) => {
        store.dispatch(
          setAccount({
            account: {
              ...store.getState()?.account?.account,
              profile: res?.data?.data,
            },
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCOUNT);
  window.location.href = ROUTE_HOME;
};

export const handleLoginSuccess = (data) => {
  localStorage.setItem(LOCAL_STORAGE_ACCOUNT, JSON.stringify(data));
  window.location.href = window.location.href;
};
