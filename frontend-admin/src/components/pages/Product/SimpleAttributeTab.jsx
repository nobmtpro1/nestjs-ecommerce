import { Input, Form, Row, Col, Select, Space, Button } from "antd";
import axios from "../../../ultils/axios";
import React, { useEffect, useState } from "react";
import { API_PRODUCT_ATTRIBUTE } from "constants/api";
import { v4 } from "uuid";

const SimpleAttributeTab = () => {
  const [attributes, setAttributes] = useState([]);
  const [rows, setRows] = useState([
    {
      id: v4(),
      selectedAttribute: null,
      selectedAttributeValues: [],
      attributeValueOptions: [],
    },
  ]);

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
    console.log(id);
    setRows((prev) => prev?.filter((x) => x.id != id));
  };

  const handleChangeAttribute = (row, value) => {
    console.log(row, value);
  };

  console.log(rows);
  return (
    <>
      {rows?.map((row, i) => (
        <Row gutter={16} className="mb-3" key={row.id}>
          <Col span={10}>
            <Select
              className="w-full"
              placeholder="Select attribute"
              onChange={(value) => handleChangeAttribute(row, value)}
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
              defaultValue={[]}
              // onChange={handleChange}
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

export default SimpleAttributeTab;
