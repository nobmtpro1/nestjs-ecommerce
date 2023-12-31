import { store } from "redux/store";
import axios from "../ultils/axios";
import { API_CHECKOUT_CART, API_CHECKOUT_PLACE_ORDER } from "constants/api";
import { LOCAL_STORAGE_CART_ID } from "constants/localstorage";
import { setCart } from "redux/cart";
import { alertResponseErrors } from "./helpers";

export const getCart = () => {
  const cart_id = localStorage.getItem(LOCAL_STORAGE_CART_ID);
  axios
    .get(`${API_CHECKOUT_CART}?cart_id=${parseInt(cart_id) || ""}`)
    .then((res) => {
      console.log(res);
      store.dispatch(setCart(res?.data?.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleAddToCart = async (
  product,
  variantId = null,
  quantity = 1
) => {
  let variant = product?.variants?.[0];
  if (variantId) {
    variant = product?.variants?.find((x) => x.id == variantId);
  }
  const state = store.getState();
  const cart = state?.cart?.cart;
  const cartItems = cart?.items;
  console.log(cartItems);
  let cartItemsPost = cartItems?.map((item) => ({
    variantId: item.variant.id,
    quantity: item.quantity,
  }));

  if (cartItemsPost) {
    const itemExistIndex = cartItemsPost?.findIndex(
      (x) => x.variantId == variant.id
    );
    console.log(itemExistIndex);
    if (itemExistIndex >= 0) {
      console.log(cartItemsPost[itemExistIndex]);
      cartItemsPost[itemExistIndex]["quantity"] =
        parseInt(cartItemsPost[itemExistIndex]["quantity"]) +
        parseInt(quantity);
    } else {
      cartItemsPost.push({
        variantId: variant.id,
        quantity: parseInt(quantity),
      });
    }
  } else {
    cartItemsPost = [
      {
        variantId: variant.id,
        quantity: parseInt(quantity),
      },
    ];
  }

  console.log(cartItemsPost);
  await updateCart({ items: cartItemsPost });
};

export const updateCart = async ({ items }) => {
  const postData = {};
  if (items) {
    postData.items = items;
  }
  const cart_id = localStorage.getItem(LOCAL_STORAGE_CART_ID);
  axios
    .post(`${API_CHECKOUT_CART}?cart_id=${parseInt(cart_id) || ""}`, postData)
    .then((res) => {
      if (res?.data?.success) {
        store.dispatch(setCart(res?.data?.data));
      }
    })
    .catch((err) => {
      console.log(err);
      alertResponseErrors(err);
      store.dispatch(
        setCart({ ...store.getState()?.cart?.cart, time: new Date() })
      );
    });
};

export const getCartTotalQuantity = (cart) => {
  if (!cart) {
    return 0;
  }
  let totalQuantity = 0;
  for (const item of cart?.items || []) {
    totalQuantity += parseInt(item?.quantity);
  }
  return totalQuantity;
};

export const placeOrder = async () => {
  const cart_id = localStorage.getItem(LOCAL_STORAGE_CART_ID);
  const cartReducer = store.getState()?.cart;
  const shippingAddress = cartReducer?.shippingAddress;
  const payment = cartReducer?.payment;

  return await axios
    .post(`${API_CHECKOUT_PLACE_ORDER}?cart_id=${parseInt(cart_id) || ""}`, {
      shippingAddress,
      payment,
    })
    .then((res) => {
      if (res?.data?.success) {
        return res?.data?.data;
      } else {
        alertResponseErrors(res?.data);
        return false;
      }
    })
    .catch((err) => {
      alertResponseErrors(err);
      return false;
    });
};
