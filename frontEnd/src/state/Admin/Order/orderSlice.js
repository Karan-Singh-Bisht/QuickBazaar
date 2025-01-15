import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/apiConfig";

// Async thunk to get orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/admin/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to confirm an order
export const confirmOrder = createAsyncThunk(
  "orders/confirmOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      console.log(`Order ${orderId}`);
      const response = await axiosInstance.put(
        `/api/v1/admin/orders/${orderId}/confirmed`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to place an order
// export const placeOrder = createAsyncThunk(
//   "orders/placeOrder",
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post("/api/v1/orders", orderData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// Async thunk to mark an order as delivered
export const deliverOrder = createAsyncThunk(
  "orders/deliverOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/admin/orders/${orderId}/deliver`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to cancel an order
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/orders/${orderId}/cancel`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to mark an order as shipped
export const shippedOrder = createAsyncThunk(
  "orders/shippedOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/admin/orders/${orderId}/shipped`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to delete an order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/admin/orders/${orderId}/delete`
      );
      return orderId; // Return the deleted order's ID for local state update
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderState(state) {
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Expecting an array of orders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Confirm order
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload; // Update the confirmed order
        }
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   // Place order
      //   .addCase(placeOrder.pending, (state) => {
      //     state.loading = true;
      //     state.error = null;
      //   })
      //   .addCase(placeOrder.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.orders.push(action.payload); // Add the new order
      //   })
      //   .addCase(placeOrder.rejected, (state, action) => {
      //     state.loading = false;
      //     state.error = action.payload;
      //   })
      // Deliver order
      .addCase(deliverOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload; // Update the delivered order
        }
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload; // Update the canceled order
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(shippedOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shippedOrder.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );

        if (index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            orderStatus: "SHIPPED", // Ensure Shipped is defined
          };
        }

        state.error = null;
      })
      .addCase(shippedOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
