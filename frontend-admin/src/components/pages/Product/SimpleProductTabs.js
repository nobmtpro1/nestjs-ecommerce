import { Tabs } from "antd";
import React from "react";
import SimpleGeneralTab from "./SimpleGeneralTab";

const SimpleProductTabs = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          key: "1",
          label: "General",
          children: <SimpleGeneralTab />,
        },
        {
          key: "2",
          label: "Tab 2",
          children: "Content of Tab Pane 2",
        },
        {
          key: "3",
          label: "Tab 3",
          children: "Content of Tab Pane 3",
        },
      ]}
    />
  );
};

export default SimpleProductTabs;
