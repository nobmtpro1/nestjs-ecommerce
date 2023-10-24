import { Input, Form } from "antd";
import React from "react";

const SimpleShippingTab = () => {
  return (
    <>
      <Form.Item label="Weight" name="simpleWeight">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Height" name="simpleHeight">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Width" name="simpleWidth">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Length" name="simpleLength">
        <Input type="number" />
      </Form.Item>
    </>
  );
};

export default SimpleShippingTab;
