import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/apiConfig";

// Async thunk to fetch products with filters
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/product", {
        params: filters,
      });
      return response.data; // { content, currentPage, totalPages }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const findProductById = createAsyncThunk(
  "products/findById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/product/id/${productId}`
      ); // Replace with your API endpoint
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data); // Handles errors gracefully
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Fetched products
    product: null,
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearProduct(state) {
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(findProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
