import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(userData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center">
        <div className="py-3 flex items-center">
          <p>Does not have an account?</p>
          <Button
            className="ml-5"
            size="small"
            sx={{ color: "#9155FD" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
