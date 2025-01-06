import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice.js";
import productReducer from "./Product/productSlice.js";
import cartReducer from "./Cart/cartSlice.js";
import orderReducer from "./Order/orderSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
