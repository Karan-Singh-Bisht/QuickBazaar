import React, { useEffect } from "react";
import { AddressCard } from "./AddressCard";
import CartItem from "../cart/CartItem";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../state/Order/orderSlice";
import { useLocation, useParams } from "react-router-dom";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    dispatch(getOrder({ orderId: orderId }));
  }, [orderId]);

  const order = useSelector((state) => state.order);

  let totalPrice =
    order?.orders?.totalPrice - order?.orders?.totalDiscountedPrice;

  return (
    <div>
      <div className="p-5 shadow-lg rounded-md border">
        <AddressCard orderDetails={order}></AddressCard>
      </div>
      <div>
        <div className="lg:grid grid-cols-3 mt-10 lg:px-16 relative">
          <div className="col-span-2">
            {order.orders?.orderItems?.map((item, index) => (
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
                    Price ({order.orders.totalItem} item)
                  </span>
                  <span className="text-lg">
                    &#8377;
                    {order?.orders?.totalPrice}
                  </span>
                </div>

                <div className="flex justify-between pt-3 text-black">
                  <span className="text-lg">Discount</span>
                  <span className="text-green-600 text-lg">
                    -&#8377;
                    {totalPrice}
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
                    &#8377;
                    {order?.orders?.totalDiscountedPrice}
                  </span>
                </div>
                <Button
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
    </div>
  );
};

export default OrderSummary;
