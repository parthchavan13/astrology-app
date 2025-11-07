// src/services/api.js
import axios from "axios";

// ✅ Create a single axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// ✅ Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Auth endpoints
export const registerUser = (payload) => API.post("/auth/register", payload);
export const loginUser = (payload) => API.post("/auth/login", payload);

// ✅ Astrologer endpoints (for Pandits and profile pages)
export const getAstrologers = () => API.get("/astrologers");
export const getAstrologerById = (id) => API.get(`/astrologers/${id}`);

export default API;
