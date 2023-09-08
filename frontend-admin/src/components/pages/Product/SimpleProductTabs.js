import { Tabs } from "antd";
import React from "react";
import SimpleGeneralTab from "./SimpleGeneralTab";
import SimpleInventoryTab from "./SimpleInventoryTab";

const SimpleProductTabs = ({ initData, form }) => {
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
      ]}
    />
  );
};

export default SimpleProductTabs;
