// services/http/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.bancometropolitan.com.br",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const session2fa = localStorage.getItem("session_2fa_token");
  if (session2fa) {
    config.headers["X-2FA-Session-Token"] = session2fa;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
