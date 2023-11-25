import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import axios from "../../../ultils/axios";
import { API_USER_PROFILE } from "constants/api";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "redux/account";

const Layout = () => {
  const dispatch = useDispatch();
  const accountReducer = useSelector((state) => state.account);

  useEffect(() => {
    if (accountReducer?.account) {
      axios
        .get(API_USER_PROFILE)
        .then((res) => {
          dispatch(
            setAccount({
              account: {
                ...accountReducer.account,
                profile: res?.data?.data,
              },
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [accountReducer?.account?.access_token]);

  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
