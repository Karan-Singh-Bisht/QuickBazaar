import React from "react";
import { AddressCard } from "../checkout/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const OrderDetails = () => {
  return (
    <div className="lg:px-20 px-5">
      <div className="shadow-lg p-3 rounded-md">
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCard />
      </div>
      <div className="py-20">
        <OrderTracker activeStep={2}></OrderTracker>
      </div>
      <Grid container className="space-x-5 space-y-5">
        {[1, 1, 1, 1, 1].map((item, index) => (
          <Grid
            key={index}
            item
            container
            className="shadow-xl rounded-md space-y-5 hover:cursor-pointer hover:shadow-gray-500 p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex space-x-5 items-center">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70"
                  alt="Kurta tile"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">
                    Men Printed Pure Cotton Straight Kurta
                  </p>
                  <div className="space-x-5 opacity-50">
                    <span className="opacity:50 text-xs ">Color: Green</span>
                    <span className="opacity:50 text-xs ">Size: M</span>
                  </div>
                  <p>Seller: Tokyo Talkies</p>
                  <p>$499</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <Box className="hover:cursor-pointer" sx={{ color: "purple " }}>
                <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
