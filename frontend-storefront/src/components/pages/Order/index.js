import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../ultils/axios";
import { API_CHECKOUT_ORDER_DETAIL } from "constants/api";
import { alertResponseErrors } from "ultils/helpers";

const Order = () => {
  const { uuid } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(API_CHECKOUT_ORDER_DETAIL.replace(":uuid", uuid))
      .then((res) => {
        if (res?.data?.success) {
          setOrder(res?.data?.data);
        } else {
          alertResponseErrors(res?.data);
        }
      })
      .catch((err) => alertResponseErrors(err));
  }, [uuid]);

  return (
    <div className="container mx-auto pt-3 pb-10">
      <div
        className="w-full flex justify-between gap-10"
        style={{ overflowWrap: "break-word", overflow: "hidden" }}
      >
        {order ? JSON.stringify(order) : "NOT FOUND"}
      </div>
    </div>
  );
};

export default Order;
