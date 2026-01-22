import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from "@/components/ui/use-toast";


const PaginaContato = () => {
  // Estados para controlar os valores do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });

  const { toast } = useToast();
  // Função para atualizar o estado quando o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  // Função para lidar com a mudança do Select
  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, assunto: value }));
  };

  // Função para o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/contact/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem.");
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      toast({
      title: "Mensagem enviada ✅",
      description: "Recebemos seu contato e responderemos em breve.",
      className: "bg-green-100 border-green-400 text-green-800",
    });

      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
      });
    } catch (error) {
      console.error("Erro:", error);
      toast({
      title: "Erro ao enviar ❌",
      description: "Verifique sua conexão e tente novamente.",
      variant: "destructive",
    });
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white py-16 sm:py-24">
        <div className="container-custom">
          {/* --- Cabeçalho --- */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-dark">
              Fale com a gente
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Tem alguma dúvida ou sugestão? Preencha o formulário abaixo ou entre em contato por um de nossos canais.
            </p>
          </div>

          {/* --- Layout de Duas Colunas --- */}
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Coluna da Esquerda: Informações de Contato */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-navy-dark mb-6">Nossos Canais</h2>
              <div className="space-y-6">
                <a href="tel:+553597499220" className="flex items-center gap-4 group">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">Telefone</h3>
                    <p className="text-gray-600 group-hover:text-primary transition-colors">(35) 9749-9220</p>
                  </div>
                </a>
                <a href="https://wa.me/553597499220" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">WhatsApp</h3>
                    <p className="text-gray-600 group-hover:text-primary transition-colors">Clique para iniciar uma conversa</p>
                  </div>
                </a>
                <a href="mailto:gestao@bancometropolitan.com.br" className="flex items-center gap-4 group">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">E-mail</h3>
                    <p className="text-gray-600 group-hover:text-primary transition-colors">gestao@bancometropolitan.com.br</p>
                  </div>
                </a>
              </div>
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold text-gray-800">Horário de Atendimento</h3>
                <p className="text-gray-600">Segunda a Sexta, das 08h às 18h.</p>
              </div>
            </div>

            {/* Coluna da Direita: Formulário */}
            <div className="p-8 border rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="nome" className="font-semibold">Nome Completo</Label>
                  <Input id="nome" type="text" placeholder="Seu nome completo" required onChange={handleChange} value={formData.nome} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-semibold">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" required onChange={handleChange} value={formData.email} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="telefone" className="font-semibold">Telefone</Label>
                  <Input id="telefone" type="tel" placeholder="(XX) XXXXX-XXXX" onChange={handleChange} value={formData.telefone} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="assunto" className="font-semibold">Assunto</Label>
                  <Select onValueChange={handleSelectChange} value={formData.assunto} required>
                    <SelectTrigger id="assunto" className="w-full mt-2">
                      <SelectValue placeholder="Selecione o motivo do contato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duvidas">Dúvidas Gerais</SelectItem>
                      <SelectItem value="suporte">Suporte Técnico</SelectItem>
                      <SelectItem value="parcerias">Proposta de Parceria</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mensagem" className="font-semibold">Sua Mensagem</Label>
                  <Textarea id="mensagem" placeholder="Digite sua mensagem aqui..." required onChange={handleChange} value={formData.mensagem} className="mt-2" rows={5} />
                </div>
                <Button type="submit" className="w-full btn-primary">
                  Enviar Mensagem
                </Button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginaContato;
