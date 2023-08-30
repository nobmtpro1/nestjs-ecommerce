import { Button, Form, Input, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "../../../ultils/axios";
import { API_PRODUCT_CREATE } from "../../../constants/api";
import TextArea from "antd/es/input/TextArea";
import TextEditor from "../../common/TextEditor";
import { normFile } from "../../../ultils/helper";
import { toast } from "react-toastify";

const ProductForm = ({ initData, product }) => {
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();
  const [productFields, setProductFields] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (product) {
      const pFields = [
        {
          name: "type",
          value: product.type,
        },
        {
          name: "name",
          value: product.name,
        },
        {
          name: "shortDescription",
          value: product.shortDescription,
        },
      ];
      setProductFields(pFields);
      setFileList([
        {
          uid: "-xxx",
          name: "image.png",
          status: "done",
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
      ]);
    }
  }, [product]);

  const onFinish = (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.set("image", values?.image?.[0]?.originFileObj);
    formData.append("description", description);

    axios({
      method: "post",
      url: API_PRODUCT_CREATE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      const resData = res?.data;
      console.log(res);
      if (resData?.statusCode != 200) {
        toast.error(
          Array.isArray(resData?.message)
            ? resData?.message?.[0]
            : resData?.message
        );
      } else {
        toast.success("Success!");
        form.resetFields();
      }
    });
  };

  const handleChangeDescription = (html) => {
    setDescription(html);
  };
  
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 1000 }}
      onFinish={onFinish}
      fields={productFields}
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
        <Upload
          listType="picture-card"
          maxCount={1}
          accept="image/*"
          fileList={fileList}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item label="Short description" name="shortDescription">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Description">
        <TextEditor
          defaultValue={product?.description}
          handleChange={handleChangeDescription}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button primary htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
