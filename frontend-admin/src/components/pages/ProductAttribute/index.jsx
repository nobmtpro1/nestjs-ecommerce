import { Breadcrumb, Button, Col, Row, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { ROUTE_PRODUCT_ATTRIBUTE } from "../../../constants/routes";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../../../ultils/axios";
import { API_PRODUCT_ATTRIBUTE } from "../../../constants/api";
import LayoutContent from "components/common/LayoutContent";
import { toast } from "react-toastify";
import ProductAttributeAdd from "./add";
import ProductAttributeEdit from "./edit";
import ProductAttributeEditValues from "./EditValues";

const ProductAttribute = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("action")) {
      axios
        .get(
          `${API_PRODUCT_ATTRIBUTE}?search=${searchParams?.get("search") || ""}`
        )
        .then((res) => setData(res?.data?.data));
    }
  }, [searchParams]);

  const columns = [
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
          <Link
            to={ROUTE_PRODUCT_ATTRIBUTE + "?action=editValues&id=" + record?.id}
          >
            Edit values
          </Link>
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
        if (res?.data?.success) {
          toast.success("Delete success");
          setData((prev) => prev?.filter((x) => x?.id != id));
        } else {
          toast.error(res?.data?.message);
        }
      });
    }
  };

  return (
    <Content className="mx-5">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ROUTE_PRODUCT_ATTRIBUTE}>Product attribute</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <LayoutContent>
        {searchParams.get("action") == "add" ? (
          <ProductAttributeAdd />
        ) : searchParams.get("action") == "edit" ? (
          <ProductAttributeEdit />
        ) : searchParams.get("action") == "editValues" ? (
          <ProductAttributeEditValues />
        ) : (
          <>
            <Row className="mb-5">
              <Col>
                <Link to={ROUTE_PRODUCT_ATTRIBUTE + "?action=add"}>
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

export default ProductAttribute;
