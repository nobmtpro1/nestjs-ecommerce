import { configureStore } from "@reduxjs/toolkit";
import account from "./account";
import cart from "./cart";

export const store = configureStore({
  reducer: {
    account: account,
    cart,
  },
});
