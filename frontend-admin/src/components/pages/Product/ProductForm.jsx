import { Button, Form, Input, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import TextEditor from "../../common/TextEditor";
import { requestSubmitForm, useProductFields } from "./helpers";

const ProductForm = ({ initData, product }) => {
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [productFields] = useProductFields(
    product,
    setFileList,
    setDescription
  );

  const onFinish = (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.set("image", fileList?.[0]?.originFileObj);
    formData.append("description", description);

    requestSubmitForm(formData, form, product);
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

      <Form.Item name="image" label="Upload">
        <Upload
          listType="picture-card"
          maxCount={1}
          accept="image/*"
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
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
