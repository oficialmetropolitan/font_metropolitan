// src/pages/SimulacaoPage.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useForm, Controller, FieldValues, Control, useWatch } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// FIM NOVOS IMPORTS
import { toast } from "sonner";
import api from "@/services/http/axios";
import { ArrowRight, Loader2, UserPlus } from "lucide-react";
import Header from '@/components/Header';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field'
import { AxiosError } from 'axios';


type SpecificQuestionsProps = {
  control: Control<FieldValues>;
};

type StepSectionProps = {
  step: number;
  title: string;
  children: React.ReactNode;
};

interface SimulacaoFormData {
  valor_desejado: number;
  prazo_meses: string;
  motivo_emprestimo: string;
  full_name: string;
  email: string;
  phone: string;
  data_nascimento: string;
  cidade: string;
  estado: string;
}

interface SimulacaoResultado {
  valor_parcela: number;
  valor_total: number;
  juros_total: number;
}

interface SimulacaoResultado {
  valor_parcela: number;
  valor_total: number;
  juros_total: number;
}
type BigCurrencyFieldProps = {
  control: Control<SimulacaoFormData>; // Mudança aqui para bater com o formulário
  name: keyof SimulacaoFormData;
  label: string;
  helperText?: string;
};

const StepSection = ({ step, title, children }: StepSectionProps) => (
  <section className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
        {step}
      </div>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
    </div>
    <div className="space-y-6 pl-11">{children}</div>
  </section>
);

const BigCurrencyField = ({ control, name, label, helperText }: BigCurrencyFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-2">
        <FormLabel className="text-base font-medium">{label}</FormLabel>
        <FormControl>
          <CurrencyInput
            value={field.value}
            onValueChange={(value) => field.onChange(value ? parseFloat(value) : 0)}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            customInput={Input}
            className="text-4xl font-semibold border-0 border-b border-slate-300 rounded-none focus-visible:ring-0 focus-visible:border-blue-600 px-0"
            placeholder="R$ 0"
          />
        </FormControl>
        {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
        <FormMessage />
      </FormItem>
    )}
  />
);
const HomeEquityQuestions = ({ control }: SpecificQuestionsProps) => (

  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Sobre seu Imóvel</h3>
    <p className="text-sm text-muted-foreground">
      Perguntas sobre o imóvel que será usado como garantia.
    </p>

    <FormField
      control={control}
      name="valor_imovel"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Valor aproximado do Imóvel</FormLabel>
          <FormControl>
            {/* Usamos o CurrencyInput como o controlador */}
            <CurrencyInput
              id="valor_imovel" // Bom para acessibilidade
              name={field.name}
              placeholder="R$ 300.000,00"
              value={field.value}
              onBlur={field.onBlur}
              ref={field.ref}
              decimalsLimit={2}
              // Configura para o formato Brasileiro (Real)
              intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}

              // Aqui está a mágica da integração:
              // 1. Dizemos para ele USAR o seu componente <Input>
              customInput={Input}

              // 2. Usamos onValueChange para atualizar o react-hook-form
              onValueChange={(value, name) => {
                // 'value' aqui é uma string (ex: "300000.00") ou undefined.
                // Convertemos para número antes de salvar no form.
                const numericValue = value ? parseFloat(value) : undefined;
                field.onChange(numericValue);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="imovel_cep"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP do Imóvel</FormLabel>
            <FormControl>
              <InputMask
                mask="99999-999"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                disabled={field.disabled}
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    ref={field.ref}
                    placeholder="00000-000"
                  />
                )}
              </InputMask>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="imovel_numero"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número</FormLabel>
            <FormControl><Input placeholder="123" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <FormField
      control={control}
      name="imovel_tipo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo do Imóvel</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
            <SelectContent>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="terreno">Terreno</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="imovel_esta_pagando"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Está pagando financiamento deste imóvel?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-4"
            >
              <FormItem className="flex items-center space-x-2">
                <FormControl><RadioGroupItem value="sim" /></FormControl>
                <FormLabel className="font-normal">Sim</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl><RadioGroupItem value="nao" /></FormControl>
                <FormLabel className="font-normal">Não</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="imovel_matricula"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Matrícula do Imóvel</FormLabel>
          <FormControl><Input placeholder="Nº da matrícula (opcional)" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="imovel_proprietario"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Imóvel no nome de quem?</FormLabel>
          <FormControl><Input placeholder="Ex: Meu e Cônjuge" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

