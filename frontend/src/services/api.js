import axios from "axios";

const API = axios.create({
  baseURL: "https://alumniconnect-backend-ig3r.onrender.com/api",
});

// Automatically attach token if it exists
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");

  if (user) {
    const token = JSON.parse(user).token;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
