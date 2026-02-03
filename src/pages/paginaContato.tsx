import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MessageSquare, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion"; // Opcional para animação suave

const PaginaContato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, assunto: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.bancometropolitan.com.br/contact/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao enviar mensagem.");

      toast({
        title: "Solicitação Recebida ✅",
        description: "Um de nossos consultores entrará em contato em breve.",
        className: "bg-navy-dark text-white border-none",
      });

      setFormData({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
    } catch (error) {
      toast({
        title: "Erro na Conexão ❌",
        description: "Não foi possível processar sua solicitação agora.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC]">
      <Header />

      {/* --- Header de Alto Padrão --- */}
      <section className="bg-[#10161E] pt-24 pb-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
        <div className="container-custom relative z-10 text-center space-y-4">
          <span className="text-accent font-bold tracking-[0.4em] text-[10px] uppercase text-white ">Contact & Concierge</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
            Como podemos <br /><span className="text-gray-400 font-light italic">auxiliar sua jornada?</span>
          </h1>
        </div>
      </section>

      <div className="container-custom -mt-24 pb-24 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* --- Coluna de Informações (Esquerda) --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-10 rounded-[32px] shadow-xl border border-gray-100 space-y-10">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-navy-dark tracking-tight">Canais Diretos</h2>
                <p className="text-sm text-gray-400">Atendimento consultivo e personalizado.</p>
              </div>

              <div className="space-y-8">
                <a href="tel:+553597499220" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Telefone Institucional</p>
                    <p className="text-navy-dark font-semibold group-hover:text-primary transition-colors">(35) 9749-9220</p>
                  </div>
                </a>

                <a href="https://wa.me/553597499220" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp Business</p>
                    <p className="text-navy-dark font-semibold group-hover:text-green-600 transition-colors">Iniciar conversa digital</p>
                  </div>
                </a>

                <a href="mailto:gestao@metropolitanscd.com.br" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-navy-dark group-hover:text-white transition-all duration-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">E-mail Corporativo</p>
                    <p className="text-navy-dark font-semibold group-hover:text-primary transition-colors text-sm">gestao@metropolitanscd.com.br</p>
                  </div>
                </a>
              </div>

              <div className="pt-8 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Seg a Sex: 08h às 18h</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Operação Auditada e Segura</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- Coluna do Formulário (Direita) --- */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-16 rounded-[32px] shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>

              <div className="relative z-10">
                <div className="mb-10 space-y-2">
                  <h2 className="text-3xl font-bold text-navy-dark tracking-tight">Envie uma mensagem</h2>
                  <p className="text-gray-500 font-light">Preencha os campos abaixo e um de nossos especialistas entrará em contato.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-xs font-bold uppercase tracking-widest text-gray-400">Nome Completo</Label>
                      <Input id="nome" required onChange={handleChange} value={formData.nome} className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg" placeholder="Como devemos lhe chamar?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400">E-mail Profissional</Label>
                      <Input id="email" type="email" required onChange={handleChange} value={formData.email} className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg" placeholder="exemplo@empresa.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="text-xs font-bold uppercase tracking-widest text-gray-400">Telefone / WhatsApp</Label>
                      <Input id="telefone" type="tel" onChange={handleChange} value={formData.telefone} className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg" placeholder="(00) 00000-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assunto" className="text-xs font-bold uppercase tracking-widest text-gray-400">Assunto</Label>
                      <Select onValueChange={handleSelectChange} value={formData.assunto} required>
                        <SelectTrigger className="border-0 border-b border-gray-200 rounded-none px-0 focus:ring-0 text-lg">
                          <SelectValue placeholder="Selecione o motivo" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100 shadow-2xl">
                          <SelectItem value="duvidas">Dúvidas Estruturais</SelectItem>
                          <SelectItem value="parcerias">Novas Parcerias</SelectItem>
                          <SelectItem value="ouvidoria">Ouvidoria e Ética</SelectItem>
                          <SelectItem value="outros">Outros Assuntos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-widest text-gray-400">Mensagem</Label>
                    <Textarea id="mensagem" required onChange={handleChange} value={formData.mensagem} className="border-gray-100 rounded-2xl p-4 focus-visible:ring-primary focus-visible:border-primary min-h-[150px] bg-gray-50/50" placeholder="Descreva brevemente sua necessidade..." />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full md:w-auto bg-navy-dark hover:bg-primary text-white px-12 py-8 rounded-full font-bold tracking-[0.2em] text-xs transition-all duration-500 shadow-xl">
                      ENVIAR SOLICITAÇÃO <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaContato;