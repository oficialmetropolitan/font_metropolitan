// src/pages/SimulacaoPage.tsx
import React, { useMemo, useState } from 'react';
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
import { ArrowRight, Landmark, Loader2, RefreshCcw, UserPlus } from "lucide-react";
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
  <section className="space-y-8 animate-in fade-in duration-700">
    <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
      <div className="h-10 w-10 rounded-2xl bg-navy-dark text-white flex items-center justify-center font-bold shadow-lg shadow-navy-dark/20">
        {step}
      </div>
      <h2 className="text-2xl font-extrabold text-navy-dark tracking-tight">{title}</h2>
    </div>
    <div className="grid gap-6">{children}</div>
  </section>
);

const BigCurrencyField = ({ control, name, label }: BigCurrencyFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-4">
        <FormLabel className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">{label}</FormLabel>
        <FormControl>
          <div className="relative group">
            <CurrencyInput

              value={typeof field.value === 'number' || typeof field.value === 'string' ? field.value : ""}
              onValueChange={(value) => field.onChange(value ? parseFloat(value) : 0)}
              intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
              customInput={Input}
              className="text-5xl md:text-5xl font-black border-0 border-b-2 border-gray-400 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 py-8 bg-transparent transition-all placeholder:text-gray-600"
              placeholder="R$ 0"
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
const HomeEquityQuestions = ({ control }: SpecificQuestionsProps) => (

  <div className="space-y-6 bg-gray-50/50 p-6 rounded-[32px] border border-gray-100">
    <div className="flex items-center gap-2 mb-2">
      <Landmark className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-bold text-navy-dark uppercase tracking-tighter">Sobre seu Imóvel</h3>
      <p className="text-sm text-muted-foreground">
        Perguntas sobre o imóvel que será usado como garantia.
      </p>
    </div>

    <FormField
      control={control}
      name="valor_imovel"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Valor aproximado do Imóvel</FormLabel>
          <FormControl>
           
            <CurrencyInput
              id="valor_imovel"
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
              className="h-12 rounded-2xl border-gray-400 bg-white"

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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">CEP do Imóvel</FormLabel>
            <FormControl className=" rounded-2xl border-gray-400 bg-white">
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Número</FormLabel>
            <FormControl><Input className=" rounded-2xl border-gray-400 bg-white" placeholder="123" {...field} /></FormControl>
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
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tipo do Imóvel</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className=" rounded-2xl border-gray-400 bg-white" ><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
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
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Está pagando financiamento deste imóvel?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-4"
            >
              <FormItem className="flex items-center space-x-2">
                <FormControl><RadioGroupItem value="sim" /></FormControl>
                <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sim</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl><RadioGroupItem value="nao" /></FormControl>
                <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Não</FormLabel>
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
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Matrícula do Imóvel</FormLabel>
          <FormControl><Input className=" rounded-2xl border-gray-400 bg-white" placeholder="Nº da matrícula (opcional)" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="imovel_proprietario"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Imóvel no nome de quem?</FormLabel>
          <FormControl><Input className=" rounded-2xl border-gray-400 bg-white" placeholder="Ex: Meu e Cônjuge" {...field} /></FormControl>
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Marca</FormLabel>
            <FormControl><Input className=" rounded-2xl border-gray-400 bg-white" placeholder="Ex: Toyota" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="veiculo_modelo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Modelo</FormLabel>
            <FormControl><Input className=" rounded-2xl border-gray-400 bg-white" placeholder="Ex: Corolla" {...field} /></FormControl>
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ano</FormLabel>
            <FormControl><Input className=" rounded-2xl border-gray-400 bg-white" type="number" placeholder="2020" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="veiculo_valor_fipe"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Valor Aprox. (FIPE)</FormLabel>
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
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}

                // 1. Dizemos para ele USAR o seu componente <Input>
                customInput={Input}

                // 2. Usamos onValueChange para atualizar o react-hook-form
                onValueChange={(value, name) => {

                  const numericValue = value ? parseFloat(value) : undefined;
                  field.onChange(numericValue);
                }}
                className=" rounded-2xl border-gray-400 bg-white"
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
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">O veículo está no nome de quem?</FormLabel>
          <FormControl><Input className=" rounded-2xl border-gray-400 bg-white" placeholder="Ex: Meu nome" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="veiculo_placa"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Placa do Veículo</FormLabel>
          <FormControl><Input className=" rounded-2xl border-gray-400 bg-white" placeholder="AAA-0A00" {...field} /></FormControl>
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Modelo Desejado</FormLabel>
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ano</FormLabel>
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
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preferência de Garantia</FormLabel>
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
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Empresa / Convênio</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className=" rounded-2xl border-gray-400 bg-white" ><SelectTrigger><SelectValue placeholder="Selecione sua empresa" /></SelectTrigger></FormControl>
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
        <FormItem >
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Salário Bruto</FormLabel>
          <FormControl><Input className=" rounded-2xl border-gray-400 bg-white" type="number" placeholder="R$ 3.500" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="consignado_regime_clt"
      render={({ field }) => (
        <FormItem className=" border-gray-400 flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm ">
          <div className="space-y-0.5">
            <FormLabel>Regime CLT?</FormLabel>
          </div>
          <FormControl >
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
        <h3 className="text-x5 font-bold uppercase tracking-widest text-gray-700">Garantia Disponível</h3>
        <p className="text-sm text-muted-foreground">
          Você possui algum bem para oferecer como garantia e conseguir taxas menores?
        </p>

        <FormField
          control={control}
          name="possui_garantia"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="  border-gray-400  focus:bg-white bg-gray-50/50">
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
                <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Qual bem você pode oferecer como garantia?</FormLabel>
                <FormControl>
                  <Input className=" rounded-2xl border-gray-400 bg-white"
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Faturamento médio em Maquininha (mensal)</FormLabel>
            <FormControl>
              <CurrencyInput
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                customInput={Input}
                onValueChange={(val) => field.onChange(val)}
                placeholder="R$ 0,00"
                className=" rounded-2xl border-gray-400 bg-white"
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Qual a sua Maquininha?</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl className=" rounded-2xl border-gray-400 bg-white">
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">CNPJ</FormLabel>
            <FormControl className=" rounded-2xl border-gray-400 bg-white">

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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Vendas médias no cartão (Mensal)</FormLabel>
            <FormControl>
              <CurrencyInput
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                customInput={Input}
                onValueChange={(val) => field.onChange(val)}
                placeholder="R$ 0,00"
                value={field.value}
                className=" rounded-2xl border-gray-400 bg-white"
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Qual sua operadora principal?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className=" rounded-2xl border-gray-400 bg-white">
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
          <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">CNPJ vinculado à maquininha</FormLabel>
          <FormControl>
            <InputMask
              mask="99.999.999/9999-99"
              value={field.value}
              onChange={field.onChange}
              className=" rounded-2xl border-gray-400 bg-white"
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">CNPJ</FormLabel>
            <FormControl>

              <InputMask
                className=" rounded-2xl border-gray-400 bg-white"
                mask="99.999.999/9999-99"
                maskChar={null}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
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
            <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-widest">Faturamento mensal da empresa </FormLabel>
            <FormControl>
              {/* Usamos o CurrencyInput como o controlador */}
              <CurrencyInput
                className=" rounded-2xl border-gray-400 bg-white"
                id="faturamento_mensal_da_empresa" // Bom para acessibilidade
                name={field.name}
                placeholder="R$ 80.000,00"
                value={field.value}
                onBlur={field.onBlur}
                ref={field.ref}
                decimalsLimit={2}
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                customInput={Input}
                onValueChange={(value, name) => {

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
    case 'trava-de-maquininha':
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
  const [resultado, setResultado] = useState<SimulacaoResultado | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const tipoEmprestimoOriginal = location.state?.tipo;

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
      possui_garantia: "nenhum",
      especificacao_motivo: "",
    }
  });

  // --- LÓGICA DE TROCA DE TIPO (GARANTIA) ---
  const garantiaSelecionada = useWatch({
    control: form.control,
    name: "possui_garantia"
  });

  const tipoEfetivo = useMemo(() => {
    if (tipoEmprestimoOriginal === 'emprestimo-pessoal') {
      if (garantiaSelecionada === 'imovel') return 'imovel-garantia';
      if (garantiaSelecionada === 'veiculo') return 'veiculo-garantia';
    }
    return tipoEmprestimoOriginal;
  }, [tipoEmprestimoOriginal, garantiaSelecionada]);

  const motivoSelecionado = useWatch({ control: form.control, name: "motivo_emprestimo" });

  if (!tipoEmprestimoOriginal) {
    toast.error("Selecione um produto para simular.");
    return <Navigate to="/" replace />;
  }

  const handleCalcular = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/simulacoes/calcular-imediato", {
        valor_desejado: Number(data.valor_desejado),
        prazo_meses: parseInt(data.prazo_meses),
        tipo_emprestimo: tipoEfetivo // Enviando o tipo corrigido para o backend
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
      // Tenta recuperar o token para saber se o usuário já está logado
      const token = localStorage.getItem("token");

      const payload = {
        ...data,
        valor_desejado: Number(data.valor_desejado),
        prazo_meses: Number(data.prazo_meses),
        tipo_emprestimo: tipoEfetivo,
        dados_entrada: data,
        resultado_simulacao: resultado,
        // Informação crucial para o backend vincular ao User model
        user_email: data.email
      };

      await api.post("/api/simulacoes/salvar-lead", payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      toast.success("Simulação salva com sucesso!");

      if (destino === 'whatsapp') {

        let msg = `Olá! Meu nome é *${data.full_name}*.\n`;
        msg += `*Dados Pessoais:*\n`;
        msg += `   • Nascimento: ${new Date(data.data_nascimento).toLocaleDateString('pt-BR')}\n`;
        msg += `   • Local: ${data.cidade} - ${data.estado}\n`;
        msg += `   • Contato: ${data.phone}\n`;
        msg += `   • E-mail: ${data.email}\n\n`;

        msg += `*Resumo da Simulação:*\n`;
        msg += `   • Motivo: ${motivoSelecionado === 'outro' ? data.especificacao_motivo : motivoSelecionado}\n`;
        msg += `   • Produto: ${tipoEfetivo.toUpperCase()}\n`;
        msg += `   • Valor: R$ ${data.valor_desejado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
        msg += `   • Prazo: ${data.prazo_meses}x de *R$ ${resultado?.valor_parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*\n\n`;

        switch (tipoEfetivo) {
          case 'imovel-garantia':
            msg += `*Dados do Imóvel:*\n`;
            msg += `   • Tipo: ${data.imovel_tipo || 'N/A'}\n`;
            msg += `   • Está pagando financiamento?: ${data.imovel_esta_pagando === 'sim' ? 'Sim' : 'Não'}\n`;
            msg += '   • valor da imovel ' + data.valor_imovel + '\n';
            msg += `   • Matrícula: ${data.imovel_matricula || 'N/A'}\n`;
            msg += `   • Proprietário: ${data.imovel_proprietario || 'N/A'}\n\n`;

            break;

          case 'veiculo-garantia':
            msg += `*Dados do Veículo:*\n`;
            msg += `   • Ano: ${data.veiculo_ano || 'N/A'}\n`;
            msg += `   • Valor FIPE: R$ ${Number(data.veiculo_valor_fipe).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
            msg += `   • Proprietário: ${data.veiculo_proprietario || 'N/A'}\n`;
            msg += `   • Modelo: ${data.veiculo_marca} ${data.veiculo_modelo}\n`;
            msg += `   • Placa: ${data.veiculo_placa || 'N/A'}\n\n`;
            break;

          case 'credito-consignado':
            msg += `*Dados Profissionais:*\n`;
            msg += `   • Empresa: ${data.consignado_empresa}\n`;
            msg += `   • Salário Bruto: R$ ${Number(data.consignado_salario_bruto).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
            msg += `   • Regime: ${data.consignado_regime_clt ? 'CLT' : 'Outro'}\n\n`;
            break;

          case 'capital-de-giro':
            msg += `*Dados Empresariais:*\n`;
            msg += `   • CNPJ: ${data.cnpj || 'Informado no formulário'}\n\n`;
            break;
          case 'adiantamento-recebiveis':
          case 'trava-maquininha':
            msg += `*Dados da Maquininha:*\n`;
            msg += `   • Faturamento Mensal: R$ ${Number(data.faturamento_maquininha).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
            msg += `   • Operadora Principal: ${data.operadora_maquininha}\n`;
            msg += `   • CNPJ Vinculado: ${data.cnpj || 'N/A'}\n\n`;
            break;
        }

        msg += `Tenho interesse em dar prosseguimento ao meu crédito!`;

        window.open(`https://wa.me/5535988284302?text=${encodeURIComponent(msg.trim())}`, '_blank');


      } else {

        // Exemplo do que deve estar no seu navigate da SimulacaoPage
        navigate('/login', {
          state: {
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,

          }
        });
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
      <div className="container max-w-4xl mx-auto py-12 md:py-24 px-4">
        {resultado && (
          <Card className="mb-8 border-2 border-blue-500 bg-white shadow-lg animate-in zoom-in-95 duration-500">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Resultado da Simulação
                </span>
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-slate-500 font-medium uppercase">Parcela Mensal Estimada</p>
                <p className="text-5xl font-extrabold text-blue-600">
                  R$ {resultado.valor_parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border rounded-lg overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-r md:border-b-0 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Prazo</p>
                  <p className="text-lg font-semibold text-slate-800">{form.getValues().prazo_meses}x</p>
                </div>

                <div className="bg-slate-50 p-4 border-b md:border-b-0 md:border-r text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Taxa Mensal</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {tipoEfetivo === 'imovel-garantia' ? '1,00%' :
                      tipoEfetivo === 'veiculo-garantia' ? '1,50%' : '3,00%'}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 border-r text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Total Juros</p>
                  <p className="text-lg font-semibold text-slate-800">
                    R$ {resultado.juros_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Custo Total</p>
                  <p className="text-lg font-semibold text-slate-800">
                    R$ {resultado.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="pt-6 flex justify-center">
               <Button 
  variant="ghost" 
  size="sm" 
  onClick={() => {
    setResultado(null);      // Remove o card de resultado
    setShowLeadForm(false);   // Volta para o Passo 1 e 2
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Opcional: sobe a tela para o início
  }} 
  className="text-slate-400 hover:text-blue-600 transition-colors"
>
  <RefreshCcw className="mr-2 h-3 w-3" /> Refazer simulação
</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-400 font-light italic text-4xl ml-3 ">
              Estruture seu
              <span className="text-gray-400 font-light italic text-4xl ml-3 ">Planejamento. </span>

            </CardTitle>


          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => showLeadForm ? handleFinalizarLead(data, 'whatsapp') : handleCalcular(data))} className="space-y-8">

                {!showLeadForm ? (
                  <>
                    {/* PASSO 1: DADOS FINANCEIROS */}
                    <StepSection step={1} title="Dados do Empréstimo">
                      <BigCurrencyField control={form.control} name="valor_desejado" label="Quanto você precisa?" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="prazo_meses"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-600">
                                Prazo (meses)
                              </FormLabel>
                              <Input className="border-gray-400 focus:bg-white bg-gray-50/50" type="number" {...field} />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="motivo_emprestimo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-600">
                                Motivo do crédito
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl className="border-gray-400 focus:bg-white bg-gray-50/50">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-2xl border-none shadow-2xl">
                                  <SelectItem value="quitar_dividas">Quitar Dívidas</SelectItem>
                                  <SelectItem value="investimento">Investimento</SelectItem>
                                  <SelectItem value="reforma">Reforma</SelectItem>
                                  <SelectItem value="compra_bem">Compra de Bem</SelectItem>
                                  <SelectItem value="viagem">Viagem</SelectItem>
                                  <SelectItem value="outro">Outro</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />


                        {motivoSelecionado === "outro" && (
                          <FormField
                            control={form.control}
                            name="especificacao_motivo" // Nome alterado aqui
                            render={({ field }) => (
                              <FormItem className="animate-in fade-in slide-in-from-top-2 md:col-span-2">
                                <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-600">
                                  Especifique o motivo
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="border-gray-400 focus:bg-white bg-gray-50/50"
                                    placeholder="Descreva aqui..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </StepSection>
                    <StepSection step={2} title="Detalhes Adicionais">
                      {renderSpecificQuestions(tipoEfetivo, form.control as unknown as Control<FieldValues>)}
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
                                {(inputProps) => <Input {...inputProps} type="tel" placeholder="(00) 00000-0000" />}
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
                              {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
                                'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
                                'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                    </div>
                  </StepSection>
                )}

                <div className="flex flex-col gap-4 pt-6">
                  <Button type="submit" disabled={isLoading} size="lg" className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 shadow-md">
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