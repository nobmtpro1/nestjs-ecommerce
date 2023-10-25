import { Tabs } from "antd";
import React from "react";
import SimpleGeneralTab from "./SimpleGeneralTab";
import SimpleInventoryTab from "./SimpleInventoryTab";
import SimpleShippingTab from "./SimpleShippingTab";
import SimpleAttributeTab from "./SimpleAttributeTab";

const SimpleProductTabs = ({ initData, form, product }) => {
  return (
    <Tabs
      destroyInactiveTabPane={true}
      defaultActiveKey="1"
      items={[
        {
          forceRender: true,
          key: "1",
          label: "General",
          children: <SimpleGeneralTab />,
        },
        {
          forceRender: true,
          key: "2",
          label: "Inventory",
          children: <SimpleInventoryTab initData={initData} form={form} />,
        },
        {
          forceRender: true,
          key: "3",
          label: "Shipping",
          children: <SimpleShippingTab />,
        },
        {
          forceRender: true,
          key: "4",
          label: "Attribute",
          children: <SimpleAttributeTab product={product} form={form} />,
        },
      ]}
    />
  );
};

export default SimpleProductTabs;
