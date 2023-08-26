import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout as Lay } from "antd";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useSelector } from "react-redux";
import { ROUTE_LOGIN } from "../../../constants/routes";

const Layout = () => {
  const account = useSelector((state) => state?.account?.account);

  useEffect(() => {
    if (!account?.access_token) {
      window.location.href = ROUTE_LOGIN;
    }
  }, []);
  return (
    <>
      {account && (
        <Lay className="min-h-screen">
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
