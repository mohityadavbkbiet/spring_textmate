// src/utils/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = (username, password) =>
  api.post("/api/login", { username, password });

export const signupUser = (username, password) =>
  api.post("/api/signup", { username, password });

export const performTextOperationApi = (endpoint, text) =>
  api.post(`/\${endpoint}`, { text });

export default api;
