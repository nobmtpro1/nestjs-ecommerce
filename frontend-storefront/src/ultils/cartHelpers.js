import { store } from "redux/store";
import axios from "../ultils/axios";
import { API_CHECKOUT_CART } from "constants/api";
import { LOCAL_STORAGE_CART_ID } from "constants/localstorage";

export const getCart = () => {
  const cart_id = localStorage.getItem(LOCAL_STORAGE_CART_ID);
  axios
    .get(`${API_CHECKOUT_CART}?cart_id=${parseInt(cart_id) || ""}`)
    .then((res) => {
      console.log(res);
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
  const cartItems = state?.cart?.cart?.items;
  let cartItemsPost = state?.cart?.cart?.items?.map((item) => ({
    id: item.id,
    variantId: item.variant.id,
    quantity: item.quantity,
  }));

  if (cartItemsPost) {
    const itemExistIndex = cartItemsPost?.findIndex((x) => x.id == variant.id);
    if (itemExistIndex) {
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
      console.log(res);
      localStorage.setItem(LOCAL_STORAGE_CART_ID, res?.data?.data?.id);
    })
    .catch((err) => {
      console.log(err);
    });
};
