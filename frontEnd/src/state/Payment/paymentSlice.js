import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/apiConfig";

// Async Thunks
export const createPayment = createAsyncThunk(
  "payment/createOrder",
  async (orderId, { rejectWithValue }) => {
    console.log(orderId);
    try {
      const response = await axiosInstance.post(`/api/v1/payments/${orderId}`);
      if (response.data.paymentLinkUrl) {
        window.location.href = response.data.paymentLinkUrl;
      }
      return response.data; // Returns order details from backend
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async ({ paymentId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/payments?payment_id=${paymentId}&orderId=${orderId}`
      );
      console.log(response.data);
      return response.data; // Returns success message
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Payment Slice
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    payment: null,
    success: false,
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.payment = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
        state.error = null;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Payment
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { resetPaymentState } = paymentSlice.actions;

// Export reducer
export default paymentSlice.reducer;