// --- Car Equity ---
const CarEquityQuestions = ({ control }: SpecificQuestionsProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Sobre seu Veículo</h3>
    <p className="text-sm text-muted-foreground">
      Perguntas sobre o veículo que será usado como garantia.
    </p>

    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="veiculo_marca"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marca</FormLabel>
            <FormControl><Input placeholder="Ex: Toyota" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="veiculo_modelo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Modelo</FormLabel>
            <FormControl><Input placeholder="Ex: Corolla" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="veiculo_ano"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ano</FormLabel>
            <FormControl><Input type="number" placeholder="2020" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="veiculo_valor_fipe"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valor Aprox. (FIPE)</FormLabel>
            <FormControl>
              {/* Usamos o CurrencyInput como o controlador */}
              <CurrencyInput
                id="veiculo_valor_fipe" // Bom para acessibilidade
                name={field.name}
                placeholder="R$ 80.000,00"
                value={field.value}
                onBlur={field.onBlur}
                ref={field.ref}
                decimalsLimit={2}
                // Configura para o formato Brasileiro (Real)
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}

                // Aqui está a mágica da integração:
                // 1. Dizemos para ele USAR o seu componente <Input>
                customInput={Input}

                // 2. Usamos onValueChange para atualizar o react-hook-form
                onValueChange={(value, name) => {
                  // 'value' aqui é uma string (ex: "300000.00") ou undefined.
                  // Convertemos para número antes de salvar no form.
                  const numericValue = value ? parseFloat(value) : undefined;
                  field.onChange(numericValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <FormField
      control={control}
      name="veiculo_proprietario"
      render={({ field }) => (
        <FormItem>
          <FormLabel>O veículo está no nome de quem?</FormLabel>
          <FormControl><Input placeholder="Ex: Meu nome" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="veiculo_placa"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Placa do Veículo</FormLabel>
          <FormControl><Input placeholder="AAA-0A00" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

// --- Financiamento Veicular ---
const FinanciamentoVeicularQuestions = ({ control }: SpecificQuestionsProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Sobre o Veículo Desejado</h3>

    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="fin_veiculo_modelo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Modelo Desejado</FormLabel>
            <FormControl><Input placeholder="Ex: Honda HR-V" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="fin_veiculo_ano"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ano</FormLabel>
            <FormControl><Input type="number" placeholder="2022" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <FormField
      control={control}
      name="fin_preferencia_garantia"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Preferência de Garantia</FormLabel>
          <FormControl><Input placeholder="Ex: O próprio veículo" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

// --- Consignado ---
const CONSIGNADO_EMPRESAS = ["IPD", "Hospital Regional", "Laboratório Frota", "Clínica Fort", "D-Radio", "IPECONT", "Inovacon", "Vitra", "Wizzer", "Outra"];

const ConsignadoQuestions = ({ control }: SpecificQuestionsProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Sobre seu Vínculo</h3>
    <p className="text-sm text-muted-foreground">
      Disponível apenas para empresas parceiras.
    </p>

    <FormField
      control={control}
      name="consignado_empresa"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Empresa / Convênio</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="Selecione sua empresa" /></SelectTrigger></FormControl>
            <SelectContent>
              {CONSIGNADO_EMPRESAS.map(emp => (
                <SelectItem key={emp} value={emp}>{emp}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="consignado_salario_bruto"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Salário Bruto</FormLabel>
          <FormControl><Input type="number" placeholder="R$ 3.500" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="consignado_regime_clt"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>Regime CLT?</FormLabel>
          </div>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </div>
);


const PessoalQuestions = ({ control }: SpecificQuestionsProps) => {
  const possuiGarantia = useWatch({
    control,
    name: "possui_garantia",
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Garantia Disponível</h3>
        <p className="text-sm text-muted-foreground">
          Você possui algum bem para oferecer como garantia e conseguir taxas menores?
        </p>

        <FormField
          control={control}
          name="possui_garantia"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nenhum">Não possuo garantia</SelectItem>
                  <SelectItem value="imovel">Possuo Imóvel</SelectItem>
                  <SelectItem value="veiculo">Possuo Veículo</SelectItem>
                  <SelectItem value="outros">Outros bens</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {possuiGarantia === "imovel" && (
        <div className="p-4 border rounded-lg bg-slate-50 animate-in fade-in slide-in-from-top-2">
          <HomeEquityQuestions control={control} />
        </div>
      )}


      {possuiGarantia === "veiculo" && (
        <div className="p-4 border rounded-lg bg-slate-50 animate-in fade-in slide-in-from-top-2">
          <CarEquityQuestions control={control} />
        </div>
      )}

      {possuiGarantia === "outros" && (
        <div className="p-4 border rounded-lg bg-slate-50 animate-in fade-in slide-in-from-top-2 space-y-4">
          <h4 className="font-medium">Descreva o bem</h4>

          <FormField
            control={control}
            name="descricao_outra_garantia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qual bem você pode oferecer como garantia?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: terreno, máquinas, equipamentos, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

const RecebiveisQuestions = ({ control }: SpecificQuestionsProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold border-b pb-2">Dados das Vendas</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="faturamento_maquininha"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Faturamento médio em Maquininha (mensal)</FormLabel>
            <FormControl>
              <CurrencyInput
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                customInput={Input}
                onValueChange={(val) => field.onChange(val)}
                placeholder="R$ 0,00"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="operadora_maquininha"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qual a sua Maquininha?</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="stone">Stone</SelectItem>
                <SelectItem value="cielo">Cielo</SelectItem>
                <SelectItem value="rede">Rede</SelectItem>
                <SelectItem value="pagseguro">PagSeguro</SelectItem>
                <SelectItem value="getnet">Getnet</SelectItem>
                <SelectItem value="outra">Outra</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={control}
        name="cnpj" // Nome do campo no formulário
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ</FormLabel>
            <FormControl>
              
              <InputMask
                mask="99.999.999/9999-99"
                maskChar={null}
                value={field.value}
                onChange={field.onChange} 
                onBlur={field.onBlur}     
              >
                {(inputProps) => (
                 
                  <Input
                    {...inputProps} // Espalha as props da máscara (value, onChange, etc.)
                    placeholder="00.000.000/0000-00"
                    ref={field.ref} // Importante para o react-hook-form
                  />
                )}
              </InputMask>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);
const TravaMaquininhaQuestions = ({ control }: SpecificQuestionsProps) => (
  <div className="space-y-4">
    <div className="text-center md:text-left space-y-1">
      <h3 className="text-lg font-semibold text-navy-dark">Dados da Maquininha</h3>
      <p className="text-sm text-muted-foreground">
        Precisamos entender seu volume de vendas para calcular seu limite de antecipação.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="faturamento_cartao_mensal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vendas médias no cartão (Mensal)</FormLabel>
            <FormControl>
              <CurrencyInput
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                customInput={Input}
                onValueChange={(val) => field.onChange(val)}
                placeholder="R$ 0,00"
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


      <FormField
        control={control}
        name="adquirente_principal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qual sua operadora principal?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a marca" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="stone">Stone</SelectItem>
                <SelectItem value="cielo">Cielo</SelectItem>
                <SelectItem value="rede">Rede</SelectItem>
                <SelectItem value="pagseguro">PagSeguro / PagBank</SelectItem>
                <SelectItem value="getnet">Getnet</SelectItem>
                <SelectItem value="sumup">SumUp</SelectItem>
                <SelectItem value="outra">Outra / Diversas</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <FormField
      control={control}
      name="cnpj_empresa_trava"
      render={({ field }) => (
        <FormItem>
          <FormLabel>CNPJ vinculado à maquininha</FormLabel>
          <FormControl>
            <InputMask
              mask="99.999.999/9999-99"
              value={field.value}
              onChange={field.onChange}
            >
              {(inputProps) => (
                // Aqui usamos o componente <Input> do shadcn
                <Input
                  {...inputProps} // Espalha as props da máscara (value, onChange, etc.)
                  placeholder="80.0000"
                  ref={field.ref} // Importante para o react-hook-form
                />
              )}
            </InputMask>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
const CapitalGiroQuestions = ({ control }: SpecificQuestionsProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Sobre sua empresa</h3>

    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="cnpj" // Nome do campo no formulário
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ</FormLabel>
            <FormControl>
              {/* Nota: A integração do react-input-mask é um pouco 
                diferente do react-currency-input. 
                Ele usa o padrão "children as a function" 
                para passar as props para o seu componente <Input> 
              */}
              <InputMask
                mask="99.999.999/9999-99"
                maskChar={null} // Não mostra os underscores '_'
                value={field.value}
                onChange={field.onChange} // Passa o evento de mudança
                onBlur={field.onBlur}     // Passa o evento de blur
              >
                {(inputProps) => (
                  // Aqui usamos o componente <Input> do shadcn
                  <Input
                    {...inputProps} // Espalha as props da máscara (value, onChange, etc.)
                    placeholder="00.000.000/0000-00"
                    ref={field.ref} // Importante para o react-hook-form
                  />
                )}
              </InputMask>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="faturamento_mensal_da_empresa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Faturamento mensal da empresa </FormLabel>
            <FormControl>
              {/* Usamos o CurrencyInput como o controlador */}
              <CurrencyInput
                id="faturamento_mensal_da_empresa" // Bom para acessibilidade
                name={field.name}
                placeholder="R$ 80.000,00"
                value={field.value}
                onBlur={field.onBlur}
                ref={field.ref}
                decimalsLimit={2}
                // Configura para o formato Brasileiro (Real)
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}

                // Aqui está a mágica da integração:
                // 1. Dizemos para ele USAR o seu componente <Input>
                customInput={Input}

                // 2. Usamos onValueChange para atualizar o react-hook-form
                onValueChange={(value, name) => {
                  // 'value' aqui é uma string (ex: "300000.00") ou undefined.
                  // Convertemos para número antes de salvar no form.
                  const numericValue = value ? parseFloat(value) : undefined;
                  field.onChange(numericValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);


const renderSpecificQuestions = (tipo: string, control: Control<FieldValues>) => {
  switch (tipo) {
    case 'imovel-garantia':
      return <HomeEquityQuestions control={control} />;
    case 'veiculo-garantia':
      return <CarEquityQuestions control={control} />;
    case 'credito-consignado':
      return <ConsignadoQuestions control={control} />;
    case 'emprestimo-pessoal':
      // Agora o PessoalQuestions gerencia sua própria condicional
      return <PessoalQuestions control={control} />;
    case 'adiantamento-recebiveis':
      return <RecebiveisQuestions control={control} />;
    case 'trava-maquininha':
      return <TravaMaquininhaQuestions control={control} />;

    case 'capital-de-giro':
      return <CapitalGiroQuestions control={control} />;

    default:
      return <p className="text-muted-foreground">Preencha os dados acima para continuar.</p>;
  }
};

const SimulacaoPage = () => {
  


  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Tipagem explícita para o resultado
  const [resultado, setResultado] = useState<SimulacaoResultado | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const tipoEmprestimo = location.state?.tipo;

  // Inicialização com defaultValues evita que o input comece como undefined
  const form = useForm<SimulacaoFormData>({
    
    defaultValues: {
      valor_desejado: 0,
      prazo_meses: "",
      motivo_emprestimo: "",
      full_name: "",
      email: "",
      phone: "",
      data_nascimento: "",
      cidade: "",
      estado: "",
      
    }
  });
const motivoSelecionado = useWatch({
  control: form.control,
  name: "motivo_emprestimo",
});
  if (!tipoEmprestimo) {
    toast.error("Selecione um produto para simular.");
    return <Navigate to="/" replace />;
  }

  // 1. AÇÃO: CALCULAR
  const handleCalcular = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/simulacoes/calcular-imediato", {
        valor_desejado: Number(data.valor_desejado),
        prazo_meses: parseInt(data.prazo_meses),
        tipo_emprestimo: tipoEmprestimo
      });
      setResultado(response.data);
      setShowLeadForm(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast.error("Erro ao calcular os valores.");
    } finally {
      setIsLoading(false);
    }
  };

const handleFinalizarLead = async (data: SimulacaoFormData, destino: 'whatsapp' | 'login') => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        valor_desejado: Number(data.valor_desejado),
        prazo_meses: Number(data.prazo_meses),
        tipo_emprestimo: location.state?.tipo,
        dados_entrada: data,
        resultado_simulacao: resultado // Dados calculados anteriormente
      };

      // SALVAMENTO NO BANCO (Como Lead)
      await api.post("/api/simulacoes/salvar-lead", payload);
      toast.success("Dados registrados na Metropolitan!");

      if (destino === 'whatsapp') {
        const msg = `Olá! Fiz uma simulação de R$${resultado?.valor_total}.`;
        window.open(`https://wa.me/5535999999999?text=${encodeURIComponent(msg)}`, '_blank');
      } else {
        // Envia para o login para que o vínculo (User + Lead) ocorra
        navigate('/login', { state: { email: data.email, nome: data.full_name } });
      }
    } catch (error) {
      console.error("Erro no salvamento:", (error as AxiosError).response?.data);
      toast.error("Erro ao salvar dados.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto py-12 px-4">
        {resultado && (
          <Card className="mb-8 border-2 border-green-500 bg-green-50 animate-in zoom-in-95">
            <CardContent className="pt-6 text-center">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-green-700 font-medium">Parcela Estimada</p>
                  <p className="text-3xl font-bold text-green-900">R$ {resultado.valor_parcela}</p>
                </div>
                <div>
                  <p className="text-sm text-green-700 font-medium">Total com Juros</p>
                  <p className="text-xl font-semibold text-green-800">R$ {resultado.valor_total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Simulação Metropolitan</CardTitle>
            <CardDescription>Configurando simulação para {tipoEmprestimo}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => showLeadForm ? handleFinalizarLead(data, 'whatsapp') : handleCalcular(data))} className="space-y-8">
                
                {!showLeadForm ? (
                  <>
                    {/* PASSO 1: DADOS FINANCEIROS */}
                    <StepSection step={1} title="Dados do Empréstimo">
                      <BigCurrencyField control={form.control} name="valor_desejado" label="Quanto você precisa?" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="prazo_meses" render={({ field }) => (
                          <FormItem><FormLabel>Prazo (meses)</FormLabel><Input type="number" {...field} /></FormItem>
                        )} />
                        <FormField control={form.control} name="motivo_emprestimo" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Motivo do crédito</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="quitar_dividas">Quitar Dívidas</SelectItem>
                                <SelectItem value="investimento">Investimento</SelectItem>
                                <SelectItem value="reforma">Reforma</SelectItem>
                                <SelectItem value="compra_bem">Compra de Bem</SelectItem>
                                <SelectItem value="viagem">Viagem</SelectItem>
                                <SelectItem value="outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )} />
                        {motivoSelecionado === "outro" && (
                            <FormField control={form.control} name="motivo_emprestimo" render={({ field }) => (
                              <FormItem className="animate-in fade-in slide-in-from-top-2">
                                <FormLabel>Especifique o motivo</FormLabel>
                                <FormControl>
                                  <Input placeholder="Descreva aqui..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
  )}
                      </div>
                    </StepSection>

                   
                    <StepSection step={2} title="Detalhes Adicionais">
                      {renderSpecificQuestions(tipoEmprestimo, form.control as any)}
                    </StepSection>
                  </>
                ) : (
                  /* PASSO 3: FORMULÁRIO DE LEAD */
                  <StepSection step={3} title="Onde enviamos o resultado?">
                    <div className="space-y-4">
                      <FormField control={form.control} name="full_name" render={({ field }) => (
                        <FormItem><FormLabel>Nome Completo</FormLabel><Input placeholder="Seu nome" {...field} /></FormItem>
                      )} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>E-mail</FormLabel><Input type="email" {...field} /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp</FormLabel>
                            <FormControl>
                              <InputMask mask="(99) 99999-9999" value={field.value} onChange={field.onChange}>
                                {(inputProps: any) => <Input {...inputProps} type="tel" placeholder="(00) 00000-0000" />}
                              </InputMask>
                            </FormControl>
                          </FormItem>
                        )} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="data_nascimento" render={({ field }) => (
                          <FormItem><FormLabel>Data de Nascimento</FormLabel><Input type="date" {...field} /></FormItem>
                        )} />
                        <FormField control={form.control} name="cidade" render={({ field }) => (
                          <FormItem><FormLabel>Cidade</FormLabel><Input {...field} /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="estado" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado (UF)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger></FormControl>
                            <SelectContent>
                              {[ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
                                'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
                                'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                    </div>
                  </StepSection>
                )}

                <div className="flex flex-col gap-3 pt-4">
                  <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : (showLeadForm ? 'Finalizar e WhatsApp' : 'Calcular e Ver Resultado')}
                  </Button>
                  {showLeadForm && (
                    <Button variant="outline" type="button" onClick={form.handleSubmit((data) => handleFinalizarLead(data, 'login'))} className="w-full">
                      <UserPlus className="mr-2 h-4 w-4" /> Continuar no site (Fazer Login)
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SimulacaoPage;