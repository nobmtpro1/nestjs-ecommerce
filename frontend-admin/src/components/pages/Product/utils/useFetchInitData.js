import React, { useEffect, useState } from "react";
import axios from "../../../../ultils/axios";
import { API_PRODUCT_CREATE } from "../../../../constants/api";

const useFetchInitData = () => {
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    axios.get(API_PRODUCT_CREATE).then((res) => {
      if (res?.status != 200) {
        alert(res?.data?.message);
      } else {
        setInitData(res?.data);
      }
    });
  }, []);
  return [initData];
};

export default useFetchInitData;
