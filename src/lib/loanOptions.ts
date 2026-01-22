// src/lib/loanOptions.ts

export const LOAN_CATEGORIES = {
  pf: 'Pessoa Física',
  pj: 'Pessoa Jurídica',
};

export const LOAN_OPTIONS = {
  pf: [
    { id: 'pessoal', name: 'Empréstimo Pessoal', rate: 2.5 },
    { id: 'home_equity', name: 'Home Equity (garantia de imóvel)', rate: 1.1 },
    { id: 'car_equity', name: 'Car Equity (garantia de veículo)', rate: 1.5 },
    { id: 'financiamento_veiculo', name: 'Financiamento de Veículos', rate: 1.3 },
    { id: 'consignado', name: 'Crédito Consignado', rate: 0.9 },
  ],
  pj: [
    { id: 'medplan', name: 'MedPlan (crédito para área da saúde)', rate: 1.8 },
    { id: 'capital_giro', name: 'Capital de Giro', rate: 2.2 },
    { id: 'leasing', name: 'Leasing', rate: 1.9 },
    { id: 'financiamentos_pj', name: 'Financiamentos', rate: 2.0 },
    { id: 'operacoes_estruturadas', name: 'Operações Estruturadas', rate: 2.8 },
    { id: 'adiantamento_recebiveis', name: 'Adiantamento de Recebíveis', rate: 2.5 },
    { id: 'trava_maquininha', name: 'Trava de Maquininha', rate: 2.3 },
  ],
};

// Nota: As taxas (rate) acima são exemplos. Ajuste conforme necessário.