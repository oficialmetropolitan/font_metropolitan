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
import { Card } from "@/components/ui/card";
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
  Landmark
} from "lucide-react";
import Header from "@/components/Header";

/* =======================
   DETALHES DA SIMULAÇÃO
======================= */
const DetalhesEspecificos = ({ sim, usuario }) => {
  const dados = sim.dados_especificos?.entrada || {};

  if (!sim.tipo_emprestimo) return null;

  return (
    <div className="space-y-6">
      {/* DADOS DO USUÁRIO */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm uppercase text-blue-600 flex items-center gap-2">
          <User size={16} /> Informações do Proponente
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/30 p-4 rounded-xl border border-blue-100">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Nome</p>
            <p className="text-sm font-semibold">
              {usuario?.full_name || dados.full_name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">CPF</p>
            <p className="text-sm font-semibold">
              {usuario?.cpf || "Não informado"}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">E-mail</p>
            <p className="text-sm font-semibold">
              {usuario?.email || dados.email || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Telefone</p>
            <p className="text-sm font-semibold">
              {usuario?.phone || dados.phone || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* GARANTIAS */}
      <div className="space-y-3 border-t pt-4">
        <h4 className="font-bold text-sm uppercase text-gray-600 flex items-center gap-2">
          <Landmark size={16} /> Detalhes da Garantia
        </h4>

        <div className="bg-gray-50 p-4 rounded-xl border text-sm">
          {sim.tipo_emprestimo === "imovel-garantia" && (
            <div className="space-y-1 border-t pt-4 mt-4">
              <p className="font-bold text-xs text-blue-600 uppercase mb-2">
                Garantia Imobiliária
              </p>
              <p><strong>Tipo:</strong> {dados.imovel_tipo || "N/A"}</p>
              <p><strong>Valor:</strong> {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(dados.valor_imovel || 0)}</p>
              <p><strong>CEP:</strong> {dados.imovel_cep || "N/A"}</p>
              <p><strong>Proprietário:</strong> {dados.imovel_proprietario || "N/A"}</p>
              <p><strong>Matrícula:</strong> {dados.imovel_matricula || "N/A"}</p>
            </div>
          )}

          {sim.tipo_emprestimo === "veiculo-garantia" && (
            <div className="space-y-1 border-t pt-4 mt-4">
              <p className="font-bold text-xs text-orange-600 uppercase mb-2">
                Garantia Veicular
              </p>
              <p><strong>Veículo:</strong> {dados.veiculo_marca} {dados.veiculo_modelo}</p>
              <p><strong>Ano:</strong> {dados.veiculo_ano}</p>
              <p><strong>Placa:</strong> {dados.veiculo_placa}</p>
              <p><strong>FIPE:</strong> {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(dados.veiculo_valor_fipe || 0)}</p>
            </div>
          )}

          {!sim.tipo_emprestimo.includes("garantia") && (
            <p className="italic text-gray-500">Sem garantias informadas.</p>
          )}
        </div>
      </div>
    </div>
  );
};


const AdminDashboard = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [taxaEdit, setTaxaEdit] = useState("");
  const [valoresAjustados, setValoresAjustados] = useState(null);
  const [isSavingAjuste, setIsSavingAjuste] = useState(false);
  const [perfilData, setPerfilData] = useState(null);
  
  const carregarUsuario = async (userId) => {
    if (usuarios[userId]) return;

    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`api/usersadmin/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsuarios((prev) => ({ ...prev, [userId]: res.data }));
    } catch {
      toast.error("Erro ao carregar usuário.");
    }
  };

  const carregarDados = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/simulacoes/admin/todas", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSolicitacoes(res.data);
    } catch {
      toast.error("Erro ao carregar propostas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarDados(); }, []);

  const filtrados = solicitacoes.filter(
    (s) =>
      s.tipo_emprestimo.toLowerCase().includes(busca.toLowerCase()) ||
      s.id.toString().includes(busca)
  );

  const formatarMoeda = (v) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <main className="container mx-auto py-10 px-4">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Gestão de Propostas</h1>
          <Button onClick={carregarDados} variant="outline">
            <RefreshCcw className={loading ? "animate-spin" : ""} size={16} />
          </Button>
        </div>

        <Input
          placeholder="Buscar por ID ou tipo"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="mb-6"
        />

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtrados.map((sim) => (
                <TableRow key={sim.id}>
                  <TableCell>#{sim.id}</TableCell>
                  <TableCell>{sim.tipo_emprestimo}</TableCell>
                  <TableCell>{formatarMoeda(sim.valor_desejado)}</TableCell>
                  <TableCell><StatusBadge status={sim.status} /></TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          onClick={() => carregarUsuario(sim.user_id)}
                        >
                          <Eye size={16} />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Dossiê #{sim.id}</DialogTitle>
                          <DialogDescription>Análise completa</DialogDescription>
                        </DialogHeader>

                        <DetalhesEspecificos
                          sim={sim}
                          usuario={usuarios[sim.user_id]}
                        />
                      </DialogContent>
                    </Dialog>
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
