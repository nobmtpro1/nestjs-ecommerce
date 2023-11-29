import { createSlice } from "@reduxjs/toolkit";

const initialState = { common: null };

export const scheduleSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCommon: (state, action) => {
      state.common = { ...action.payload };
    },
  },
});

export const { setCommon } = scheduleSlice.actions;

export default scheduleSlice.reducer;
