import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { updateCart } from "ultils/cartHelpers";
import { getVariantImage, renderPrice } from "ultils/productHelpers";

const CartContent = () => {
  const cartReducer = useSelector((state) => state?.cart);
  const [cartItems, setCartItems] = useState([]);
  const cart = cartReducer?.cart;

  useEffect(() => {
    setCartItems(cartReducer?.cart?.items);
  }, [cartReducer]);

  const changeCartItemQuantityDebounce = useRef(null);
  const handleChangeCartItemQuantity = (e, itemIndex) => {
    const value = e.target.value;
    if (value < 1) {
      return;
    }
    const newCartItems = cartItems?.map((item, i) => ({
      ...item,
      quantity: i == itemIndex ? parseInt(value) : item.quantity,
    }));
    setCartItems(newCartItems);

    clearTimeout(changeCartItemQuantityDebounce.current);
    changeCartItemQuantityDebounce.current = setTimeout(() => {
      updateCart({
        items: newCartItems?.map((item) => ({
          variantId: item?.variant?.id,
          quantity: item?.quantity,
        })),
      });
    }, 300);
  };

  return (
    <div className="flex-1 border-1 shadow-xl p-5 rounded-xl">
      <h3>SHOPPING BAG</h3>
      <div className="flex flex-col	gap-5 mt-5">
        {cartItems?.map((item, i) => (
          <div className="flex justify-between gap-5 border-b-2 p-3" key={i}>
            <div className="flex-1">
              <img
                className="w-full h-20 object-contain"
                src={getVariantImage(item?.product, item?.variant)?.src}
              />
            </div>
            <div className="flex-1 flex flex-col justify-between gap-5">
              <div className="text-sm">{item?.product?.title}</div>
              <div className="text-sm">
                {item?.variant?.option1 && item?.variant?.option1}
                {item?.variant?.option2 && `, ${item?.variant?.option2}`}
                {item?.variant?.option3 && `, ${item?.variant?.option3}`}
              </div>
            </div>
            <div className="flex-1 flex items-end flex-col justify-between gap-5">
              <div>{renderPrice(item?.variant?.price)}</div>
              <input
                type="number"
                value={item?.quantity}
                className="w-20 border p-2"
                onChange={(e) => handleChangeCartItemQuantity(e, i)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col	gap-5 mt-5">
        <div className="flex justify-between">
          <div>Subtotal:</div>
          <div>{renderPrice(cart?.subtotal)}</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping:</div>
          <div>{renderPrice(cart?.shippingPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Total:</div>
          <div>{renderPrice(cart?.total)}</div>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
