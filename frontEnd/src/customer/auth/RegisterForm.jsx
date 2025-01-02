import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, registerUser } from "../../state/Auth/authSlice";

const RegisterForm = () => {
  const dispatch = useDispatch(); //dispatch a function
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const resultAction = await dispatch(registerUser(userData));

      if (registerUser.rejected.match(resultAction)) {
        console.log("Error during registration:", resultAction.payload);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err);
    }
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
          {error && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Loading..." : "Register"}
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
