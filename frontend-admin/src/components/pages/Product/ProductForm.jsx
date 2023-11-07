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
import SimpleProductTabs from "./SimpleProductTabs";
import { PRODUCT_TYPE_SIMPLE } from "constants/config";
import ProductAttributeForm from "./ProductAttributeForm";
import { useSearchParams } from "react-router-dom";
import ProductVariantForm from "./ProductVariantForm";

const ProductForm = ({ initData, product }) => {
  const [searchParams] = useSearchParams();
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();
  const typeValue = Form.useWatch("type", form);
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
      shortDescription: values?.shortDescription || "",
      name: values?.name || null,
      slug: values?.slug || null,
      status: values?.status || null,
      type: values?.type || null,
      categories: values?.categories || [],
      tags: values?.tags || [],
      simpleRegularPrice: values?.simpleRegularPrice,
      simpleSalePrice: values?.simpleSalePrice,
      simpleSalePriceFrom: values?.simpleSalePriceFrom,
      simpleSalePriceTo: values?.simpleSalePriceTo,
      simpleSku: values?.simpleSku,
      simpleStock: values?.simpleStock,
      simpleStockStatus: values?.simpleStockStatus,
      simpleSoldIndividually: values?.simpleSoldIndividually,
      simpleHeight: values?.simpleHeight,
      simpleWeight: values?.simpleWeight,
      simpleWidth: values?.simpleWidth,
      simpleLength: values?.simpleLength,
      attributeIds: values?.attributeIds,
      attributeValueIds: values?.attributeValueIds,
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
      layout="horizontal"
      style={{ maxWidth: 1000 }}
      onFinish={onFinish}
      fields={productFields}
    >
      <Form.Item label="Status" name="status">
        <Select>
          {initData?.productStatus?.map((e, i) => (
            <Select.Option value={e?.value} key={i}>
              {e?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Categories" name="categories">
        <Select mode="multiple" allowClear>
          {initData?.productCategories?.map((e, i) => (
            <Select.Option value={e?.id} key={i}>
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
            message: "Please enter name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
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

      <Form.Item
        label="Short description"
        name="shortDescription"
        defaultValue=""
      >
        <TextArea rows={4} value={""} />
      </Form.Item>

      <Form.Item label="Description">
        <TextEditor
          defaultValue={product?.description}
          handleChange={handleChangeDescription}
        />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select mode="multiple" allowClear>
          {initData?.productTags?.map((e, i) => (
            <Select.Option value={e?.id} key={i}>
              {e?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

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

      {/* {typeValue == PRODUCT_TYPE_SIMPLE ? (
        <SimpleProductTabs initData={initData} form={form} product={product} />
      ) : (
        <></>
      )} */}

      {searchParams.get("action") == "edit" && (
        <>
          <ProductAttributeForm form={form} product={product} />
        </>
      )}

      <Form.Item wrapperCol={{ span: 14, offset: 4 }} className="mt-6">
        <Button primary htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
