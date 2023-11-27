import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: null };

export const scheduleSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = { ...state.cart, ...action.payload };
    },
  },
});

export const { setCart } = scheduleSlice.actions;

export default scheduleSlice.reducer;
