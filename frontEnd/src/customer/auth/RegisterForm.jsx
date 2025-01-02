import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(userData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              type="text"
              name="firstName"
              placeholder="FirstName"
              autoComplete="given-name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              id="lastName"
              name="lastName"
              placeholder="LastName"
              autoComplete="given-name"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
              className="w-full"
            >
              Register
            </Button>
          </Grid>
        </Grid>
        <div className="flex justify-center">
          <div className="py-3 flex items-center">
            <p>If you already have account ?</p>
            <Button
              className="ml-5"
              size="small"
              sx={{ color: "#9155FD" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
