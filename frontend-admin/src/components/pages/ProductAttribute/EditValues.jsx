import { Col, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { ROUTE_PRODUCT_ATTRIBUTE } from "../../../constants/routes";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../../../ultils/axios";
import {
  API_PRODUCT_ATTRIBUTE,
} from "../../../constants/api";
import { toast } from "react-toastify";
const ProductAttributeEditValues = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`${API_PRODUCT_ATTRIBUTE}/${searchParams?.get("id") || ""}`)
      .then((res) => setData(res?.data?.data));
  }, []);

  const columns = [
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
          <Link to={ROUTE_PRODUCT_ATTRIBUTE + "?action=edit&id=" + record?.id}>
            Edit
          </Link>
          <a onClick={() => handleDelete(record?.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      axios.delete(API_PRODUCT_ATTRIBUTE, { data: { id } }).then((res) => {
        toast.success("Delete success");
        setData((prev) => prev?.filter((x) => x?.id != id));
      });
    }
  };

  return (
    <>
      <Row className="mb-5">
        <Col>
          <h1 className="text-4xl">color</h1>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data?.productAttributeValues} />
    </>
  );
};

export default ProductAttributeEditValues;
