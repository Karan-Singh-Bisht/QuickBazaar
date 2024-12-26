import React from "react";
import { AddressCard } from "./AddressCard";
import CartItem from "../cart/CartItem";
import { Divider } from "@mui/material";
import { Button } from "@headlessui/react";

const OrderSummary = () => {
  return (
    <div>
      <div className="p-5 shadow-lg rounded-md border">
        <AddressCard></AddressCard>
      </div>
      <div>
        <div className="lg:grid grid-cols-3 mt-10 lg:px-16 relative">
          <div className="col-span-2">
            {[1, 1, 1, 1].map((item, index) => (
              <div key={index}>
                <CartItem />
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
                  <span className="text-lg">Price (1 item)</span>
                  <span className="text-lg">$199</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span className="text-lg">Discount</span>
                  <span className="text-green-600 text-lg">-$199</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span className="text-lg">Delivery Charge</span>
                  <span className="text-green-600 text-lg">Free</span>
                </div>
                <Divider></Divider>
                <div className="flex justify-between pt-3 text-black">
                  <span className="font-bold text-xl">Total Amount</span>
                  <span className="font-bold text-xl">$199</span>
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
