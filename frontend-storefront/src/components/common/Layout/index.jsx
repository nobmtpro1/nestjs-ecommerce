import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { getCart } from "ultils/cartHelpers";
import { getAccountProfile } from "ultils/accountHelpers";
import { getCommonData } from "ultils/helpers";
import { useSelector }from 'react-redux'

const Layout = () => {
  const accountReducer = useSelector((state) => state.account);

  useEffect(() => {
    getAccountProfile();
    getCart();
    getCommonData();
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
