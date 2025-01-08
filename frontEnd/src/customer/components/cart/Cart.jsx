import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../state/Cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleCheckOutButton = () => {
    navigate(`/checkout?step=${2}`);
  };

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <div>
      <div className="lg:grid grid-cols-3 mt-10 lg:px-16 relative">
        <div className="col-span-2">
          {cart.cart?.cartItems.map((item, index) => (
            <div key={index}>
              <CartItem item={item} />
            </div>
          ))}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border p-4">
            <p className="uppercase text-xl font-bold opacity-60 pb-3">
              price details
            </p>
            <Divider></Divider>
            {/* //can use hr too */}
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span className="text-lg">
                  Price ({cart.cart?.totalItem} item)
                </span>
                <span className="text-lg">${cart.cart?.totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span className="text-lg">Discount</span>
                <span className="text-green-600 text-lg">
                  -${cart.cart?.discount}
                </span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span className="text-lg">Delivery Charge</span>
                <span className="text-green-600 text-lg">Free</span>
              </div>
              <Divider></Divider>
              <div className="flex justify-between pt-3 text-black">
                <span className="font-bold text-xl">Total Amount</span>
                <span className="font-bold text-xl">
                  {cart?.cart?.totalDiscountedPrice}
                </span>
              </div>
              <Button
                onClick={handleCheckOutButton}
                className="w-full"
                variant="contained"
                sx={{
                  px: "2.5rem",
                  py: "0.7rem",
                  bgcolor: "#9155fd",
                  mt: "2rem",
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
