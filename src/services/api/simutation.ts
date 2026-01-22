import api from "../http/axios";
import { Profile, ProfileResponse, SimulationRequest, SimulationResponse } from "@/types/loan";

// Serviços de perfil
export async function createProfile(data: Profile): Promise<ProfileResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado");

  const response = await api.post<ProfileResponse>("/api/perfil", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getProfile(): Promise<ProfileResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado");

  const response = await api.get<ProfileResponse>("/api/perfil/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function updateProfile(data: Profile): Promise<ProfileResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado");

  const response = await api.put<ProfileResponse>("/api/perfil/me", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// Serviços de simulação
export async function createSimulation(
  data: SimulationRequest
): Promise<SimulationResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado");

  const response = await api.post<SimulationResponse>("/api/simulacoes", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function getSimulations(): Promise<SimulationResponse[]> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado");

  const response = await api.get<SimulationResponse[]>("/api/simulacoes", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}