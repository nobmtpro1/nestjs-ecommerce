import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import axios from "../../../ultils/axios";
import { API_USER_PROFILE } from "constants/api";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "redux/account";
import { getCart } from "ultils/cartHelpers";
import { getAccountProfile } from "ultils/accountHelpers";

const Layout = () => {
  const dispatch = useDispatch();
  const accountReducer = useSelector((state) => state.account);

  useEffect(() => {
    getAccountProfile();
    getCart();
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
