import React, { useEffect, useRef, useState } from "react";
import CartContent from "./CartContent";
import CartInfomation from "./CartInfomation";

const Cart = () => {
  return (
    <div className="container mx-auto pt-3 pb-10">
      <div className="w-full flex justify-between gap-10">
        <CartInfomation />
        <CartContent />
      </div>
    </div>
  );
};

export default Cart;
