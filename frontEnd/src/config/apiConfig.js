import axios from "axios";
// export const API_BASE_URL = "https://quickbazaar-acyq.onrender.com";
export const API_BASE_URL = "http://localhost:3000";

const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

//const -> {}
//default mai u dont need {} to import
