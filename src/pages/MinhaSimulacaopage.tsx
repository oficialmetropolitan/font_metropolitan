import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes de UI
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Certifique-se de ter o Badge do Shadcn
import { Loader2, ArrowLeft, AlertCircle, Info } from 'lucide-react';
import api from "@/services/http/axios";
import Header from '@/components/Header';


const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { label: string, class: string }> = {
    pendente: { label: "Pendente", class: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200" },
    em_analise: { label: "Em Análise", class: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200" },
    aprovado: { label: "Aprovado", class: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" },
    reprovado: { label: "Recusado", class: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200" },
  };

  const { label, class: className } = config[status?.toLowerCase()] || config.pendente;

  return (
    <Badge variant="outline" className={`${className} font-semibold`}>
      {label}
    </Badge>
  );
};

interface Simulation {
  id: string;
  valor_desejado: number;
  prazo_meses: number;
  tipo_emprestimo: string;
  motivo_emprestimo: string;
  valor_parcela: number;
  status: string; // <-- ADICIONADO: Campo vindo do Backend
  criado_em: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

const formatDate = (dateString: string) => {
  if (!dateString) return "---";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

const MySimulationsPage = () => {
  const navigate = useNavigate();
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Sessão expirada. Por favor, faça login novamente.");
          return;
        }

       const response = await api.get("/api/simulacoes/me", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
        setSimulations(Array.isArray(response.data) ? response.data : []);
      } catch (err: any) {
        setError("Não foi possível carregar suas simulações.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSimulations();
  }, []);

  const renderContent = () => {
    if (isLoading) return (
      <div className="flex flex-col items-center py-20"><Loader2 className="h-10 w-10 animate-spin text-primary mb-4" /></div>
    );

    if (error) return (
      <div className="text-center p-10 bg-red-50 text-red-700 rounded-lg"><AlertCircle className="mx-auto h-12 w-12 mb-2"/><p>{error}</p></div>
    );

    if (simulations.length === 0) return (
      <div className="text-center p-10 bg-gray-50 rounded-lg">
        <Info className="mx-auto h-12 w-12 text-gray-400 mb-2"/>
        <p className="text-lg font-medium text-gray-600">Você ainda não possui simulações.</p>
        <Button onClick={() => navigate('/')} className="mt-4">Começar Simulação</Button>
      </div>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {simulations.map((sim) => (
          <Card key={sim.id} className="overflow-hidden border-2 hover:border-primary/20 transition-all">
            <CardHeader className="bg-gray-50/50 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl capitalize">{sim.tipo_emprestimo.replace(/_/g, ' ')}</CardTitle>
                  <CardDescription>Realizada em {formatDate(sim.criado_em)}</CardDescription>
                </div>
                {/* TAG DE STATUS INTEGRADA AQUI */}
                <StatusBadge status={sim.status} />
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Valor do Crédito</p>
                  <p className="text-lg font-bold text-primary">{formatCurrency(sim.valor_desejado)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Parcelamento</p>
                  <p className="text-lg font-semibold">{sim.prazo_meses} meses</p>
                </div>
              </div>

              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs text-primary font-bold uppercase">Mensalidade Estimada</p>
                <p className="text-xl font-black text-primary">{formatCurrency(sim.valor_parcela)}</p>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Motivo</p>
                <p className="text-sm italic text-gray-600">"{sim.motivo_emprestimo}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Minhas Simulações</h1>
            <p className="text-muted-foreground">Acompanhe o status das suas solicitações de crédito em tempo real.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/')} className="w-fit">
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao Início
          </Button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default MySimulationsPage;