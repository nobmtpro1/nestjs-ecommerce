import { Checkbox, Input, Form, Select } from "antd";
import React, { useState } from "react";

const SimpleInventoryTab = ({ initData, form }) => {
  console.log(form);

  return (
    <>
      <Form.Item label="SKU" name="simpleSku">
        <Input />
      </Form.Item>
      <Form.Item label="Stock" name="simpleStock">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Stock status" name="simpleStockStatus">
        <Select>
          {initData?.productStockStatus?.map((e, i) => (
            <Select.Option value={e?.value} key={i}>
              {e?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Sold individually" name="simpleSoldIndividually">
        <Checkbox
          defaultChecked={form?.getFieldValue("simpleSoldIndividually")}
          onChange={(e) =>
            form.setFieldsValue({
              simpleSoldIndividually: e?.target?.checked,
            })
          }
        >
          Limit purchases to 1 item per order
        </Checkbox>
      </Form.Item>
    </>
  );
};

export default SimpleInventoryTab;
