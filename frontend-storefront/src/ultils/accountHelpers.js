import { API_USER_PROFILE } from "constants/api";
import { store } from "redux/store";
import axios from "../ultils/axios";
import { setAccount } from "redux/account";

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
