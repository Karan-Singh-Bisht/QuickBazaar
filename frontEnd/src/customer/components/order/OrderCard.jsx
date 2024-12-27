import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";

const OrderCard = () => {
  return (
    <div className="p-5 shadow-lg hover:shadow-2xl border">
      <Grid
        container
        spacing={1}
        className="pt-2 pb-5 pl-3"
        sx={{ justifyContent: "space-between" }}
      >
        <Grid item xs={6}>
          <div className="flex cursor- pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src="https://rukminim1.flixcart.com/image/612/612/xif0q/jean/e/m/o/32-vje0123bkslmh043-veirdo-original-imagnggzasqfhvyg.jpeg?q=70"
              alt=""
            />
            <div className="space-y-2 ml-5">
              <p>Men Slim Mid Rise Black Jeans</p>
              <p className="opacity:50 text-xs font-semibold ">Size: M</p>
              <p className="opacity:50 text-xs font-semibold ">Color: Black</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p className="text-lg font-semibold">$199</p>
        </Grid>
        <Grid item xs={4}>
          {true && (
            <div>
              <p className="text-lg font-semibold flex items-center gap-3">
                <span className="text-green-500">
                  <AdjustIcon />
                </span>
                <span>Delivered on March 03</span>
              </p>
              <p className="text-sm">Your Item has been delivered</p>
            </div>
          )}
          {false && (
            <p>
              <span>Expected Delivery on Mar 03</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
