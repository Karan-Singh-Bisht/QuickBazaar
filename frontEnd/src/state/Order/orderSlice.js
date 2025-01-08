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

// Update an order (e.g., change order status)
// export const updateOrder = createAsyncThunk(
//   "/order/updateOrder",
//   async ({ orderId, orderData }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(
//         `/api/v1/orders/${orderId}`,
//         orderData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update order."
//       );
//     }
//   }
// );

// Cancel an order
// export const cancelOrder = createAsyncThunk(
//   "/order/cancelOrder",
//   async (orderId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.delete(
//         `/api/v1/orders/${orderId}/cancel`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to cancel order."
//       );
//     }
//   }
// );

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

    // Handle updating an order
    // .addCase(updateOrder.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updateOrder.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const index = state.orders.findIndex(
    //     (order) => order.id === action.payload.order.id
    //   );
    //   if (index !== -1) {
    //     state.orders[index] = action.payload.order; // Update the existing order in the list
    //   }
    // })
    // .addCase(updateOrder.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })

    // // Handle canceling an order
    // .addCase(cancelOrder.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(cancelOrder.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.orders = state.orders.filter(
    //     (order) => order.id !== action.payload.order.id
    //   ); // Remove the canceled order from the list
    // })
    // .addCase(cancelOrder.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export default orderSlice.reducer;
