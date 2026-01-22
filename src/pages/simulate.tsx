// src/pages/SimulacaoPage.tsx
import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useForm, Controller, useWatch } from 'react-hook-form'; // 'Controller' pode ser útil
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
import { ArrowRight, Loader2 } from "lucide-react";
import Header from '@/components/Header';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field'

// Tipo de Prop para os componentes de perguntas
type SpecificQuestionsProps = {
  control: any; // O control do react-hook-form
};

const StepIndicator = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2563eb] text-white font-bold text-lg">
      {number}
    </div>
    <h2 className="text-2xl font-semibold text-[#1e293b]">{title}</h2>
  </div>
);

// --- COMPONENTE DE ESTILO: VALOR GRANDE (INPUT) ---
const BigValueInput = ({ field, label, placeholder, helperText }: any) => (
  <div className="space-y-2 mb-10">
    <label className="text-lg text-slate-600">{label}</label>
    <div className="relative border-b-2 border-slate-300 focus-within:border-blue-600 transition-all py-2">
      <div className="flex items-baseline">
        <span className="text-4xl font-light text-slate-700 mr-2">R$</span>
        <CurrencyInput
          intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
          onValueChange={(val) => field.onChange(val ? parseFloat(val) : 0)}
          value={field.value}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none text-5xl font-light text-slate-600 placeholder:text-slate-200"
        />
      </div>
    </div>
    {helperText && <p className="text-sm text-slate-400 mt-2">{helperText}</p>}
  </div>
);
// --- Home Equity ---
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
    </div>
  );
};

const MedpalnQuestions = ({ control }: SpecificQuestionsProps) => (
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
            name="faturamento_6meses"
            render={({ field }) => (
        <FormItem>
          <FormLabel>Faturamento dos últimos 6 meses </FormLabel>
          <FormControl>
            {/* Usamos o CurrencyInput como o controlador */}
            <CurrencyInput
              id="faturamento_6meses" // Bom para acessibilidade
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
        name="necessidade_capital"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Necessidade de capital</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="equipamento">Equipamentos</SelectItem>
                        <SelectItem value="expansao">Expansão</SelectItem>
                        <SelectItem value="fluxo_caixa">Fluxo de Caixa</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )}
    />
  </div>
);

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
              {(inputProps: any) => (
                <Input {...inputProps} placeholder="00.000.000/0000-00" />
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


const renderSpecificQuestions = (tipo: string, control: any) => {
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
// --- COMPONENTE PRINCIPAL (SimulacaoPage) ---
const SimulacaoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);

  const tipoEmprestimo = location.state?.tipo;

  // ATUALIZADO: Agora o 'form' controlará todos os campos
  const form = useForm(); 
  

  if (!tipoEmprestimo) {
    toast.error("Selecione um produto para simular.");
    return <Navigate to="/" replace />;
  }


  const onSubmit = async (data: any) => {
    setIsLoading(true);

   
    const { valor_desejado, prazo_meses, motivo_emprestimo, ...dadosEspecificos } = data;
    
    

    // 2. Monta o payload final
    const payload = {
      valor_desejado: parseFloat(valor_desejado),
      prazo_meses: parseInt(prazo_meses, 10),
      motivo_emprestimo: motivo_emprestimo,
      tipo_emprestimo: tipoEmprestimo, 
      dados_especificos: dadosEspecificos 
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Você não está logado. Redirecionando para o login.");
        navigate('/login'); 
        setIsLoading(false);
        return;
      }
      
      // 3. Chama a API de Simulações (COM HEADER)
      await api.post("/api/simulacoes", payload, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      toast.success("Simulação salva! Agora, complete seu perfil.");
      
    
      navigate('/perfil'); 

    } catch (error: any) {
      console.error("Erro ao salvar simulação:", error);
      if (error.response?.status === 401) {
        toast.error("Sua sessão expirou. Faça login novamente.");
        navigate('/login');
      } else {
        toast.error(error.response?.data?.detail || "Erro ao iniciar simulação.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Simulação de Empréstimo</CardTitle>
            <CardDescription>
              Preencha os dados para sua simulação de <strong>{tipoEmprestimo}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent>
          
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* ETAPA 1: DADOS GERAIS */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Valores da Simulação</h3>
                     
                      <FormField
                        control={form.control}
                        name="valor_desejado"
                        render={({ field }) => (
                          <FormItem>
                          <FormLabel>Quanto você precisa?</FormLabel>
                            <FormControl>
                              {/* Usamos o CurrencyInput como o controlador */}
                              <CurrencyInput
                                id="valor_desejado" // Bom para acessibilidade
                                name={field.name}
                                placeholder="R$ 30.000,00"
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
                  <FormField
                    control={form.control}
                    name="prazo_meses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Em quantos meses?</FormLabel>
                        <FormControl><Input type="number" placeholder="60" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="motivo_emprestimo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motivo do Empréstimo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Selecione o motivo" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="quitar_dividas">Quitar dívidas</SelectItem>
                                <SelectItem value="investir_negocio">Investir no negócio</SelectItem>
                                <SelectItem value="reforma_casa">Reforma da casa</SelectItem>
                                <SelectItem value="compra_veiculo">Comprar veículo</SelectItem>
                                <SelectItem value="outros">Outros</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                {/* ETAPA 2: DADOS ESPECÍFICOS (Renderização Condicional) */}
                <section>
                  {/* ATUALIZADO: Passando o form.control para o helper */}
                  {renderSpecificQuestions(tipoEmprestimo, form.control)}
                </section>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Salvando...' : 'Ir para o Perfil'}
                    {!isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
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