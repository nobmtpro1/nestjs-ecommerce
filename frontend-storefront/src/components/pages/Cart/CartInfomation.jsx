import React, { useEffect, useState } from "react";
import axios from "../../../ultils/axios";
import { API_ADDRESS } from "constants/api";
import { alertResponseErrors } from "ultils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setPayment, setShippingAddress } from "redux/cart";
import { placeOrder } from "ultils/cartHelpers";
import { ROUTE_ORDER } from "constants/routes";

const CartInfomation = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState({});
  const [userAddress, setUserAddress] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    provinceCode: "",
    districtCode: "",
  });
  const commonReducer = useSelector((state) => state?.common);
  const cartReducer = useSelector((state) => state?.cart);
  const accountReducer = useSelector((state) => state?.account);
  const payment = cartReducer?.payment;
  const paymentOptions = commonReducer?.common?.paymentOptions;

  useEffect(() => {
    axios
      .get(API_ADDRESS)
      .then((res) => {
        if (res?.data?.success) {
          setAddress(res?.data?.data);
        }
      })
      .catch((error) => alertResponseErrors(error));
  }, []);

  useEffect(() => {
    dispatch(setPayment(paymentOptions?.[0]?.value));
  }, [paymentOptions]);

  const handleChangePayment = (e) => {
    dispatch(setPayment(e.target.value));
  };

  const handleChangeAddress = (e, field) => {
    setUserAddress((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    const order = await placeOrder();
    if (order) {
      window.location.href = ROUTE_ORDER.replace(":uuid", order?.uuid);
    }
  };

  useEffect(() => {
    const userAddress = accountReducer?.account?.profile?.address;
    if (userAddress) {
      setUserAddress({
        email: accountReducer?.account?.email,
        name: userAddress?.name,
        phone: userAddress?.phone,
        address: userAddress?.address,
        provinceCode: userAddress?.provinceCode,
        districtCode: userAddress?.districtCode,
      });
    }
  }, [accountReducer]);

  useEffect(() => {
    dispatch(setShippingAddress({ ...userAddress }));
  }, [userAddress]);

  return (
    <div className="flex-initial w-1/2 shadow-xl p-5 rounded-xl">
      <h3>INFOMATION</h3>
      <form>
        <input
          placeholder="Name"
          className="flex w-full border p-3 outline-0 my-3"
          onChange={(e) => handleChangeAddress(e, "name")}
          value={userAddress?.name}
        />
        <input
          placeholder="Email"
          className="flex w-full border p-3 outline-0 my-3"
          onChange={(e) => handleChangeAddress(e, "email")}
          value={userAddress?.email}
        />
        <input
          placeholder="Phone"
          className="flex w-full border p-3 outline-0 my-3"
          onChange={(e) => handleChangeAddress(e, "phone")}
          value={userAddress?.phone}
        />
        <input
          placeholder="Address"
          className="flex w-full border p-3 outline-0 my-3"
          onChange={(e) => handleChangeAddress(e, "address")}
          value={userAddress?.address}
        />
        <select
          className="flex w-full border p-3 outline-0 my-3"
          onChange={(e) => handleChangeAddress(e, "provinceCode")}
          value={userAddress?.provinceCode}
        >
          <option selected disabled>
            Province
          </option>
          {address?.province?.map((e, i) => (
            <option key={i} value={e?.provinceCode}>
              {e?.provinceName}
            </option>
          ))}
        </select>
        <select
          className="flex w-full border p-3 outline-0 my-3"
          onChange={(e) => handleChangeAddress(e, "districtCode")}
          value={userAddress?.districtCode}
        >
          <option selected disabled>
            District
          </option>
          {address?.district?.map((e, i) => (
            <option key={i} value={e?.districtCode}>
              {e?.districtName}
            </option>
          ))}
        </select>
      </form>
      <h3 className="pt-5">PAYMENT</h3>
      {paymentOptions?.map((paymentOption, i) => (
        <div key={i}>
          <input
            checked={payment == paymentOption?.value}
            type="radio"
            id={paymentOption?.value}
            name="payment"
            value={paymentOption?.value}
            className="mr-2 my-3"
            onChange={handleChangePayment}
          />
          <label htmlFor="cod" className="h-2">
            {paymentOption?.name}
          </label>
        </div>
      ))}
      <button
        className="bg-black p-5 w-full rounded-xl text-white mt-10"
        onClick={handlePlaceOrder}
      >
        PLACE ORDER
      </button>
    </div>
  );
};

export default CartInfomation;
