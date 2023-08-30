import { Breadcrumb, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTE_PRODUCT } from "../../../constants/routes";
import useFetchInitData from "./utils/useFetchInitData";
import ProductForm from "./ProductForm";
import useFetchProduct from "./utils/useFetchProduct";

const ProductEdit = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [initData] = useFetchInitData();
  const [product] = useFetchProduct();

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
        <ProductForm initData={initData} product={product} />
      </div>
    </Content>
  );
};

export default ProductEdit;
