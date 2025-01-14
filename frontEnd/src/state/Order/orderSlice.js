import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/apiConfig";

// Fetch order details by orderId
export const getOrder = createAsyncThunk(
  "/order/getOrder",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details."
      );
    }
  }
);

// Create a new order
export const createOrder = createAsyncThunk(
  "/order/createOrder",
  async ({ address, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/orders", address);
      if (response.data._id) {
        navigate({ search: `step=3&orderId=${response.data._id}` });
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order."
      );
    }
  }
);

// Initial state for the order slice
const initialState = {
  order: null,
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetching order details
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload._id;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle creating an order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.order); // Add new order to the orders list
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
