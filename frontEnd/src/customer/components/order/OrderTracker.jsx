import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

const OrderTracker = ({ activeStep }) => {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep - 1} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: "#9155FD", fontSize: "44px" }}>
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
