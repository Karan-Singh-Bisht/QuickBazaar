import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/signin`,
        credentials
      );
      localStorage.setItem("token", response.data.token); // Store token
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed.");
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/signup`,
        userData
      );
      localStorage.setItem("token", response.data.token); // Store token
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed."
      );
    }
  }
);

// Async thunk to get user details
export const getUser = createAsyncThunk(
  "/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.get(`${API_BASE_URL}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in headers
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user."
      );
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "/logoutUser",
  async (_, { dispatch }) => {
    localStorage.clear();
    dispatch(resetAuth()); // Reset state
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get user cases
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update user details in state
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuth } = authSlice.actions; // Export the reset action
export default authSlice.reducer;
