import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const SearchForm = () => {
  const [form] = Form.useForm();
  const [formFields, setFormFields] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values) => {
    const query = queryString.parse(location?.search);
    query.search = values?.search;
    location.search = queryString.stringify(query);
    navigate(location);
  };

  useEffect(() => {
    const query = queryString.parse(location?.search);
    setFormFields([
      {
        name: "search",
        value: query?.search || "",
      },
    ]);
  }, [location]);

  return (
    <Form form={form} onFinish={onFinish} fields={formFields}>
      <Row>
        <Col className="mr-3">
          <Form.Item name="search">
            <Input placeholder="Search" />
          </Form.Item>
        </Col>
        <Col>
          <Button primary htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
