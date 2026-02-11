import React, { useEffect, useState } from "react";
import api from "@/services/http/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/simulation/StatusBadge";
import { toast } from "sonner";
import {
  Check,
  X,
  Search,
  Loader2,
  Eye,
  RefreshCcw,
  User,
  DollarSign,
  TrendingUp,
  Save,
  Landmark,
  MessageCircle,
  Briefcase,
  MapPin,
  Calendar
} from "lucide-react";
import Header from "@/components/Header";

/* ==========================================================================
   COMPONENTES DE APOIO (DETALHES DA SIMULAÇÃO)
   ========================================================================== */
const DetalhesEspecificos = ({ sim, usuario, perfil }) => {
  const dados = sim.dados_especificos?.entrada || {};
  if (!sim.tipo_emprestimo) return null;

  const SectionHeader = ({ icon: Icon, title, colorClass }) => (
    <h4 className={`font-bold text-xs uppercase ${colorClass} flex items-center gap-2 tracking-[0.15em] mb-4`}>
      <Icon size={14} /> {title}
    </h4>
  );

  const DataItem = ({ label, value }) => (
    <div className="space-y-1">
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-navy-dark">{value || "N/A"}</p>
    </div>
  );

  return (
    <>
    <div>
      <SectionHeader icon={Calendar} title="Resumo da Simulação" colorClass="text-primary" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50/20 p-6 rounded-2xl border border-gray-200 shadow-sm mb-10">
        <DataItem label="Modalidade" value={sim.tipo_emprestimo.replace(/-/g, ' ')} />
        <DataItem label="Valor Solicitado" value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(sim.valor_desejado)} />
        <DataItem label="Prazo (meses)" value={sim.prazo_meses} />
        <DataItem label="Valor Parcela" value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(sim.valor_parcela || 0)} />
        <DataItem label="Juros Totais" value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(sim.juros_total || 0)} />
        <DataItem label="Valor Total a Pagar" value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(sim.valor_total || 0)} />  
      </div>
    </div>

    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* 1. INFORMAÇÕES DO PROPONENTE */}
      <div>
        <SectionHeader icon={User} title="Identificação do Proponente" colorClass="text-blue-600" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-blue-50/20 p-6 rounded-2xl border border-blue-100/50 shadow-sm">
          <DataItem label="Nome Completo" value={usuario?.full_name || dados.full_name} />
          <DataItem label="CPF" value={usuario?.cpf || "Não informado"} />
          <DataItem label="E-mail" value={usuario?.email || dados.email} />
          <DataItem label="WhatsApp" value={usuario?.phone || dados.phone} />
        </div>
      </div>

      {/* 2. PERFIL DETALHADO (LGPD) */}
      {perfil && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
          <div>
            <SectionHeader icon={Briefcase} title="Vida Profissional" colorClass="text-emerald-600" />
            <div className="grid grid-cols-2 gap-4 bg-emerald-50/20 p-5 rounded-2xl border border-emerald-100/50">
              <DataItem label="Profissão" value={perfil.profissao} />
              <DataItem label="Renda Mensal" value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(perfil.renda_mensal || 0)} />
              <DataItem label="Escolaridade" value={perfil.escolaridade} />
              <DataItem label="Data Admissão" value={perfil.data_admissao} />
            </div>
          </div>
          <div>
            <SectionHeader icon={MapPin} title="Endereço & Social" colorClass="text-indigo-600" />
            <div className="grid grid-cols-2 gap-4 bg-indigo-50/20 p-5 rounded-2xl border border-indigo-100/50">
               <DataItem label="Estado Civil" value={perfil.estado_civil} />
               <DataItem label="Gênero" value={perfil.genero} />
               <div className="col-span-2">
                 <DataItem label="Residência" value={`${perfil.logradouro}, ${perfil.numero} - ${perfil.cidade}/${perfil.estado}`} />
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. GARANTIAS TÉCNICAS */}
      <div className="border-t pt-8">
        <SectionHeader icon={Landmark} title="Lastro da Operação" colorClass="text-slate-600" />
        <div className="bg-gray-50/80 p-6 rounded-3xl border border-gray-200">
          {sim.tipo_emprestimo === "imovel-garantia" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <DataItem label="Tipo do Imóvel" value={dados.imovel_tipo} />
              <DataItem label="Avaliação Estimada" value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(dados.valor_imovel || 0)} />
              <DataItem label="CEP do Ativo" value={dados.imovel_cep} />
              <DataItem label="Proprietário" value={dados.imovel_proprietario} />
              <DataItem label="Matrícula" value={dados.imovel_matricula} />
              <DataItem label="Financiado?" value={dados.imovel_esta_pagando} />
            </div>
          )}

          {sim.tipo_emprestimo === "veiculo-garantia" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <DataItem label="Veículo" value={`${dados.veiculo_marca} ${dados.veiculo_modelo}`} />
              <DataItem label="Ano / Placa" value={`${dados.veiculo_ano} / ${dados.veiculo_placa}`} />
              <DataItem label="Valor FIPE" value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(dados.veiculo_valor_fipe || 0)} />
              <DataItem label="Proprietário" value={dados.veiculo_proprietario} />
            </div>
          )}

          {!sim.tipo_emprestimo.includes("garantia") && (
            <div className="flex items-center justify-center py-6 text-gray-400 italic text-sm">
              Nenhum ativo real vinculado como garantia nesta modalidade.
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

/* ==========================================================================
   DASHBOARD PRINCIPAL
   ========================================================================== */
const AdminDashboard = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [perfis, setPerfis] = useState({});
  const [simSelecionada, setSimSelecionada] = useState(null);
  const [novaTaxa, setNovaTaxa] = useState("");
  const [salvando, setSalvando] = useState(false);
    const [taxaEdit, setTaxaEdit] = useState<string>("");
  const [valoresAjustados, setValoresAjustados] = useState(null);
  const [isSavingAjuste, setIsSavingAjuste] = useState(false);

  const carregarDados = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Você não está autenticado!");
        return;
      }

      const res = await api.get("/api/simulacoes/admin/todas", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSolicitacoes(res.data);

    } catch (error) {
      console.error("Erro na API:", error);
      toast.error("Erro ao carregar dados do servidor");
    } finally {
      setLoading(false);
    }
  };

  // CARREGA DADOS AO ABRIR A PÁGINA
  useEffect(() => {
    carregarDados();
  }, []);
  const carregarUsuario = async (userId) => {
    if (usuarios[userId]) return;
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`api/usersadmin/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios((prev) => ({ ...prev, [userId]: res.data }));
    } catch { toast.error("Erro ao carregar usuário."); }
  };

  const carregarPerfilUsuario = async (userId) => {
    if (perfis[userId]) return;
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/api/perfiladmin/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPerfis((prev) => ({ ...prev, [userId]: res.data }));
    } catch { toast.error("Erro ao carregar perfil."); }
  };

  const aprovarSimulacao = async (simId) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(`/api/simulacoes/admin/${simId}/status`, { status: "aprovado" }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Proposta aprovada!");
      carregarDados();
    } catch { toast.error("Falha na aprovação."); }
  };

  const reprovarSimulacao = async (simId) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(`/api/simulacoes/admin/${simId}/status`, { status: "reprovado" }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Proposta reprovada.");
      carregarDados();
    } catch { toast.error("Falha na reprovação."); }
  };

const calcularNovoCenario = (taxaMensal: number, valorBase: number, meses: number) => {
    if (taxaMensal <= 0 || isNaN(taxaMensal)) {
      setValoresAjustados(null);
      return;
    }
    
    const i = taxaMensal / 100;
    const n = meses;

    const parcela = (valorBase * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const total = parcela * n;
    const juros = total - valorBase;

    setValoresAjustados({
      valor_parcela: parcela,
      valor_total: total,
      juros_total: juros
    });
  };

 const salvarAjusteFinanceiro = async (id: number) => {
  if (!valoresAjustados) return;
  setIsSavingAjuste(true);
  try {
    const token = localStorage.getItem("token");
    // Enviamos a nova taxa junto com os valores calculados
    const payload = {
      ...valoresAjustados,
      taxa: parseFloat(novaTaxa)
    };

    await api.patch(`/api/simulacoes/admin/${id}/ajustar`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    toast.success("Condições atualizadas com sucesso!");
    
    // LIMPEZA DOS ESTADOS
    setSimSelecionada(null); // Fecha o modal
    setValoresAjustados(null);
    setNovaTaxa("");
    
    carregarDados(); // Recarrega a tabela principal
  } catch (error) {
    toast.error("Erro ao salvar no servidor.");
  } finally {
    setIsSavingAjuste(false);
  }
};
  const formatarMoeda = (valor: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);


  const chamarNoWhatsApp = (telefone) => {
    if (!telefone) return toast.error("Sem telefone.");
    const numeroLimpo = telefone.replace(/\D/g, "");
    const numeroComDDD = numeroLimpo.startsWith("55") ? numeroLimpo : `55${numeroLimpo}`;
    window.open(`https://wa.me/${numeroComDDD}?text=${encodeURIComponent("Olá! Sou da Metropolitan e falo sobre sua proposta.")}`, "_blank");
  };
