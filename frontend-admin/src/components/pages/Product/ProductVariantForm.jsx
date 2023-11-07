import { Button, Col, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

const ProductVariantForm = ({ form, product, attributes }) => {
  const [rows, setRows] = useState([]);

  console.log(attributes);

  return (
    <>
      <Title level={5} className="mt-5">
        Variant
      </Title>
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
    </>
  );
};

export default ProductVariantForm;
