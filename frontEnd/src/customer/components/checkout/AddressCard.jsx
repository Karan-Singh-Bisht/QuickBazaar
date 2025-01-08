import React from "react";

export const AddressCard = ({ orderDetails }) => {
  return (
    <div>
      <div className="space-y-3">
        <p className="font-semibold">
          {orderDetails?.orders?.shippingAddress?.firstName +
            " " +
            orderDetails?.orders?.shippingAddress?.lastName}
        </p>
        <p>
          {orderDetails?.orders?.shippingAddress?.streetAddress},
          {orderDetails?.orders?.shippingAddress?.city},
          {orderDetails?.orders?.shippingAddress?.state},
          {orderDetails?.orders?.shippingAddress?.zipCode}
        </p>
        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{orderDetails?.orders?.shippingAddress?.mobile}</p>
        </div>
      </div>
    </div>
  );
};
