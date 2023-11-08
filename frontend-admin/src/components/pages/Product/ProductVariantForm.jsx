import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import Title from "antd/es/typography/Title";
import {
  PRODUCT_STATUS_ACTIVE,
  PRODUCT_STATUS_DRAFT,
  PRODUCT_STOCK_STATUS_IN_STOCK,
  PRODUCT_STOCK_STATUS_OUT_OF_STOCK,
} from "constants/config";
import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { handleChangeUpload } from "./helpers";
import { PlusOutlined } from "@ant-design/icons";

const ProductVariantForm = ({ form, product, options }) => {
  const [rows, setRows] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const defaultVariant = {
      key: "",
      id: "",
      sku: "",
      status: PRODUCT_STATUS_ACTIVE,
      downloadable: false,
      isVirtual: false,
      isManageStock: true,
      regularPrice: 0,
      salePrice: "",
      salePriceFrom: "",
      salePriceTo: "",
      soldIndividually: false,
      stock: "",
      stockStatus: PRODUCT_STOCK_STATUS_IN_STOCK,
      weight: "",
      length: "",
      width: "",
      height: "",
      image: null,
      option1: "",
      option2: "",
      option3: "",
    };
    if (!(options?.length > 0)) {
      setRows([defaultVariant]);
    } else {
      const array = [];
      for (const value1 of options?.[0]?.values || []) {
        if (options?.[1]) {
          for (const value2 of options?.[1]?.values || []) {
            if (options?.[2]) {
              for (const value3 of options?.[2]?.values || []) {
                array?.push({
                  ...defaultVariant,
                  key: v4(),
                  option1: value1,
                  option2: value2,
                  option3: value3,
                });
              }
            } else {
              array?.push({
                ...defaultVariant,
                key: v4(),
                option1: value1,
                option2: value2,
              });
            }
          }
        } else {
          array?.push({
            ...defaultVariant,
            key: v4(),
            option1: value1,
          });
        }
      }
      setRows(array);
    }
  }, [options]);

  const handleChangeVariant = (index, field, value) => {
    setRows((prev) => [
      ...prev.slice(0, index),
      {
        ...prev.find((x, i) => i == index),
        [field]: value,
      },
      ...prev.slice(index + 1),
    ]);
  };

  console.log(rows);
  console.log(fileList);

  return (
    <>
      <Title level={5} className="mt-5">
        Variant
      </Title>
      {rows?.map((row, i) => (
        <div key={i}>
          <Collapse
            className="mb-2"
            items={[
              {
                key: i,
                label: (
                  <>
                    {row?.option1 && row?.option2 && row?.option3 ? (
                      <Row gutter={16} className="mb-3">
                        <Col span={2}>
                          <Checkbox
                            defaultChecked={
                              row.status == PRODUCT_STATUS_ACTIVE ? true : false
                            }
                            onChange={(e) =>
                              handleChangeVariant(
                                i,
                                "status",
                                e.target.checked == true
                                  ? PRODUCT_STATUS_ACTIVE
                                  : PRODUCT_STATUS_DRAFT
                              )
                            }
                          ></Checkbox>
                        </Col>
                        <Col span={10}>
                          {row?.option1 && `${row?.option1}`}
                          {row?.option2 && `, ${row?.option2}`}
                          {row?.option3 && `, ${row?.option3}`}
                        </Col>
                      </Row>
                    ) : (
                      "Default Variant"
                    )}
                  </>
                ),
                children: (
                  <>
                    <div className="mb-2">
                      <Typography.Text>SKU</Typography.Text>
                      <Input
                        type="text"
                        value={row.sku}
                        onChange={(e) =>
                          handleChangeVariant(i, "sku", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text className="mr-2">
                        Downloadable
                      </Typography.Text>
                      <Checkbox
                        defaultChecked={row.downloadable}
                        onChange={(e) =>
                          handleChangeVariant(
                            i,
                            "downloadable",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text className="mr-2">
                        Is virtual
                      </Typography.Text>
                      <Checkbox
                        defaultChecked={row.isVirtual}
                        onChange={(e) =>
                          handleChangeVariant(i, "isVirtual", e.target.checked)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text className="mr-2">
                        Is manage stock
                      </Typography.Text>
                      <Checkbox
                        defaultChecked={row.isManageStock}
                        onChange={(e) =>
                          handleChangeVariant(
                            i,
                            "isManageStock",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text className="mr-2">
                        Sold individually
                      </Typography.Text>
                      <Checkbox
                        defaultChecked={row.soldIndividually}
                        onChange={(e) =>
                          handleChangeVariant(
                            i,
                            "soldIndividually",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Regular price</Typography.Text>
                      <Input
                        type="number"
                        value={row.regularPrice}
                        onChange={(e) =>
                          handleChangeVariant(i, "regularPrice", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Sale price</Typography.Text>
                      <Input
                        type="number"
                        value={row.salePrice}
                        onChange={(e) =>
                          handleChangeVariant(i, "salePrice", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Sale price from</Typography.Text>
                      <Input
                        type="date"
                        value={row.salePriceFrom}
                        onChange={(e) =>
                          handleChangeVariant(
                            i,
                            "salePriceFrom",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Sale price to</Typography.Text>
                      <Input
                        type="date"
                        value={row.salePriceTo}
                        onChange={(e) =>
                          handleChangeVariant(i, "salePriceTo", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Stock</Typography.Text>
                      <Input
                        type="number"
                        value={row.stock}
                        onChange={(e) =>
                          handleChangeVariant(i, "stock", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Stock status</Typography.Text>
                      <Select
                        className="w-full"
                        value={row.stockStatus}
                        onChange={(e) =>
                          handleChangeVariant(i, "stockStatus", e.target.value)
                        }
                        options={[
                          {
                            value: PRODUCT_STOCK_STATUS_IN_STOCK,
                            label: "In stock",
                          },
                          {
                            value: PRODUCT_STOCK_STATUS_OUT_OF_STOCK,
                            label: "Out of stock",
                          },
                        ]}
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Weight</Typography.Text>
                      <Input
                        type="number"
                        value={row.weight}
                        onChange={(e) =>
                          handleChangeVariant(i, "weight", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Height</Typography.Text>
                      <Input
                        type="number"
                        value={row.height}
                        onChange={(e) =>
                          handleChangeVariant(i, "height", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Length</Typography.Text>
                      <Input
                        type="number"
                        value={row.length}
                        onChange={(e) =>
                          handleChangeVariant(i, "length", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Width</Typography.Text>
                      <Input
                        type="number"
                        value={row.width}
                        onChange={(e) =>
                          handleChangeVariant(i, "width", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <Typography.Text>Image</Typography.Text>
                      <Upload
                        listType="picture-card"
                        maxCount={1}
                        accept="image/*"
                        fileList={row?.image ? [row?.image] : []}
                        onChange={({ file, fileList, event }) =>
                          handleChangeUpload(
                            file,
                            fileList,
                            event,
                            (images) => {
                              handleChangeVariant(i, "image", images?.[0]);
                              handleChangeVariant(
                                i,
                                "imageId",
                                images?.[0]?.uid
                              );
                            },
                            1
                          )
                        }
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </div>
                  </>
                ),
              },
            ]}
          />
        </div>
      ))}
    </>
  );
};

export default ProductVariantForm;
