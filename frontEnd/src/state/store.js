import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice.js";
import productReducer from "./Product/productSlice.js";
import cartReducer from "./Cart/cartSlice.js";
import orderReducer from "./Order/orderSlice.js";
import paymentReducer from "./Payment/paymentSlice.js";
import adminOrderReducer from "./Admin/Order/orderSlice.js";
import ratingReducer from "./rating/ratingSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    payment: paymentReducer,
    adminOrder: adminOrderReducer,
    rating: ratingReducer,
  },
});
