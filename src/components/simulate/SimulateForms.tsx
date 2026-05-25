import React from 'react';
import { FieldValues, Control, useWatch } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Landmark } from "lucide-react";
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field';

import { SpecificQuestionsProps, StepSectionProps, BigCurrencyFieldProps } from './types';

export const StepSection = ({ step, title, children }: StepSectionProps) => (
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

export const BigCurrencyField = ({ control, name, label }: BigCurrencyFieldProps) => (
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
              customInput={Input}
              className="text-5xl md:text-5xl font-black border-0 border-b-2 border-gray-400 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 py-8 bg-transparent transition-all placeholder:text-gray-600"
              placeholder="R$ 00,00"
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
export const HomeEquityQuestions = ({ control }: SpecificQuestionsProps) => (

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
export const CarEquityQuestions = ({ control }: SpecificQuestionsProps) => (
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
export const FinanciamentoVeicularQuestions = ({ control }: SpecificQuestionsProps) => (
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
export const CONSIGNADO_EMPRESAS = ["IPD", "Hospital Regional", "Laboratório Frota", "Clínica Fort", "D-Radio", "IPECONT", "Inovacon", "Vitra", "Wizzer", "Outra"];

export const ConsignadoQuestions = ({ control }: SpecificQuestionsProps) => (
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


export const PessoalQuestions = ({ control }: SpecificQuestionsProps) => {
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

export const RecebiveisQuestions = ({ control }: SpecificQuestionsProps) => (
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
export const TravaMaquininhaQuestions = ({ control }: SpecificQuestionsProps) => (
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
export const CapitalGiroQuestions = ({ control }: SpecificQuestionsProps) => (
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


export const renderSpecificQuestions = (tipo: string, control: Control<FieldValues>) => {
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
