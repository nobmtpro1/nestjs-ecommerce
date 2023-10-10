import { Button, Form, Input, Select, Upload, Tabs, Row, Col } from "antd";
import React from "react";
import axios from "../../../ultils/axios";
import { API_PRODUCT_ATTRIBUTE } from "constants/api";
import { toast } from "react-toastify";

const ProductAttributeForm = ({ productAttribute }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const data = {
      id: productAttribute?.id,
      name: values?.name || null,
    };
    return await axios({
      method: productAttribute ? "put" : "post",
      url: API_PRODUCT_ATTRIBUTE,
      data: data,
    }).then((res) => {
      const resData = res?.data;
      if (resData?.statusCode != 200) {
        toast.error(
          Array.isArray(resData?.message)
            ? resData?.message?.[0]
            : resData?.message
        );
      } else {
        toast.success("Success!");
        !productAttribute && form.resetFields();
      }
    });
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 1000 }}
      onFinish={onFinish}
      fields={productAttribute || null}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 14, offset: 4 }} className="mt-6">
        <Button primary htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductAttributeForm;
