import { Button, Col, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../../ultils/axios";
import {
  API_PRODUCT_ATTRIBUTE,
  API_PRODUCT_ATTRIBUTE_VALUE,
} from "../../../constants/api";
import { toast } from "react-toastify";
import EditValuesModal from "./EditValuesModal";
const ProductAttributeEditValues = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productAttributeValue, seTproductAttributeValue] = useState(null);

  const showModal = (productAttributeValue) => {
    seTproductAttributeValue(productAttributeValue);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = () => {
    {
      axios
        .get(`${API_PRODUCT_ATTRIBUTE}/${searchParams?.get("id") || ""}`)
        .then((res) => setData(res?.data?.data));
    }
  };

  useEffect(() => {
    fetchData();
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
          <a onClick={() => showModal(record)}>Edit</a>
          <a onClick={() => handleDelete(record?.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      axios
        .delete(API_PRODUCT_ATTRIBUTE_VALUE, { data: { id } })
        .then((res) => {
          toast.success("Delete success");
          fetchData();
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
      <Row className="mb-5">
        <Col>
          <Button onClick={() => showModal(null)}>Add</Button>
          <EditValuesModal
            isModalOpen={isModalOpen}
            productAttributeValue={productAttributeValue}
            handleCancel={handleCancel}
            attributeId={searchParams?.get("id")}
            fetchData={fetchData}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data?.productAttributeValues} />
    </>
  );
};

export default ProductAttributeEditValues;
