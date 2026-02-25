import axios from "axios";

const API = axios.create({
  // baseURL: "https://job-sphere-backend-6zgd.onrender.com/api",
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;