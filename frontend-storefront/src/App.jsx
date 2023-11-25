import Layout from "components/common/Layout";
import Cart from "components/pages/Cart";
import Home from "components/pages/Home";
import Login from "components/pages/Login";
import OauthGoogle from "components/pages/Oauth/OauthGoogle";
import Product from "components/pages/Product";
import {
  ROUTE_CART,
  ROUTE_LOGIN,
  ROUTE_OAUTH_GOOGLE,
  ROUTE_PRODUCT,
} from "constants/routes";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes forceRefresh={true}>
        <Route path={ROUTE_LOGIN} element={<Login />} />

        <Route element={<Layout />}>
          <Route path={ROUTE_OAUTH_GOOGLE} element={<OauthGoogle />} />
          <Route path={ROUTE_PRODUCT} element={<Product />} />
          <Route path={ROUTE_CART} element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
