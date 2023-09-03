import React, { useState } from "react";
import { ROUTE_DASHBOARD, ROUTE_PRODUCT } from "../../../constants/routes";
import Sider from "antd/es/layout/Sider";
import { Col, Menu, Row } from "antd";
import { PieChartOutlined } from "@ant-design/icons";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const items = [
    {
      label: "Dashboard",
      key: ROUTE_DASHBOARD,
      icon: (
        <Link to={ROUTE_DASHBOARD}>
          <PieChartOutlined />
        </Link>
      ),
    },
    {
      label: "Product",
      key: ROUTE_PRODUCT,
      icon: (
        <Link to={ROUTE_PRODUCT}>
          <PieChartOutlined />
        </Link>
      ),
    },

    // getItem("User", "sub1", <UserOutlined />, [
    //   getItem("Tom", "3"),
    //   getItem("Bill", "4"),
    //   getItem("Alex", "5"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "6"),
    //   getItem("Team 2", "8"),
    // ]),
    // getItem("Files", "9", <FileOutlined />),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Row>
        <Col span={12} offset={6} className="p-5">
          <Link to={ROUTE_DASHBOARD}>
            <img
              className="w-96"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
          </Link>
        </Col>
      </Row>

      <Menu
        theme="dark"
        defaultSelectedKeys={[location?.pathname]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
