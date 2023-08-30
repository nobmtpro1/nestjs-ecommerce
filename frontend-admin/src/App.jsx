import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Product from "./components/pages/Product";
import {
  ROUTE_LOGIN,
  ROUTE_PRODUCT,
  ROUTE_PRODUCT_ADD,
  ROUTE_PRODUCT_EDIT,
} from "./constants/routes";

import Login from "./components/pages/Login";
import Layout from "./components/common/Layout";
import ProductAdd from "./components/pages/Product/add";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductEdit from "./components/pages/Product/edit";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes forceRefresh={true}>
        <Route path={ROUTE_LOGIN} element={<Login />} />
        <Route element={<Layout />}>
          <Route path={ROUTE_PRODUCT} element={<Product />} />
          <Route path={ROUTE_PRODUCT_ADD} element={<ProductAdd />} />
          <Route path={ROUTE_PRODUCT_EDIT} element={<ProductEdit />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
