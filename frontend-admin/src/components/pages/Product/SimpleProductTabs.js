import { Tabs } from "antd";
import React from "react";
import SimpleGeneralTab from "./SimpleGeneralTab";
import SimpleInventoryTab from "./SimpleInventoryTab";

const SimpleProductTabs = ({ initData }) => {
  return (
    <Tabs
      destroyInactiveTabPane={true}
      defaultActiveKey="1"
      items={[
        {
          key: "1",
          label: "General",
          children: <SimpleGeneralTab />,
        },
        {
          key: "2",
          label: "Inventory",
          children: <SimpleInventoryTab initData={initData} />,
        },
      ]}
    />
  );
};

export default SimpleProductTabs;
