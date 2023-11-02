import { Row, Col, Select, Space, Button, Form } from "antd";
import axios from "../../../ultils/axios";
import React, { useEffect, useState } from "react";
import { API_PRODUCT_ATTRIBUTE } from "constants/api";
import { v4 } from "uuid";
import Title from "antd/es/typography/Title";

const ProductAttributeForm = ({ form, product }) => {
  const [attributes, setAttributes] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_PRODUCT_ATTRIBUTE}`)
      .then((res) => setAttributes(res?.data?.data));
  }, []);

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: v4(),
        selectedAttribute: null,
        selectedAttributeValues: [],
        attributeValueOptions: [],
      },
    ]);
  };

  const handleDeleteRow = (id) => {
    setRows((prev) => prev?.filter((x) => x.id != id));
  };

  const fetchAttribute = async (id) => {
    return await axios.get(`${API_PRODUCT_ATTRIBUTE}/${id}`).then((res) => {
      return res?.data?.data;
    });
  };

  const handleChangeAttribute = async (row, value) => {
    const attribute = await fetchAttribute(value);
    console.log(attribute);
    setRows((prev) =>
      prev?.map((x) => {
        if (x.id == row.id) {
          return {
            ...x,
            selectedAttribute: value,
            selectedAttributeValues: [],
            attributeValueOptions: attribute?.productAttributeValues
              ? attribute?.productAttributeValues?.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                }))
              : [],
          };
        } else {
          return x;
        }
      })
    );
  };

  const handleChangeAttributeValue = (row, value) => {
    console.log(value);
    setRows((prev) =>
      prev?.map((x) => {
        if (x.id == row.id) {
          return {
            ...x,
            selectedAttributeValues: value,
          };
        } else {
          return x;
        }
      })
    );
  };

  useEffect(() => {
    const attributeIds = [];
    const attributeValueIds = [];
    rows?.forEach((row) => {
      if (!attributeIds?.includes(row?.selectedAttribute)) {
        attributeIds?.push(row?.selectedAttribute);
      }
      row?.selectedAttributeValues?.forEach((x) => {
        if (!attributeValueIds?.includes(x)) {
          attributeValueIds?.push(x);
        }
      });
    });
    form.setFieldsValue({
      attributeIds: attributeIds,
      attributeValueIds: attributeValueIds,
    });
  }, [rows]);

  useEffect(() => {
    const rows = [];

    product?.attributes?.forEach((attribute) => {
      const selectedAttributeValues = [];
      product?.attributeValues?.forEach((attributeValue) => {
        if (attributeValue?.productAttribute?.id == attribute?.id) {
          selectedAttributeValues?.push(attributeValue?.id);
        }
      });
      rows?.push({
        id: v4(),
        selectedAttribute: attribute?.id,
        selectedAttributeValues: selectedAttributeValues,
        attributeValueOptions: attribute?.productAttributeValues?.map((x) => ({
          value: x?.id,
          label: x?.name,
        })),
      });
    });

    setRows(rows);
  }, [product]);

  console.log(product);

  return (
    <>
      <Title level={5}>Attribute</Title>
      <Form.Item name="attributeIds" hidden={true}></Form.Item>
      <Form.Item name="attributeValueIds" hidden={true}></Form.Item>
      {rows?.map((row, i) => (
        <Row gutter={16} className="mb-3" key={row.id}>
          <Col span={10}>
            <Select
              className="w-full"
              placeholder="Select attribute"
              onChange={(value) => handleChangeAttribute(row, value)}
              value={row.selectedAttribute}
              options={attributes?.map((e) => ({
                value: e.id,
                label: e.name,
              }))}
            />
          </Col>
          <Col span={10}>
            <Select
              mode="multiple"
              allowClear
              className="w-full"
              placeholder="Select attribute value"
              value={row.selectedAttributeValues}
              onChange={(value) => handleChangeAttributeValue(row, value)}
              options={row.attributeValueOptions}
            />
          </Col>
          <Col span={4}>
            <Button onClick={() => handleDeleteRow(row.id)}>Delete</Button>
          </Col>
        </Row>
      ))}

      <Button className="mt-2" onClick={handleAddRow}>
        Add
      </Button>
    </>
  );
};

export default ProductAttributeForm;
