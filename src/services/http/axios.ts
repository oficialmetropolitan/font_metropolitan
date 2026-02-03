// services/http/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://gkw48gcsck08ggo0o8cw0cow.31.97.175.190.sslip.io", // endereço da API FastAPI
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default api;
