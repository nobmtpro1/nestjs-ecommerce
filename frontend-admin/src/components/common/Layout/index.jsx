import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout as Lay } from "antd";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { ROUTE_LOGIN } from "../../../constants/routes";
import axios from "../../../ultils/axios";
import { setAccount } from "redux/account";

const Layout = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state?.account?.account);

  useEffect(() => {
    if (!account?.access_token) {
      window.location.href = ROUTE_LOGIN;
    }
    axios.get("auth/profile").then((res) => {
      if (res?.data?.success) {
        dispatch(setAccount({ account: res?.data?.data }));
      }
    });
  }, []);

  return (
    <>
      {account && (
        <Lay className="min-h-screen overflow-hidden">
          <Sidebar />
          <Lay>
            <Header />
            <Outlet />
          </Lay>
        </Lay>
      )}
    </>
  );
};

export default Layout;
