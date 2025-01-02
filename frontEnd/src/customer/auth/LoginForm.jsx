import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="w-full"
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center">
        <div className="flex py-3 items-center">
          <p>Do not have any account?</p>
          <Button
            className="ml-3"
            size="small"
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
