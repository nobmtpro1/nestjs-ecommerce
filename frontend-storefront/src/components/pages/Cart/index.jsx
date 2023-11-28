import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "redux/cart";
import { updateCart } from "ultils/cartHelpers";
import { getVariantImage, renderPrice } from "ultils/productHelpers";
const Cart = () => {
  const dispatch = useDispatch();
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
    // updateCart({ items: newCartItems });
  };

  return (
    <div className="container mx-auto pt-3">
      <div className="w-full flex justify-between gap-10">
        <div className="flex-initial w-1/2 shadow-xl p-5 rounded-xl">
          <h3>SHOPPING INFOMATION</h3>
        </div>

        <div className="flex-1 border-1 shadow-xl p-5 rounded-xl">
          <h3>SHOPPING BAG</h3>
          <div className="flex flex-col	gap-5 mt-5">
            {cartItems?.map((item, i) => (
              <div
                className="flex justify-between gap-5 border-b-2 p-3"
                key={i}
              >
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
