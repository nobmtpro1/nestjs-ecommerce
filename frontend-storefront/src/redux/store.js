import { configureStore } from "@reduxjs/toolkit";
import account from "./account";
import cart from "./cart";
import common from "./common";

export const store = configureStore({
  reducer: {
    account: account,
    cart,
    common,
  },
});
