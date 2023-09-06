import { Form, Input } from "antd";
import React from "react";

const SimpleGeneralTab = () => {
  return (
    <>
      <Form.Item label="Regular price (₫)" name="simpleRegularPrice">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Sale price (₫)" name="simpleSalePrice">
        <Input type="number" />
      </Form.Item>
    </>
  );
};

export default SimpleGeneralTab;
