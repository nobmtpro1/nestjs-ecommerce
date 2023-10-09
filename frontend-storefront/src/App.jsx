import Layout from "components/common/Layout";
import Home from "components/pages/Home";
import Product from "components/pages/Product";
import { ROUTE_PRODUCT } from "constants/routes";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes forceRefresh={true}>
        {/* <Route path={ROUTE_LOGIN} element={<Login />} /> */}
        <Route element={<Layout />}>
          <Route path={ROUTE_PRODUCT} element={<Product />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
