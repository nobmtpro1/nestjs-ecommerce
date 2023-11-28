import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_CART_ID } from "constants/localstorage";

const initialState = { cart: null };

export const scheduleSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      console.log(state.cart);
      state.cart = { ...action.payload };
      localStorage.setItem(LOCAL_STORAGE_CART_ID, state?.cart?.cart?.id || "");
    },
  },
});

export const { setCart } = scheduleSlice.actions;

export default scheduleSlice.reducer;
