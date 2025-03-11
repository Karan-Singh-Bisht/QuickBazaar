import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, registerUser } from "../../state/Auth/authSlice";
import { Typography } from "@mui/material";
import { toast } from "sonner";
import Loading from "../components/loading/Loading";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("token");
  const auth = useSelector((state) => state.auth);

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (jwtToken) {
      dispatch(getUser());
    }
  }, [jwtToken, auth.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const user = await dispatch(registerUser(userData));
    if (user) {
      toast.success(`Welcome to QuickBazaar ${user.payload.user.firstName}`);
    } else {
      toast.error(`${error}`);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              autoComplete="given-name"
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
            />
          </Grid>
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
          {error && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              className="w-full"
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center">
        <div className="flex py-3 items-center">
          <p>Already have an account?</p>
          <Button
            className="ml-3"
            size="small"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
