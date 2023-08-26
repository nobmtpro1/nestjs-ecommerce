import React from "react";
import { Button, Col, Layout, Row, theme } from "antd";
import { logout } from "../../../ultils/helper";
import { useSelector } from "react-redux";

const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const account = useSelector((state) => state?.account?.account);

  return (
    <Layout.Header
      style={{
        background: colorBgContainer,
      }}
      className="px-5"
    >
      <Row className="h-full flex justify-end gap-4">
        <Col>{account?.email}</Col>
        <Col>
          <Button danger onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
