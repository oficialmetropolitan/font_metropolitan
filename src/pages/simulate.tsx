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
import { ArrowRight, Landmark, Loader2, RefreshCcw, TrendingUp, UserPlus } from "lucide-react";
import Header from '@/components/Header';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field'
import { AxiosError } from 'axios';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";



import { SimulacaoFormData, SimulacaoResultado } from '@/components/simulate/types';
import { StepSection, BigCurrencyField, renderSpecificQuestions } from '@/components/simulate/SimulateForms';

const SimulacaoPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState<SimulacaoResultado | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [cronograma, setCronograma] = useState([]);
  const [etapa, setEtapa] = useState<"simulacao" | "resultado" | "lead">("simulacao");

  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

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


  const isUnderage = (birthDate: string) => {
    if (!birthDate) return false;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    // Ajusta se ainda não fez aniversário no ano corrente
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age < 18;
  };


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
        tipo_emprestimo: tipoEfetivo
      });

      setResultado(response.data);
      setEtapa("resultado");

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
      const token = localStorage.getItem("token");

      const payload = {
        ...data,
        valor_desejado: Number(data.valor_desejado),
        prazo_meses: Number(data.prazo_meses),
        tipo_emprestimo: tipoEfetivo,
        dados_entrada: data,
        resultado_simulacao: resultado,
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

        window.open(`https://wa.me/5535997446658?text=${encodeURIComponent(msg.trim())}`, '_blank');


      } else {

        navigate('/login', {
          state: {
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,

          }
        });
      }
    } catch (error) {

      const errorMsg = error.response?.data?.message || "Preencha todos os campos obrigatórios.";
      toast.error(errorMsg);
      console.error("Erro na simulação:", error);
      if (isUnderage(data.data_nascimento)) {
        toast.error("Desculpe, você precisa ter pelo menos 18 anos para realizar uma simulação.");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const gerarCronograma = (
    valorBase: number,
    taxaMensal: number,
    meses: number,
    parcela: number
  ) => {
    const i = taxaMensal / 100;
    let saldo = valorBase;

    const lista = [];
    const dataBase = new Date();

    for (let k = 1; k <= meses; k++) {
      const juros = saldo * i;
      const amortizacao = parcela - juros;
      saldo -= amortizacao;

      const vencimento = new Date(dataBase);
      vencimento.setMonth(vencimento.getMonth() + k);

      lista.push({
        numero: k,
        vencimento,
        parcela,
        juros,
        amortizacao,
        saldo: saldo < 0 ? 0 : saldo
      });
    }

    return lista;
  };

  return (
    <>
      <Header />
      <div className="container max-w-4xl mx-auto py-12 md:py-24 px-4"  >
        {etapa === "resultado" && resultado && (
          <div className="py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">

            <div className="space-y-10">
              {/* Header Section */}
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  Estrutura Financeira Sugerida
                </h2>
                <p className="text-base text-gray-600 font-light leading-relaxed max-w-2xl">
                  Baseado no seu perfil de investidor e garantias apresentadas, estruturamos a seguinte condição de amortização:
                </p>
              </div>

              {/* Card Principal */}
              <motion.div
                whileHover={{ y: -4 }}
                className="relative cursor-pointer group"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative border border-gray-200 rounded-3xl p-8 bg-white shadow-md group-hover:shadow-2xl group-hover:border-blue-300/50 transition-all duration-300">
                  <div className="flex items-center justify-between gap-6">
                    {/* Conteúdo Esquerdo */}
                    <div className="flex-1">
                      <div className="space-y-4">
                        {/* Valor e Parcelamento */}
                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-black text-gray-900 tracking-tight">
                            {form.getValues().prazo_meses}x
                          </span>
                          <span className="text-base font-light text-gray-500">de</span>
                          <span className="text-2xl font-bold text-blue-600">
                            R$ {resultado.valor_parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>

                        {/* Tags de Informação */}
                        <div className="flex items-center gap-3 pt-2 flex-wrap">
                          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border border-blue-200">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                            Taxa: {tipoEfetivo === 'imovel-garantia' ? '1,00%' : tipoEfetivo === 'veiculo-garantia' ? '1,50%' : '3,00%'} a.m
                          </span>
                          <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full tracking-wide">
                            Tabela Price
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Ícone - Visível em Desktop */}
                    <div className="hidden lg:flex items-center justify-center">
                      <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl">
                        <TrendingUp className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Botão Dossiê de Transparência */}
              <button
                type="button"
                onClick={() => {
                  const taxa = tipoEfetivo === 'imovel-garantia' ? 1 : tipoEfetivo === 'veiculo-garantia' ? 1.5 : 3;
                  const lista = gerarCronograma(form.getValues().valor_desejado, taxa, Number(form.getValues().prazo_meses), resultado!.valor_parcela);
                  setCronograma(lista);
                  setMostrarDetalhes(true);
                }}
                className="inline-flex items-center gap-2.5 text-xs font-black text-blue-600 uppercase tracking-[0.15em] hover:text-blue-800 transition-colors group"
              >
                Dossiê de Transparência e CET
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Seção de Ações */}
              <div className="space-y-5 pt-2">

                {/* Aviso Legal */}
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200/60">
                  <p className="text-xs text-amber-900 text-center uppercase tracking-[0.15em] leading-relaxed font-semibold">
                    Esta oferta pode ser alterada ou encerrada pela Metropolitan após análise interna.
                  </p>
                </div>

                {/* Botão Reajustar */}
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    onClick={() => setEtapa("simulacao")}
                    className="text-xs font-bold uppercase tracking-[0.12em] text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all"
                  >
                    <RefreshCcw className="mr-2.5 h-3.5 w-3.5" />
                    Reajustar Valor
                  </Button>
                </div>

                {/* Botão Principal CTA */}
                <Button
                  onClick={() => {
                    setEtapa("lead");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full h-16 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold tracking-[0.12em] uppercase shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Aceitar Proposta e Prosseguir
                    <ArrowRight className="ml-2.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0" />
                </Button>

              </div>
            </div>

            {/* Dialog de Transparência */}
            <Dialog open={mostrarDetalhes} onOpenChange={setMostrarDetalhes}>
              <DialogContent className="max-w-5xl rounded-3xl p-0 overflow-hidden border-none shadow-2xl">

                {/* Dialog Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
                  <DialogTitle className="text-2xl font-bold tracking-tight">
                    Detalhamento Técnico da Operação
                  </DialogTitle>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mt-3 font-bold">
                    Cronograma Completo de Amortização
                  </p>
                </div>

                {/* Tabela com Scroll */}
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left text-xs font-black text-gray-600 uppercase tracking-widest pb-4 w-12">
                          Nº
                        </th>
                        <th className="text-left text-xs font-black text-gray-600 uppercase tracking-widest pb-4">
                          Prestação
                        </th>
                        <th className="text-left text-xs font-black text-gray-600 uppercase tracking-widest pb-4">
                          Juros
                        </th>
                        <th className="text-left text-xs font-black text-gray-600 uppercase tracking-widest pb-4">
                          Amortização
                        </th>
                        <th className="text-right text-xs font-black text-gray-600 uppercase tracking-widest pb-4">
                          Saldo Devedor
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium text-gray-900">
                      {cronograma.map((item, idx) => (
                        <tr
                          key={item.numero}
                          className={`border-b border-gray-100 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-gray-50/40' : 'bg-white'
                            } hover:bg-blue-50/50`}
                        >
                          <td className="py-4 text-gray-500 font-mono text-xs font-bold">
                            {item.numero.toString().padStart(2, '0')}
                          </td>
                          <td className="py-4">
                            R$ {item.parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-4 text-red-600 font-semibold">
                            R$ {item.juros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-4 text-emerald-600 font-semibold">
                            R$ {item.amortizacao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-4 text-right font-bold">
                            R$ {item.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Dialog Footer */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setMostrarDetalhes(false)}
                    className="text-xs font-bold uppercase tracking-widest rounded-lg"
                  >
                    Fechar Relatório
                  </Button>
                </div>

              </DialogContent>
            </Dialog>

          </div>
        )}
        {(etapa === "simulacao" || etapa === "lead") && (
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-400 font-light italic text-4xl ml-3">
                {etapa === "simulacao" ? (
                  <>
                    Estruture seu
                    <span className="ml-3">Planejamento.</span>
                  </>
                ) : (
                  <>
                    Finalize sua
                    <span className="ml-3">Solicitação.</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => {
                    if (etapa === "simulacao") {
                      handleCalcular(data);
                    } else {
                      handleFinalizarLead(data, "whatsapp");
                    }
                  })}
                  className="space-y-8"
                >
                  {/* ================= ETAPA 1 E 2 ================= */}
                  {etapa === "simulacao" && (
                    <>
                      <StepSection step={1} title="Dados do Empréstimo">
                        <BigCurrencyField
                          control={form.control}
                          name="valor_desejado"
                          label="Quanto você precisa?"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="prazo_meses"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-600">
                                  Prazo (meses)
                                </FormLabel>
                                <Input
                                  type="number"
                                  className="border-gray-400 bg-gray-50/50"
                                  {...field}
                                />
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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-gray-400 bg-gray-50/50">
                                      <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                  </FormControl>
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
                            )}
                          />

                          {motivoSelecionado === "outro" && (
                            <FormField
                              control={form.control}
                              name="especificacao_motivo"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-600">
                                    Especifique o motivo
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Descreva aqui..."
                                      className="border-gray-400 bg-gray-50/50"
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
                        {renderSpecificQuestions(
                          tipoEfetivo,
                          form.control as unknown as Control<FieldValues>
                        )}
                      </StepSection>
                    </>
                  )}

                  {/* ================= ETAPA 3 ================= */}
                  {etapa === "lead" && (
                    <StepSection step={3} title="Onde enviamos o resultado?">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="full_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Completo *</FormLabel>
                              <Input placeholder="Seu nome" {...field} />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>E-mail *</FormLabel>
                                <Input type="email" {...field} />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>WhatsApp *</FormLabel>
                                <FormControl>
                                  <InputMask
                                    mask="(99) 99999-9999"
                                    value={field.value}
                                    onChange={field.onChange}
                                  >
                                    {(inputProps) => (
                                      <Input
                                        {...inputProps}
                                        type="tel"
                                        placeholder="(00) 00000-0000"
                                      />
                                    )}
                                  </InputMask>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="data_nascimento"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Data de Nascimento *</FormLabel>
                                <Input
                                  type="date"
                                  {...field}
                                  max={new Date().toISOString().split("T")[0]}
                                />
                                {field.value && isUnderage(field.value) && (
                                  <p className="text-sm text-red-600">
                                    É necessário ser maior de 18 anos.
                                  </p>
                                )}
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cidade"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cidade *</FormLabel>
                                <Input {...field} />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="estado"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado (UF) *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="UF" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[
                                    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                                    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                                    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                                  ].map((uf) => (
                                    <SelectItem key={uf} value={uf}>
                                      {uf}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    </StepSection>
                  )}

                  <div className="flex flex-col gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      size="lg"
                      className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 shadow-md"
                    >
                      {isLoading && <Loader2 className="animate-spin mr-2" />}
                      {!isLoading &&
                        (etapa === "simulacao"
                          ? "Calcular e Ver Resultado"
                          : "Finalizar e WhatsApp")}
                    </Button>

                    {etapa === "lead" && (
                      <Button
                        variant="outline"
                        type="button"
                        onClick={form.handleSubmit((data) =>
                          handleFinalizarLead(data, "login")
                        )}
                        className="w-full"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Continuar no site (Fazer Login)
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

      </div>
      <Footer />
    </>
  );
};

export default SimulacaoPage;