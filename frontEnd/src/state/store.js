import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