useEffect(() => {
  if (simSelecionada && novaTaxa) {
    const taxaNum = parseFloat(novaTaxa);
    // Dispara o cálculo usando os valores reais da simulação selecionada
    calcularNovoCenario(
      taxaNum, 
      simSelecionada.valor_desejado, 
      simSelecionada.prazo_meses
    );
  } else {
    setValoresAjustados(null);
  }
}, [novaTaxa, simSelecionada]);

const filtrados = solicitacoes.filter(
  (s) =>
    s.tipo_emprestimo.toLowerCase().includes(busca.toLowerCase()) ||
    s.id.toString().includes(busca)
);

const solicitacoesUsuariosLogados = filtrados.filter(
  (s) => !!s.user_id
);

const solicitacoesSemLogin = filtrados.filter(
  (s) => !s.user_id
);

  return (
    <div className="min-h-screen bg-[#FBFBFC]">
      <Header />

      <main className="container max-w-7xl mx-auto py-12 px-6">

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-gray-500">Carregando dados...</p>
          </div>
        ) : (

          <>
            <div className="flex justify-between mb-6">
              <h1 className="text-3xl font-bold">Gestão de Propostas</h1>

              <div className="flex gap-3">
                <Input
                  placeholder="Buscar..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />

                <Button onClick={carregarDados}>
                  <RefreshCcw size={16} />
                </Button>
              </div>
            </div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card className="p-6 border-l-4 border-l-blue-600 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Clientes Logados</p>
                  <h3 className="text-3xl font-black text-navy-dark">{solicitacoesUsuariosLogados.length}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                  <User size={24} />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-green-600 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Leads WhatsApp</p>
                  <h3 className="text-3xl font-black text-navy-dark">{solicitacoesSemLogin.length}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-2xl text-green-600">
                  <MessageCircle size={24} />
                </div>
              </div>
            </Card>
          </div>
            

        {/* TABELA PRINCIPAL */}
        <Card className="rounded-[32px] border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-6 px-8 text-[10px] uppercase font-bold tracking-widest text-gray-400">Referência</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Modalidade</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Capital</TableHead>
                <TableHead className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-400">Status</TableHead>
                <TableHead className="text-right px-8 text-[10px] uppercase font-bold tracking-widest text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>

         <TableBody>

  <TableRow>
    <TableCell colSpan={5} className="bg-green-50 font-bold text-green-800">
      Usuários LOGADOS
    </TableCell>
  </TableRow>

  {solicitacoesUsuariosLogados.map((sim) => (
       console.log("Simulação:", sim),
                <TableRow key={sim.id} className="group hover:bg-gray-50/30 transition-colors">
                  <TableCell className="px-8 font-mono text-xs font-bold text-gray-400">#{sim.id}</TableCell>
                  <TableCell className="py-5">
                    <div className="font-bold text-navy-dark capitalize">{sim.tipo_emprestimo.replace(/-/g, ' ')}</div>
                    <div className="text-[10px] font-bold text-primary mt-1 flex items-center gap-1">
                      <Calendar size={10} /> {new Date(sim.criado_em).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-lg font-black text-navy-dark tracking-tighter">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(sim.valor_desejado)}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={sim.status} />
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full hover:bg-primary/5 text-primary font-bold uppercase text-[10px] tracking-widest"
                          onClick={() => {
                            carregarUsuario(sim.user_id);
                            carregarPerfilUsuario(sim.user_id);
                          }}
                        >
                          <Eye size={16} className="mr-2" /> Dossiê
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto rounded-[40px] border-none shadow-2xl p-10">
                        <DialogHeader className="mb-8">
                          <div className="flex items-center gap-4">
                             <div className="h-12 w-12 rounded-2xl bg-navy-dark flex items-center justify-center text-white shadow-xl shadow-navy-dark/10">
                               <Landmark size={24} />
                             </div>
                             <div>
                               <DialogTitle className="text-3xl font-black tracking-tight text-navy-dark leading-none">Dossiê Estruturado</DialogTitle>
                               <DialogDescription className="text-xs font-bold uppercase tracking-widest text-primary mt-1">Protocolo de Simulação #{sim.id}</DialogDescription>
                             </div>
                          </div>
                        </DialogHeader>

                        <DetalhesEspecificos
                          sim={sim}
                          usuario={usuarios[sim.user_id]}
                          perfil={perfis[sim.user_id]}
                        />

                 
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 border-t mt-12">
                          <div className="flex gap-2">
                             <Button
                                variant="outline"
                                className="rounded-full h-12 px-6 font-bold uppercase text-[10px] tracking-widest border-green-900 hover:bg-green-900 "
                                onClick={() => chamarNoWhatsApp(usuarios[sim.user_id]?.phone || sim.phone)}
                              >
                                <MessageCircle size={14} className="mr-2 text-green-600  " /> WhatsApp
                              </Button>
                              <Button
                                variant="outline"
                                className="rounded-full h-12 px-6 font-bold uppercase text-[10px] tracking-widest border-blue-700"
                                onClick={() => { setSimSelecionada(sim); setNovaTaxa(sim.taxa || ""); }}
                              >
                                <TrendingUp size={14} className="mr-2 text-primary" /> Taxa
                              </Button>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              onClick={() => reprovarSimulacao(sim.id)}
                              className="rounded-full h-12 px-8 text-red-500 font-bold uppercase text-[10px] tracking-widest  hover:bg-red-600  border-red-800"
                            >
                              Reprovar
                            </Button>
                            <Button
                              onClick={() => aprovarSimulacao(sim.id)}
                              className="rounded-full h-12 px-10 bg-navy-dark hover:bg-primary text-white font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-navy-dark/10 transition-all"
                            >
                              <Check size={16} className="mr-2" /> Aprovar Crédito
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
                




              
              ))}
  <TableRow>
    <TableCell colSpan={5} className="bg-yellow-50 font-bold text-yellow-800">
      Usuários SEM LOGIN
    </TableCell>
  </TableRow>
  {solicitacoesSemLogin.map((sim) => (
               
                  <TableRow key={sim.id} className="group hover:bg-gray-50/30 transition-colors">
                  <TableCell className="px-8 font-mono text-xs font-bold text-gray-400">#{sim.id}</TableCell>
                  <TableCell className="py-5">
                    <div className="font-bold text-navy-dark capitalize">{sim.tipo_emprestimo.replace(/-/g, ' ')}</div>
                    <div className="text-[10px] font-bold text-primary mt-1 flex items-center gap-1">
                      <Calendar size={10} /> {new Date(sim.criado_em).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-lg font-black text-navy-dark tracking-tighter">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(sim.valor_desejado)}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={sim.status} />
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full hover:bg-primary/5 text-primary font-bold uppercase text-[10px] tracking-widest"
                          onClick={() => {
                            carregarUsuario(sim.user_id);
                            carregarPerfilUsuario(sim.user_id);
                          }}
                        >
                          <Eye size={16} className="mr-2" /> Dossiê
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto rounded-[40px] border-none shadow-2xl p-10">
                        <DialogHeader className="mb-8">
                          <div className="flex items-center gap-4">
                             <div className="h-12 w-12 rounded-2xl bg-navy-dark flex items-center justify-center text-white shadow-xl shadow-navy-dark/10">
                               <Landmark size={24} />
                             </div>
                             <div>
                               <DialogTitle className="text-3xl font-black tracking-tight text-navy-dark leading-none">Dossiê Estruturado</DialogTitle>
                               <DialogDescription className="text-xs font-bold uppercase tracking-widest text-primary mt-1">Protocolo de Simulação #{sim.id}</DialogDescription>
                             </div>
                          </div>
                        </DialogHeader>

                        <DetalhesEspecificos
                          sim={sim}
                          usuario={usuarios[sim.user_id]}
                          perfil={perfis[sim.user_id]}
                        />

                 
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 border-t mt-12">
                          <div className="flex gap-2">
                             <Button
                                variant="outline"
                                className="rounded-full h-12 px-6 font-bold uppercase text-[10px] tracking-widest border-green-900 hover:bg-green-900 "
                                onClick={() => chamarNoWhatsApp(usuarios[sim.user_id]?.phone || sim.phone)}
                              >
                                <MessageCircle size={14} className="mr-2 text-green-600  " /> WhatsApp
                              </Button>
                              <Button
                                variant="outline"
                                className="rounded-full h-12 px-6 font-bold uppercase text-[10px] tracking-widest border-blue-700"
                                onClick={() => { setSimSelecionada(sim); setNovaTaxa(sim.taxa || ""); }}
                              >
                                <TrendingUp size={14} className="mr-2 text-primary" /> Taxa
                              </Button>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              onClick={() => reprovarSimulacao(sim.id)}
                              className="rounded-full h-12 px-8 text-red-500 font-bold uppercase text-[10px] tracking-widest  hover:bg-red-600  border-red-800"
                            >
                              Reprovar
                            </Button>
                            <Button
                              onClick={() => aprovarSimulacao(sim.id)}
                              className="rounded-full h-12 px-10 bg-navy-dark hover:bg-primary text-white font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-navy-dark/10 transition-all"
                            >
                              <Check size={16} className="mr-2" /> Aprovar Crédito
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
  ))}
            </TableBody>
          </Table>
        </Card>

        {/* MODAL PEQUENO DE TAXA */}
        <Dialog open={!!simSelecionada} onOpenChange={() => setSimSelecionada(null)}>
          <DialogContent className="max-w-md rounded-[32px] p-8 border-none shadow-2xl">
            <DialogHeader className="mb-4">
               <DialogTitle className="text-2xl font-black text-navy-dark tracking-tight">Ajuste Financeiro</DialogTitle>
               <DialogDescription className="text-sm">Informe a nova taxa mensal para a proposta #{simSelecionada?.id}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="relative">
                 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                 <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 2.99"
                    value={novaTaxa}
                    onChange={(e) => setNovaTaxa(e.target.value)} // O useEffect acima cuidará do cálculo
                    className="pl-10 h-14 rounded-2xl border-gray-200 focus:ring-primary/20 text-lg font-bold"
                  />
              </div>

             {valoresAjustados && (
                   <div className="pt-4 space-y-2 border-t border-primary/10 animate-in fade-in slide-in-from-top-1">
                                <div className="flex justify-between text-sm">
                                  <span>Nova Parcela:</span>
                                  <span className="font-bold text-primary">{formatarMoeda(valoresAjustados.valor_parcela)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Novo Montante Total:</span>
                                  <span className="font-bold">{formatarMoeda(valoresAjustados.valor_total)}</span>
                                </div>
                                <Button 
                                  className="w-full mt-4 gap-2" 
                                  onClick={() => salvarAjusteFinanceiro(simSelecionada.id)}
                                  disabled={isSavingAjuste}
                                >
                                  {isSavingAjuste ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>}
                                  Salvar e Recalcular
                                </Button>
                              </div>
                              
                            )}
                            </div>
          </DialogContent>
        </Dialog>
          </>
        )}                   
      </main>
    </div>
  );
};

export default AdminDashboard;