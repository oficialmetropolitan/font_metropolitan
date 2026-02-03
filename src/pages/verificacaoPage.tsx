// src/pages/VerificacaoPage.tsx

import { useState, useEffect } from 'react'; // Adicione useEffect
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import axios from 'axios'; // Usando axios para consistência

const VerificacaoPage = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // NOVO: Estado para o temporizador de 40 segundos
  const [countdown, setCountdown] = useState(40);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  // NOVO: useEffect para controlar o temporizador
  useEffect(() => {
    // Se o contador chegar a 0, para de contar.
    if (countdown <= 0) return;

    // Cria um intervalo que diminui o contador a cada segundo.
    const timerId = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado ou o contador mudar.
    // Isso é muito importante para evitar vazamentos de memória.
    return () => clearInterval(timerId);
  }, [countdown]); // Este efeito roda sempre que o 'countdown' mudar.


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.bancometropolitan.com.br';
      const response = await axios.post(`${apiUrl}/api/auth/verify`, { email, code });

      toast.success("E-mail verificado com sucesso!");
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Falha na verificação: ${error.response.data.detail || 'Tente novamente.'}`);
      } else {
        toast.error("Erro de conexão. Tente novamente.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // NOVO: Função para lidar com o reenvio do código
  const handleResend = async () => {
    setIsResending(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.bancometropolitan.com.br';
      await axios.post(`${apiUrl}/api/auth/resend-verification`, { email });

      toast.success("Um novo código foi enviado para o seu e-mail.");
      // Reinicia o temporizador
      setCountdown(40);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Falha ao reenviar: ${error.response.data.detail || 'Tente novamente.'}`);
      } else {
        toast.error("Erro de conexão. Tente novamente.");
      }
    } finally {
      setIsResending(false);
    }
  };


  if (!email) {
    navigate('/cadastro');
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verifique seu E-mail</h1>
          <p className="text-gray-600 mt-2">
            Enviamos um código de 6 dígitos para <span className="font-medium">{email}</span>.
            Por favor, insira-o abaixo.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="code">Código de Verificação</Label>
            <Input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              required
              className="mt-2 text-center text-lg tracking-[8px]"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isVerifying}>
            {isVerifying ? <Loader2 className="animate-spin" /> : 'Verificar Conta'}
          </Button>
        </form>

        {/* --- NOVO: Botão de Reenviar Código --- */}
        <div className="text-center text-sm">
          <p className="text-muted-foreground">Não recebeu o código?</p>
          <Button
            type="button"
            variant="link"
            className="font-medium p-0 h-auto"
            onClick={handleResend}
            disabled={countdown > 0 || isResending} // Desabilita durante a contagem ou o reenvio
          >
            {isResending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              countdown > 0 ? `Reenviar em ${countdown}s` : 'Reenviar código'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificacaoPage;