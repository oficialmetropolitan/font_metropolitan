import { Control, FieldValues } from 'react-hook-form';

export type SpecificQuestionsProps = {
  control: Control<FieldValues> | any;
};

export type StepSectionProps = {
  step: number;
  title: string;
  children: React.ReactNode;
};

export interface SimulacaoFormData {
  valor_desejado: number;
  prazo_meses: string;
  especificacao_motivo?: string;
  motivo_emprestimo: string;
  full_name: string;
  email: string;
  phone: string;
  data_nascimento: string;
  cidade: string;
  estado: string;
  possui_garantia?: string;
  valor_imovel?: number;
  imovel_cep?: string;
  imovel_numero?: string;
  imovel_tipo?: string;
  imovel_esta_pagando?: string;
  imovel_matricula?: string;
  imovel_proprietario?: string;
  veiculo_marca?: string;
  veiculo_modelo?: string;
  veiculo_ano?: string;
  veiculo_valor_fipe?: number;
  veiculo_proprietario?: string;
  veiculo_placa?: string;
  descricao_outra_garantia?: string;
  fin_veiculo_modelo?: string;
  fin_veiculo_ano?: string;
  fin_preferencia_garantia?: string;
  consignado_empresa?: string;
  consignado_salario_bruto?: number;
  consignado_regime_clt?: boolean;
  faturamento_maquininha?: number;
  operadora_maquininha?: string;
  cnpj?: string;
  faturamento_cartao_mensal?: number;
  adquirente_principal?: string;
  cnpj_empresa_trava?: string;
  faturamento_mensal_da_empresa?: number;
}

export interface SimulacaoResultado {
  valor_parcela: number;
  valor_total: number;
  juros_total: number;
}

export type BigCurrencyFieldProps = {
  control: Control<SimulacaoFormData> | any; 
  name: keyof SimulacaoFormData;
  label: string;
  helperText?: string;
};
