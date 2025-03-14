import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../state/Order/orderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Zod Schema for validation
const addressSchema = z.object({
  firstName: z.string().min(2, { message: "First Name is required" }),
  lastName: z.string().min(2, { message: "Last Name is required" }),
  streetAddress: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string(),
  mobile: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
});

const DeliveryAddForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data?.get("firstName"),
      lastName: data?.get("lastName"),
      streetAddress: data?.get("streetAddress"),
      city: data?.get("city"),
      state: data?.get("state"),
      zipCode: data?.get("zip"),
      mobile: data?.get("phoneNumber"),
    };

    // Validate data using Zod
    try {
      addressSchema.parse(address);
      setErrors({});
      toast.success("Successfull!");
      dispatch(createOrder({ address: address, navigate }));
    } catch (err) {
      const formattedErrors = err.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(formattedErrors); // Set errors
    }
  };

  return (
    <div>
      <Grid container spacing={4}>
        {/* <Grid
          item
          xs={12}
          lg={5}
          className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll"
        > */}
        {/* <div className="p-5 py-7 border-b cursor-pointer">
            {auth && <AddressCard orderDetails={auth.user?.user} />}
            <Button
              sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
              size="large"
              variant="contained"
            >
              Deliver Here
            </Button>
          </div> */}
        {/* </Grid> */}
        <Grid item xs={12} lg={12}>
          <Box className="border rounded-s-md p-5 shadow-md">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Address"
                    fullWidth
                    autoComplete="street-address"
                    multiline
                    rows={4}
                    error={!!errors.streetAddress}
                    helperText={errors.streetAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="address-level2"
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="address-level1"
                    error={!!errors.state}
                    helperText={errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal Code"
                    fullWidth
                    autoComplete="postal-code"
                    error={!!errors.zipCode}
                    helperText={errors.zipCode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    type="tel"
                    autoComplete="tel"
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{ bgcolor: "RGB(145 85 253)", color: "white" }}
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddForm;
