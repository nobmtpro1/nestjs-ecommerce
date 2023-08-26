import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Product from "./components/pages/Product";
import { ROUTE_LOGIN, ROUTE_PRODUCT } from "./constants/routes";

import Login from "./components/pages/Login";
import Layout from "./components/common/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_LOGIN} element={<Login />} />
        <Route element={<Layout />}>
          <Route path={ROUTE_PRODUCT} element={<Product />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
