import { theme } from "antd";
import React from "react";

const LayoutContent = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div
      className="p-5 min-h-full"
      style={{
        background: colorBgContainer,
      }}
    >
      {children}
    </div>
  );
};

export default LayoutContent;
