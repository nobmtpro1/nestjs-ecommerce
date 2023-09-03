import { Button, Form, Input, Select, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import TextEditor from "../../common/TextEditor";
import {
  handleChangeUpload,
  requestSubmitForm,
  useProductFields,
} from "./helpers";

const ProductForm = ({ initData, product }) => {
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [productFields] = useProductFields(
    product,
    setFileList,
    setDescription,
    setGallery
  );

  const onFinish = (values) => {
    values.imageId = fileList?.[0]?.uid;
    values.description = description;
    values.gallery = [];
    gallery?.forEach((image) => {
      values.gallery?.push(image?.uid);
    });
    requestSubmitForm(values, form, product);
  };

  const handleChangeDescription = (html) => {
    setDescription(html);
  };

  const handleChangeImage = async ({ file, fileList, event }) => {
    handleChangeUpload(file, fileList, event, setFileList, 1);
  };

  const handleChangeGallery = async ({ file, fileList, event }) => {
    handleChangeUpload(file, fileList, event, setGallery, 10);
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

      <Form.Item label="Image">
        <Upload
          listType="picture-card"
          maxCount={1}
          accept="image/*"
          fileList={fileList}
          onChange={handleChangeImage}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item name="gallery" label="Gallery">
        <Upload
          listType="picture-card"
          maxCount={10}
          accept="image/*"
          fileList={gallery}
          onChange={handleChangeGallery}
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
