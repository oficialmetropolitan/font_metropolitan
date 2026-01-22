import api from "../http/axios";

// Esta é a interface para os DADOS que ENVIAMOS para a API
export interface Profile {
  nome_mae: string;
  data_nascimento: string;
  genero: string;
  estado_civil: string;
  escolaridade: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  profissao: string;
  renda_mensal: number;
  possui_restricao: boolean;
  possui_veiculo: boolean;
  possui_imovel: boolean;
  banco: string;
  // Adicione aqui outros campos que o teu formulário envia, se necessário
}

// Esta é a interface para a RESPOSTA COMPLETA que RECEBEMOS da API
export interface ProfileResponse extends Profile {
  id: number;       // O ID do próprio perfil
  user_id: number;  // O ID do utilizador ao qual o perfil pertence
  // Adicione aqui outros campos que a API devolve, como 'nome', 'email', 'cpf'
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
}

export async function createProfile(data: Profile): Promise<ProfileResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilizador não autenticado");

  const response = await api.post<ProfileResponse>("/api/perfil", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getProfile(): Promise<ProfileResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilizador não autenticado");

  // A tua rota do backend é /api/perfis/me
  const response = await api.get<ProfileResponse>("/api/perfil/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

