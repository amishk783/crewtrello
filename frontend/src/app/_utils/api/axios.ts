"use client";
import axios from "axios";
import { refreshToken } from "../refreshToken";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL,

  headers: {
    "Content-type": "application/json",
  },
});
const api = axiosInstance;
export default api;

// api.interceptors.response.use(
//   (respone) => respone,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         await refreshToken();
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         const { logOut } = useAuth();
//         logOut();
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
