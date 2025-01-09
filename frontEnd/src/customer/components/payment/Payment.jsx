import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePayment } from "../../../state/Payment/paymentSlice";
import { getOrder } from "../../../state/Order/orderSlice";
import CartItem from "../cart/CartItem";
import { Alert, AlertTitle, Grid } from "@mui/material";
import { AddressCard } from "../checkout/AddressCard";

const Payment = () => {
  const dispatch = useDispatch();
  const [paymentId, SetPaymentId] = useState();
  const [paymentStatus, SetPaymentStatus] = useState();
  const params = useParams();
  const orderId = params.orderId;
  console.log(orderId);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    console.log(urlParam.get("razorpay_payment_id"));
    SetPaymentId(urlParam.get("razorpay_payment_id"));
    SetPaymentStatus(urlParam.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId) {
      const data = { orderId, paymentId };
      dispatch(updatePayment(data));
      console.log("DOne");
    }
    dispatch(getOrder({ orderId: orderId }));
  }, [orderId, paymentId]);
  const order = useSelector((state) => state.order);
  console.log("order:", order);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulations on your order!!
        </Alert>
        <Grid container className="space-y-5 py-5 pt-20">
          {order.orders?.orderItems?.map((item, index) => (
            <Grid
              key={index}
              container
              item
              className="shadow-lg hover:shadow-2xl p-5 my-3"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Grid item xs={6}>
                <div className="flex items-center">
                  <img
                    className="w-[5rem] h-[5rem] object-cover object-top"
                    src={item?.product?.imageUrl}
                    alt={item?.product?.brand}
                  />
                  <div className="ml-5 space-y-2">
                    <p>{item.product.title}</p>
                    <div className="opacity-50 text-xs font-semibold space-y-2">
                      <span>Size : {item.size}</span>
                    </div>
                    <p>Seller : {item.product.brand}</p>
                    <p>{item.price}</p>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <AddressCard orderDetails={order.orders?.shippingAddress} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Payment;
