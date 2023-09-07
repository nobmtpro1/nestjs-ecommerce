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
      <Form.Item label="Sale price date from" name="simpleSalePriceFrom">
        <Input type="date" />
      </Form.Item>
      <Form.Item label="Sale price date to" name="simpleSalePriceTo">
        <Input type="date" />
      </Form.Item>
    </>
  );
};

export default SimpleGeneralTab;
