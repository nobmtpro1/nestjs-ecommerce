import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_CART_ID } from "constants/localstorage";

const initialState = {
  cart: null,
  shippingAddress: {
    name: "",
    phone: "",
    address: "",
    provinceCode: "",
    districtCode: "",
  },
  payment: null,
};

export const scheduleSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = { ...action.payload };
      localStorage.setItem(LOCAL_STORAGE_CART_ID, state?.cart?.cart?.id || "");
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload };
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
  },
});

export const { setCart, setShippingAddress, setPayment } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
