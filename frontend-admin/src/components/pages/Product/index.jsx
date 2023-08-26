import { Breadcrumb, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { ROUTE_PRODUCT } from "../../../constants/routes";
import { Link } from "react-router-dom";

const Product = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content className="mx-5">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ROUTE_PRODUCT}>Product</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="p-5 min-h-full"
        style={{
          background: colorBgContainer,
        }}
      >
        <h1 className="text-3xl font-bold underline">Product</h1>
      </div>
    </Content>
  );
};

export default Product;
