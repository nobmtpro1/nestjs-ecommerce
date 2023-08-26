import { Breadcrumb, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTE_DASHBOARD } from "../../../constants/routes";

const Dashboard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content className="mx-5">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ROUTE_DASHBOARD}>Dashboard</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="p-5 min-h-full"
        style={{
          background: colorBgContainer,
        }}
      >
        <h1 className="text-3xl font-bold underline">Dashboard</h1>
      </div>
    </Content>
  );
};

export default Dashboard;
