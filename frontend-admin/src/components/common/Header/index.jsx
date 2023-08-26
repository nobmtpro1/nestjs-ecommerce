import React from "react";
import { Button, Col, Layout, Row, theme } from "antd";

const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      style={{
        background: colorBgContainer,
      }}
      className="px-5"
    >
      <Row className="h-full flex justify-end gap-4">
        <Col>
          <Button danger>Logout</Button>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
