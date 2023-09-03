import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTE_DASHBOARD } from "../../../constants/routes";
import LayoutContent from "components/common/LayoutContent";

const Dashboard = () => {
  return (
    <Content className="mx-5">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ROUTE_DASHBOARD}>Dashboard</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <LayoutContent>
        <h1 className="text-3xl font-bold underline">Dashboard</h1>
      </LayoutContent>
    </Content>
  );
};

export default Dashboard;
