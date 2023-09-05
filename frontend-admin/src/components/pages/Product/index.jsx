import { Breadcrumb, Button, Col, Row, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { ROUTE_PRODUCT } from "../../../constants/routes";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../../../ultils/axios";
import { API_PRODUCT } from "../../../constants/api";
import { STORAGE_URL } from "../../../constants/config";
import LayoutContent from "components/common/LayoutContent";
import ProductAdd from "./add";
import ProductEdit from "./edit";
import { toast } from "react-toastify";

const Product = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("action")) {
      axios.get(API_PRODUCT).then((res) => setData(res?.data?.data));
    }
  }, [searchParams]);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <a>
          <img className="w-12" src={STORAGE_URL + "/" + text?.src} />
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
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <a>{text}</a>,
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={ROUTE_PRODUCT + "?action=edit&id=" + record?.id}>Edit</Link>
          <a onClick={() => handleDelete(record?.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      axios.delete(API_PRODUCT, { data: { id } }).then((res) => {
        toast.success("Delete success");
        setData((prev) => prev?.filter((x) => x?.id != id));
      });
    }
  };

  return (
    <Content className="mx-5">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ROUTE_PRODUCT}>Product</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <LayoutContent>
        {searchParams.get("action") == "add" ? (
          <ProductAdd />
        ) : searchParams.get("action") == "edit" ? (
          <ProductEdit />
        ) : (
          <>
            <Row className="mb-5">
              <Col>
                <Link to={ROUTE_PRODUCT + "?action=add"}>
                  <Button primary>Add</Button>
                </Link>
              </Col>
            </Row>
            <Table columns={columns} dataSource={data} />
          </>
        )}
      </LayoutContent>
    </Content>
  );
};

export default Product;
