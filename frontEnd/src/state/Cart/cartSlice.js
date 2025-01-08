import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/apiConfig";

// Async thunk to get the cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/cart`);
      return response.data; // Return the cart metadata and items
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get cart."
      );
    }
  }
);

// Async thunk to add an item to the cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/v1/cart/add`, item);
      return response.data; // Return the updated cart data
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Async thunk to remove an item from the cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/cartItems/${itemId}`
      );
      return response.data; // Return updated cart data after item removal
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Async thunk to update an item in the cart
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/v1/cartItems/${itemId}`, {
        quantity,
      });
      return response.data; // Return the updated cart data
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Initial state with cart and cartItems, along with loading and error handling
const initialState = {
  cart: null, // Cart metadata (e.g., cart ID, user details, etc.)
  cartItems: [], // Items in the cart
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to reset the cart state (useful for clearing the cart after a purchase, etc.)
    resetCart: (state) => {
      state.cart = null;
      state.cartItems = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle getting the cart
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.cartItems = action.payload.cartItems; // Store cart items
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle adding item to the cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload.item;

        // Check if item is valid
        if (!item || !item._id) {
          return; // Exit early if the item is invalid
        }

        // Add new item or update if it already exists
        const existingItemIndex = state.cartItems.findIndex(
          (cartItem) => cartItem._id === item._id
        );

        if (existingItemIndex >= 0) {
          // Update the existing item in the cart
          state.cartItems[existingItemIndex] = item;
        } else {
          // Add the new item to the cart
          state.cartItems.push(item);
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle removing item from the cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle updating cart item quantity
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.item.id
        );
        if (itemIndex >= 0) {
          state.cartItems[itemIndex] = action.payload.item;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
