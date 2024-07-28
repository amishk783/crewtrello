"use client"
import axios from "axios";

const baseURL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
const api = axiosInstance;
export default api;
