// src/types/index.ts

// Perfil enviado para a API
export interface ProfilePayload {
  data_nascimento?: string;
  genero?: string;
  escolaridade?: string;
  estado_civil?: string;
  nome_mae?: string;
  tipo_documento?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  possui_restricao?: boolean;
  possui_veiculo?: boolean;
  possui_imovel?: boolean;
  banco?: string;
  agencia?: string;
  conta?: string;
  digito?: string;
  profissao?: string;
  data_admissao?: string;
  renda_mensal?: number;
}

// Resposta da API após criar um perfil
export interface ProfileResponse extends ProfilePayload {
  id: number;
  user_id: number;
}

// Simulação enviada para a API
export interface SimulationRequest {
  valor: number;
  parcelas: number;
  tipo_emprestimo: string;
  finalidade: string;
  valor_parcela: number;
  valor_total: number;
  juros_total: number;
}

// Resposta da API após criar uma simulação
export interface SimulationResponse extends SimulationRequest {
  id: number;
  user_id: number;
  criado_em: string;
}