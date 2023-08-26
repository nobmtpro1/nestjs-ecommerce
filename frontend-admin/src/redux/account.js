import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_ACCOUNT } from "../constants/localstorage";

const initialState = {
  account: JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT) || null)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT) || null)
    : null,
};

export const scheduleSlice = createSlice({
  name: LOCAL_STORAGE_ACCOUNT,
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload.account;
      localStorage.setItem(
        LOCAL_STORAGE_ACCOUNT,
        JSON.stringify(action.payload.account)
      );
    },
    logout: (state, action) => {
      state.account = null;
      localStorage.setItem(LOCAL_STORAGE_ACCOUNT, JSON.stringify(null));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccount, logout } = scheduleSlice.actions;

export default scheduleSlice.reducer;
