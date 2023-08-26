import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Slider,
  Upload,
  theme,
} from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTE_PRODUCT } from "../../../constants/routes";
import { PlusOutlined } from "@ant-design/icons";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ProductAdd = () => {
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
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Input">
            <Input />
          </Form.Item>
          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
            <Button primary>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default ProductAdd;
