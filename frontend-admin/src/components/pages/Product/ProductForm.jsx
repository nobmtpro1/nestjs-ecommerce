import { Button, Form, Input, Select, Upload, Tabs, Row, Col } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import TextEditor from "../../common/TextEditor";
import {
  handleChangeUpload,
  requestSubmitForm,
  useProductFields,
} from "./helpers";
import { useSearchParams } from "react-router-dom";
import ProductVariantForm from "./ProductVariantForm";
import ProductOptionForm from "./ProductOptionForm";

const ProductForm = ({ initData, product }) => {
  const [searchParams] = useSearchParams();
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
    const data = {
      id: product?.id,
      imageId: fileList?.[0]?.uid || null,
      description: description || "",
      gallery: gallery?.map((image) => image?.uid) || [],
      name: values?.name || null,
      slug: values?.slug || null,
      status: values?.status || null,
      categories: values?.categories || [],
      tags: values?.tags || [],
      options: values?.options || [],
    };
    requestSubmitForm(data, form, product);
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
      style={{ maxWidth: 1000 }}
      onFinish={onFinish}
      fields={productFields}
      layout="vertical"
    >
      <Row gutter={50}>
        <Col span={16}>
          <Form.Item
            wrapperCol={{ sm: 24 }}
            labelCol={24}
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
          <Form.Item label="Description" wrapperCol={{ sm: 24 }} labelCol={24}>
            <TextEditor
              defaultValue={product?.description}
              handleChange={handleChangeDescription}
            />
          </Form.Item>
          <Form.Item label="Image" wrapperCol={{ sm: 24 }} labelCol={24}>
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

          <Form.Item
            name="gallery"
            label="Gallery"
            wrapperCol={{ sm: 24 }}
            labelCol={24}
          >
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

          {searchParams.get("action") == "edit" && (
            <>
              <ProductOptionForm form={form} product={product} />
            </>
          )}
        </Col>
        <Col span={8}>
          <Form.Item
            label="Status"
            name="status"
            wrapperCol={{ sm: 24 }}
            labelCol={24}
          >
            <Select>
              {initData?.productStatus?.map((e, i) => (
                <Select.Option value={e?.value} key={i}>
                  {e?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{ sm: 24 }}
            labelCol={24}
            label="Slug"
            name="slug"
            rules={[
              {
                required: true,
                message: "Please enter slug",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Categories"
            name="categories"
            wrapperCol={{ sm: 24 }}
            labelCol={24}
          >
            <Select mode="multiple" allowClear>
              {initData?.productCategories?.map((e, i) => (
                <Select.Option value={e?.id} key={i}>
                  {e?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tags"
            wrapperCol={{ sm: 24 }}
            labelCol={24}
          >
            <Select mode="multiple" allowClear>
              {initData?.productTags?.map((e, i) => (
                <Select.Option value={e?.id} key={i}>
                  {e?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item wrapperCol={24} className="mt-6">
        <Button primary htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
