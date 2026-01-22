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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
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
  Save
} from "lucide-react";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  // Estados para edição de juros
  const [taxaEdit, setTaxaEdit] = useState<string>("");
  const [valoresAjustados, setValoresAjustados] = useState<any>(null);
  const [isSavingAjuste, setIsSavingAjuste] = useState(false);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/simulacoes/admin/todas", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSolicitacoes(response.data);
    } catch (error) {
      toast.error("Erro ao carregar solicitações financeiras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarDados(); }, []);

  // --- LÓGICA DE RECALCULO DE JUROS ---
  const calcularNovoCenario = (taxaMensal: number, valorBase: number, meses: number) => {
    if (taxaMensal <= 0 || isNaN(taxaMensal)) {
      setValoresAjustados(null);
      return;
    }
    
    const i = taxaMensal / 100;
    const n = meses;
    
    // Fórmula Price: PMT = PV * i * (1+i)^n / ((1+i)^n - 1)
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
      await api.patch(`/api/simulacoes/admin/${id}/ajustar`, valoresAjustados, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Novas condições salvas com sucesso!");
      setValoresAjustados(null);
      setTaxaEdit("");
      carregarDados();
    } catch (error) {
      toast.error("Erro ao salvar novos valores financeiros.");
    } finally {
      setIsSavingAjuste(false);
    }
  };

  const atualizarStatus = async (id: number, novoStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(`/api/simulacoes/admin/${id}/status`, 
        { status: novoStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Proposta ${novoStatus === 'aprovado' ? 'aprovada' : 'recusada'}!`);
      carregarDados();
    } catch (error) {
      toast.error("Falha ao atualizar status.");
    }
  };

  const filtrados = solicitacoes.filter((item: any) => 
    item.tipo_emprestimo.toLowerCase().includes(busca.toLowerCase()) ||
    item.id.toString().includes(busca)
  );

  const formatarMoeda = (valor: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      <main className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Propostas</h1>
            <p className="text-muted-foreground">Painel administrativo da Metropolitan SCD.</p>
          </div>
          <Button onClick={carregarDados} variant="outline" className="gap-2 shadow-sm">
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Buscar proposta por ID ou tipo..." 
            className="pl-10 bg-white"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <Card className="shadow-sm border-none overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-100/50">
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Crédito</TableHead>
                <TableHead>Valor Original</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20"><Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" /></TableCell>
                </TableRow>
              ) : filtrados.map((sim: any) => (
                <TableRow key={sim.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="font-mono text-xs text-gray-500">#{sim.id}</TableCell>
                  <TableCell>
                    <div className="font-semibold text-gray-900 capitalize">{sim.tipo_emprestimo.replace(/_/g, ' ')}</div>
                    <div className="text-xs text-muted-foreground">{new Date(sim.criado_em).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell className="font-bold">{formatarMoeda(sim.valor_desejado)}</TableCell>
                  <TableCell><StatusBadge status={sim.status} /></TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog onOpenChange={() => { setValoresAjustados(null); setTaxaEdit(""); }}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                          <Eye className="h-4 w-4 mr-1" /> Analisar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <TrendingUp className="text-primary" /> Dossiê de Proposta #{sim.id}
                          </DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                          {/* DADOS ATUAIS */}
                          <div className="space-y-4">
                            <h4 className="font-bold text-sm uppercase text-gray-400 flex items-center gap-2"><User size={16}/> Resumo do Cliente</h4>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2 border">
                              <p className="text-sm"><strong>Finalidade:</strong> {sim.motivo_emprestimo}</p>
                              <p className="text-sm"><strong>Valor:</strong> {formatarMoeda(sim.valor_desejado)}</p>
                              <p className="text-sm"><strong>Prazo Original:</strong> {sim.prazo_meses} meses</p>
                              <p className="text-sm text-primary"><strong>Parcela Atual:</strong> {formatarMoeda(sim.valor_parcela)}</p>
                            </div>
                          </div>

                          {/* AJUSTE DE JUROS */}
                          <div className="space-y-4 bg-primary/5 p-5 rounded-xl border border-primary/20">
                            <h4 className="font-bold text-sm uppercase text-primary flex items-center gap-2"><DollarSign size={16}/> Personalizar Taxas</h4>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase">Nova Taxa Mensal (% ao mês)</label>
                              <Input 
                                type="number" 
                                placeholder="Ex: 1.89" 
                                value={taxaEdit}
                                onChange={(e) => {
                                  setTaxaEdit(e.target.value);
                                  calcularNovoCenario(parseFloat(e.target.value), sim.valor_desejado, sim.prazo_meses);
                                }}
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
                                  onClick={() => salvarAjusteFinanceiro(sim.id)}
                                  disabled={isSavingAjuste}
                                >
                                  {isSavingAjuste ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>}
                                  Salvar e Recalcular
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button size="sm" variant="ghost" className="text-green-600" onClick={() => atualizarStatus(sim.id, "aprovado")} disabled={sim.status === "aprovado"}><Check className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" className="text-red-600" onClick={() => atualizarStatus(sim.id, "reprovado")} disabled={sim.status === "reprovado"}><X className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;