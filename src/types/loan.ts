export interface Profile {
  // Dados pessoais
  data_nascimento?: string;
  genero?: string;
  escolaridade?: string;
  estado_civil?: string;
  nome_mae?: string;
  tipo_documento?: string;
  // Endereço
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  // Dados financeiros
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

export interface ProfileResponse extends Profile {
  id: number;
  user_id: number;
}

export interface SimulationRequest {
  valor: number;
  parcelas: number;
  tipo_emprestimo: string;
  finalidade: string;
  valor_parcela: number;
  valor_total: number;
  juros_total: number;
}

export interface SimulationResponse {
  id: number;
  user_id: number;
  valor: number;
  parcelas: number;
  tipo_emprestimo: string;
  finalidade: string;
  valor_parcela: number;
  valor_total: number;
  juros_total: number;
  criado_em: string;
}

// ... (mantenha as outras interfaces e constantes que você já tinha)

export interface LoanType {
  id: string;
  label: string;
  category: 'pf' | 'pj';
 
  
  description: string;
  maxTerm?: number;
  maxAmount?: number;
}

export interface BaseFormData {
  amount: number;
  installments: number;
  loanType: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: string;
  education: string;
  maritalStatus: string;
  documentType: string;
  motherName: string;
  cep: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  isNegative: boolean;
  hasVehicle: boolean;
  hasProperty: boolean;
  bankAccount: string;
  bankData: {
    agency: string;
    account: string;
    digit: string;
  };
  occupation: string;
  admissionDate?: string;
  monthlyIncome: number;
  loanPurpose: string;
}

export interface LoanSpecificData {
  // Home Equity
  hasProperty?: boolean;
  propertyValue?: number;
  hasDownPayment?: boolean;
  propertyType?: string;

  // Car Equity
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  vehicleFipeValue?: number;
  vehiclePlate?: string;

  // Vehicle Financing
  desiredVehicle?: string;
  guaranteeType?: string;

  // Consigned Credit
  isCLT?: boolean;
  grossSalary?: number;
  company?: string;

  // Business loans
  monthlyRevenue?: number;
  businessPurpose?: string;
  leasingType?: string;
  financingGoal?: string;
  projectSize?: number;
  receivablesVolume?: number;
  businessActivity?: string;
  businessTime?: string;
}

export const LOAN_TYPES: LoanType[] = [
  // Pessoa Física
  {
    id: 'personal-loan',
    label: 'Empréstimo Pessoal',
    category: 'pf',
    description: 'Empréstimos pessoais com taxas a partir da análise pessoal e prazos de até 36 meses.',
    maxTerm: 36,
  },
  {
    id: 'home-equity',
    label: 'Home Equity',
    category: 'pf',
    description: 'Crédito com garantia de imóvel - até 80% do valor do imóvel, com prazos de até 20 anos.',
    maxTerm: 240,
  },
  {
    id: 'car-equity',
    label: 'Car Equity',
    category: 'pf',
    description: 'Empréstimo com garantia de veículo - 50% a 70% do valor do veículo.',
    maxTerm: 60,
  },
  {
    id: 'vehicle-financing',
    label: 'Financiamento de Veículos',
    category: 'pf',
    description: 'Financiamos veículos novos ou usados com até 90% do valor, em até 60 meses.',
    maxTerm: 60,
  },
  {
    id: 'consigned-credit',
    label: 'Crédito Consignado',
    category: 'pf',
    description: 'Crédito consignado com taxas reduzidas, descontadas direto da folha.',
    maxTerm: 96,
  },
  // Pessoa Jurídica
  {
    id: 'medplan',
    label: 'MedPlan',
    category: 'pj',
    description: 'Linha especial para médicos, clínicas e hospitais, com parcelas e prazos flexíveis.',
  },
  {
    id: 'working-capital',
    label: 'Capital de Giro',
    category: 'pj',
    description: 'Capital de giro para manter sua empresa saudável, com liberação rápida.',
  },
  {
    id: 'leasing',
    label: 'Leasing',
    category: 'pj',
    description: 'Leasing permite adquirir bens como máquinas ou veículos sem comprometer o caixa.',
  },
  {
    id: 'financing',
    label: 'Financiamentos',
    category: 'pj',
    description: 'Financiamos projetos ou bens específicos com prazos de até 10 anos.',
    maxTerm: 120,
  },
  {
    id: 'structured-operations',
    label: 'Operações Estruturadas',
    category: 'pj',
    description: 'Operações personalizadas para grandes projetos, combinando crédito e garantias.',
  },
  {
    id: 'receivables-advance',
    label: 'Adiantamento de Recebíveis',
    category: 'pj',
    description: 'Adiantamos seus recebíveis com taxas competitivas, liberando caixa imediato.',
  },
  {
    id: 'card-receivables',
    label: 'Trava de Maquininha',
    category: 'pj',
    description: 'Garantia de recebíveis de cartão para empréstimos empresariais.',
  },
];

export const LOAN_PURPOSES = [
  'Pagar dívidas',
  'Comprar imóvel',
  'Compras em geral',
  'Pagar cartão de crédito',
  'Comprar veículo',
  'Investir no meu negócio',
  'Outros',
];

export const EDUCATION_LEVELS = [
  'Superior completo',
  'Ensino médio',
  'Analfabeto',
  'Superior incompleto',
  'Fundamental',
];

export const MARITAL_STATUS = [
  'Solteiro',
  'Divorciado',
  'Casado',
  'Viúvo',
  'Outro',
];

export const DOCUMENT_TYPES = [
  'RG',
  'CNH',
  'Estrangeiro',
  'Ordem de classe (OAB, CREA, CRM, etc)',
];

export const OCCUPATIONS = [
  'Assalariado',
  'Funcionário público',
  'Aposentado ou pensionista',
  'Autônomo',
  'Profissional liberal',
  'Empresário',
  'Estudante',
  'Outro',
];

export const BANKS = [
  'Banco do Brasil',
  'Bradesco',
  'Caixa Econômica Federal',
  'Itaú',
  'Santander',
  'Nubank',
  'Outro',
  'Não possuo conta em banco',
];

export const PROPERTY_TYPES = [
  'Casa',
  'Apartamento',
  'Comercial',
  'Terreno',
  'Outros',
];