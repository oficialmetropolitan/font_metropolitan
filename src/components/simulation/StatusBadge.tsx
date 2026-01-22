// src/components/simulation/StatusBadge.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Utilitário padrão do Shadcn para classes

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  // Padronizamos para minúsculo para evitar erros de comparação
  const s = status?.toLowerCase() || "pendente";

  // Configuração de cores e nomes baseada no status
  const config: Record<string, { label: string; style: string }> = {
    pendente: { 
      label: "Pendente", 
      style: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200" 
    },
    em_analise: { 
      label: "Em Análise", 
      style: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200" 
    },
    aprovado: { 
      label: "Aprovado", 
      style: "bg-green-100 text-green-700 hover:bg-green- green-100 border-green-200" 
    },
    reprovado: { 
      label: "Recusado", 
      style: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200" 
    },
  };

  const { label, style } = config[s] || config.pendente;

  return (
    <Badge 
      variant="outline" 
      className={cn("font-semibold capitalize px-2.5 py-0.5", style, className)}
    >
      {label}
    </Badge>
  );
};