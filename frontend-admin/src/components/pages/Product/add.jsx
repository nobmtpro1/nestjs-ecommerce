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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PRODUCT } from "../../../constants/routes";
import { PlusOutlined } from "@ant-design/icons";
import axios from "../.././../ultils/axios";
import { API_PRODUCT_CREATE } from "../../../constants/api";
import TextArea from "antd/es/input/TextArea";
import TextEditor from "../../common/TextEditor";

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
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    axios.get(API_PRODUCT_CREATE).then((res) => {
      if (res?.status != 200) {
        alert(res?.data?.message);
      } else {
        setInitData(res?.data);
      }
    });
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  console.log(initData);

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
          style={{ maxWidth: 1000 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please enter description",
              },
            ]}
          >
            <Select>
              {initData?.productTypes?.map((e, i) => (
                <Select.Option value={e?.value} key={i}>
                  {e?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter description",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload listType="picture-card" maxCount={1} accept="image/*">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label="Short description">
            <TextArea rows={4} name="shortDescription" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextEditor />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
            <Button primary htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default ProductAdd;
