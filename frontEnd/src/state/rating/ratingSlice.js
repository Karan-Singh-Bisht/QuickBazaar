import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/apiConfig";

// Async Thunk for submitting a rating
export const submitRating = createAsyncThunk(
  "rating/submitRating",
  async ({ productId, rating, review }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.post(`/api/v1/ratings/createRating`, {
        productId,
        rating,
        review,
      });

      // Refetch ratings after submission
      dispatch(fetchRatings(productId));

      return true; // Just return success flag
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

// Async Thunk for deleting a rating
export const deleteRating = createAsyncThunk(
  "rating/deleteRating",
  async ({ ratingId, productId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/ratings/rating/${ratingId}`
      );

      // Refetch ratings after deletion
      dispatch(fetchRatings(productId));

      return response.data; // Ensure API returns `{ deletedId: ratingId }`
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
  },
  reducers: {
    resetRatings: (state) => {
      state.ratings = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRating.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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
          (rating) => rating.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRatings } = ratingSlice.actions;
export default ratingSlice.reducer;
