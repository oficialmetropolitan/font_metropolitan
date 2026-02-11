// src/pages/VerificacaoPage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { Loader2, ShieldCheck, ArrowLeft, Mail } from 'lucide-react';
import axios from 'axios';
import { motion } from "framer-motion";

const VerificacaoPage = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(40);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  useEffect(() => {
    if (countdown <= 0) return;
    const timerId = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timerId);
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.bancometropolitan.com.br';
      await axios.post(`${apiUrl}/api/auth/verify`, { email, code });
      toast.success("Identidade confirmada com sucesso!");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.detail || "Código inválido ou expirado.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.bancometropolitan.com.br';
      await axios.post(`${apiUrl}/api/auth/resend-verification`, { email });
      toast.success("Um novo protocolo de segurança foi enviado.");
      setCountdown(40);
    } catch (error) {
      toast.error("Erro ao reenviar. Tente em instantes.");
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    navigate('/cadastro');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FBFBFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Detalhes de Fundo Premium */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-dark/5 rounded-full blur-[120px] -ml-48 -mb-48" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10 shadow-xl/30"
      >
        {/* Botão Voltar Discreto */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-400 hover:text-navy-dark transition-colors mb-8 text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Voltar ao cadastro
        </button>

        <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 p-10 md:p-14 space-y-10">
          
          {/* Header de Segurança */}
         <div className="text-center space-y-6 max-w-sm mx-auto">
  <div className="space-y-2">
    <h1 className="text-3xl font-black text-navy-dark tracking-tight">
      Verificação Digital
    </h1>
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm leading-relaxed">
        Enviamos um código de 6 dígitos para:<br />
        <span className="text-navy-dark font-semibold text-base">{email}</span>
      </p>
      
      <p className="text-xs text-gray-400 font-light leading-snug px-6">
        Não esqueça de conferir sua caixa de spam. Caso o código não chegue em alguns minutos, você poderá solicitar um novo.
      </p>
    </div>
  </div>
</div>

          {/* Formulário de Código */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="relative group">
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  required
                  autoFocus
                  className="h-20 text-center text-4xl font-black tracking-[12px] border-0 border-b-2  border-gray-500 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all bg-transparent placeholder:text-gray"
                  placeholder="000000"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isVerifying || code.length < 6}
              className="w-full h-16 bg-navy-dark hover:bg-primary text-white rounded-2xl font-bold tracking-[0.2em] uppercase text-[10px] transition-all duration-500 shadow-xl shadow-navy-dark/10 disabled:opacity-30"
            >
              {isVerifying ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirmar Identidade'}
            </Button>
          </form>

          {/* Footer de Reenvio */}
          <div className="text-center space-y-4 pt-4 border-t border-gray-50">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Problemas com o recebimento?</p>
            <Button
              type="button"
              variant="ghost"
              className="h-auto p-0 text-primary hover:text-white font-bold text-xs underline underline-offset-4 disabled:no-underline disabled:text-gray-300 transition-all"
              onClick={handleResend}
              disabled={countdown > 0 || isResending}
            >
              {isResending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                countdown > 0 ? `Novo envio disponível em ${countdown}s` : 'Solicitar novo código'
              )}
            </Button>
          </div>
        </div>

        {/* Footer Institucional Sutil */}
        <div className="mt-10 flex items-center justify-center gap-2 opacity-30 grayscale pointer-events-none">
           <div className="h-[1px] w-8 bg-gray-400" />
           <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Metropolitan S.A.</span>
           <div className="h-[1px] w-8 bg-gray-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default VerificacaoPage;