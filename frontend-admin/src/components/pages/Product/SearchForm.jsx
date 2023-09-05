import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const SearchForm = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const query = queryString.parse(location?.search);
    query.search = values?.search;
    location.search = queryString.stringify(query);
    navigate(location);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="search"
        rules={[
          {
            required: true,
            message: "Please enter search",
          },
        ]}
      >
        <Row>
          <Col className="mr-3">
            <Input placeholder="Search" />
          </Col>
          <Col>
            <Button primary htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
