"use client";
import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL,

  headers: {
    "Content-type": "application/json",
  },
});
const api = axiosInstance;
export default api;

