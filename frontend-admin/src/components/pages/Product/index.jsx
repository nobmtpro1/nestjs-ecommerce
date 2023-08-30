import { Breadcrumb, Button, Col, Row, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import {
  ROUTE_PRODUCT,
  ROUTE_PRODUCT_ADD,
  ROUTE_PRODUCT_EDIT,
} from "../../../constants/routes";
import { Link } from "react-router-dom";
import axios from "../../../ultils/axios";
import { API_PRODUCT_ALL } from "../../../constants/api";
import { STORAGE_URL } from "../../../constants/config";

const Product = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(API_PRODUCT_ALL)
      .then((res) => setData(res?.data))
      .catch((err) => alert(err?.response?.data?.message));
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <a>
          <img className="w-12" src={STORAGE_URL + "/" + text} />
        </a>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={ROUTE_PRODUCT_EDIT.replace(":id", record?.id)}>Edit</Link>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Content className="mx-5">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ROUTE_PRODUCT}>Product</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="p-5 min-h-full"
        style={{
          background: colorBgContainer,
        }}
      >
        <Row className="mb-5">
          <Col>
            <Link to={ROUTE_PRODUCT_ADD}>
              <Button primary>Add</Button>
            </Link>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
      </div>
    </Content>
  );
};

export default Product;
