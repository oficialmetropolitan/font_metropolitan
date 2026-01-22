// services/api/user.ts
import api from "../http/axios";

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const formData = new URLSearchParams();
  formData.append("username", email); // FastAPI espera username como email
  formData.append("password", password);

  const response = await api.post<LoginResponse>("/api/auth/token", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  // Salva o token no localStorage para usar depois
  localStorage.setItem("token", response.data.access_token);

  return response.data;
}

export async function register(user: {
  full_name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
}) {
  const response = await api.post("/api/auth/clientes", user);
  return response.data;
}

export async function getMe() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado");

  const response = await api.get("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
