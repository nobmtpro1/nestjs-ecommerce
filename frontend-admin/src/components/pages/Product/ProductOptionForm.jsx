import { Button, Col, Form, Input, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

const ProductOptionForm = ({ form, product }) => {
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    if (rows?.length >= 3) {
      return;
    }
    setRows((prev) => [
      ...prev,
      {
        uuid: v4(),
        name: "",
        values: [],
      },
    ]);
  };

  const handleDeleteRow = (uuid) => {
    setRows((prev) => prev?.filter((x) => x.uuid != uuid));
  };

  const handleChangeOptionName = (e, index) => {
    setRows((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        name: e?.target?.value,
      },
      ...prev.slice(index + 1),
    ]);
  };

  const handleChangeOptionValues = (e, index) => {
    setRows((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        values: e,
      },
      ...prev.slice(index + 1),
    ]);
  };

  useEffect(() => {
    form.setFieldsValue({
      options: rows?.map((row, i) => ({
        ...row,
        position: i + 1,
      })),
    });
  }, [rows]);

  useEffect(() => {
    setRows((prev) =>
      product?.options?.map((option, i) => ({
        uuid: v4(),
        ...option,
      }))
    );
  }, [product]);

  console.log(rows);

  return (
    <>
      <Form.Item name="options" hidden={true}></Form.Item>
      <Title level={5} className="mt-5">
        Option
      </Title>
      {rows
        ?.sort((a, b) => {
          if (a.position < b.position) {
            return -1;
          }
          if (a.position > b.position) {
            return 1;
          }
          return 0;
        })
        ?.map((row, i) => (
          <Row gutter={16} className="mb-3" key={row.uuid}>
            <Col span={10}>
              <Input
                placeholder="Name"
                onChange={(e) => handleChangeOptionName(e, i)}
                value={rows?.find((x) => x.uuid == row.uuid)?.name}
              />
            </Col>
            <Col span={10}>
              <Select
                mode="tags"
                placeholder="Values"
                className="w-full"
                //   options={[]}
                onChange={(e) => handleChangeOptionValues(e, i)}
                value={rows?.find((x) => x.uuid == row.uuid)?.values}
              />
            </Col>
            <Col span={4}>
              <Button onClick={() => handleDeleteRow(row.uuid)}>Delete</Button>
            </Col>
          </Row>
        ))}

      <Button className="mt-2" onClick={handleAddRow}>
        Add
      </Button>
    </>
  );
};

export default ProductOptionForm;
