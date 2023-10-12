import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { Button, Modal } from "antd";
import {
  API_PRODUCT_ATTRIBUTE,
  API_PRODUCT_ATTRIBUTE_VALUE,
} from "constants/api";
import axios from "../../../ultils/axios";
import { toast } from "react-toastify";

const EditValuesModal = ({
  isModalOpen,
  handleCancel,
  productAttributeValue,
  attributeId,
  fetchData,
}) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const onFinish = async (values) => {
    const data = {
      id: productAttributeValue?.id,
      name: values?.name || null,
      attributeId: attributeId,
    };
    return await axios({
      method: productAttributeValue ? "put" : "post",
      url: API_PRODUCT_ATTRIBUTE_VALUE,
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
        !productAttributeValue && form.resetFields();
        fetchData();
      }
    });
  };

  useEffect(() => {
    if (productAttributeValue) {
      const fields = [];
      for (const property in productAttributeValue) {
        fields.push({
          name: property,
          value: productAttributeValue[property],
        });
      }
      setFields(fields);
    } else {
      form.resetFields();
    }
  }, [productAttributeValue]);

  return (
    <>
      <Modal
        title={productAttributeValue ? "Edit" : "Add"}
        open={isModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="submit" onClick={() => form.submit()}>
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 1000 }}
          onFinish={onFinish}
          fields={fields?.length > 0 ? fields : null}
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
        </Form>
      </Modal>
    </>
  );
};
export default EditValuesModal;
