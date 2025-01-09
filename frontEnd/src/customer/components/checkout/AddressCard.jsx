import React from "react";

export const AddressCard = ({ orderDetails }) => {
  return (
    <div>
      <div className="space-y-3">
        <p className="font-semibold">
          {orderDetails?.firstName + " " + orderDetails?.lastName}
        </p>
        <p>
          {orderDetails?.streetAddress},{orderDetails?.city},
          {orderDetails?.state},{orderDetails?.zipCode}
        </p>
        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{orderDetails?.mobile}</p>
        </div>
      </div>
    </div>
  );
};
