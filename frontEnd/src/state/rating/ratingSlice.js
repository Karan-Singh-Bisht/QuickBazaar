import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../config/apiConfig";

// Async Thunk for submitting a rating
export const submitRating = createAsyncThunk(
  "rating/submitRating",
  async ({ productId, rating, review }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/ratings/createRating`,
        {
          productId,
          rating,
          review,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async Thunk for fetching ratings
export const fetchRatings = createAsyncThunk(
  "rating/fetchRatings",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/ratings/product/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const deleteRating = createAsyncThunk(
  "rating/deleteRating",
  async (ratingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/ratings/rating/${ratingId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Rating Slice
const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    ratings: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetRatings: (state) => {
      state.ratings = [];
      state.success = false;
      state.error = null;
      state.loading = false;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle submitRating
      .addCase(submitRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.ratings.push(action.payload);
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchRatings
      .addCase(fetchRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = state.ratings.filter(
          (rating) => rating._id !== action.payload
        );
        state.success = true;
        state.error = null;
      })
      .addCase(deleteRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess, resetRatings } = ratingSlice.actions;
export default ratingSlice.reducer;
