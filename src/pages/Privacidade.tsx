// src/pages/PrivacidadePage.tsx

import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  Database,
  Target,
  Share2,
  UserCheck,
  Cookie,
  FileClock,
  ChevronRight,
  Info,
  MapPin
} from "lucide-react";

const PrivacidadePage = () => {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        {/* --- Cabeçalho da Página --- */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-dark">
            Política de Privacidade
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Metropolitan Securitizadora S.A.
          </p>
          <p className="text-sm text-gray-400">
            Última atualização: 24 de Maio de 2024
          </p>
        </div>

        <Card className="border-gray-200 shadow-sm overflow-hidden">
          {/* Faixa de Identificação da Empresa */}
          <div className="bg-navy-dark p-6 text-white flex flex-col md:flex-row gap-4 items-center justify-between text-sm">
             <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span>Sede: Rua Alvarina Frota, 55 - Santa Luiza, Varginha - MG.</span>
             </div>
             <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-accent" />
                <span>CNPJ: 47.430.801/0001-50</span>
             </div>
          </div>

          <CardContent className="p-8 md:p-10 text-gray-700 space-y-10">
            
            <p className="text-base leading-relaxed border-l-4 border-primary pl-4 bg-gray-50 py-2">
              Esta política aplica-se ao site e serviços da <strong>Metropolitan</strong>. Atuamos como securitizadora e provedora de serviços comerciais de crédito, tratando seus dados com transparência e segurança "COMO ESTÃO", conforme a Lei Geral de Proteção de Dados (LGPD).
            </p>

            {/* --- Seção 1: Coleta de Dados --- */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-navy-dark flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                1. Coleta e Uso de Informações
              </h2>
              <div className="grid gap-4 text-sm md:text-base">
                <p>Coletamos informações essenciais para a prestação de nossos serviços, incluindo:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
                   <li className="flex items-center gap-2 text-gray-600"><ChevronRight className="h-4 w-4 text-primary" /> Endereço IP e Protocolos</li>
                   <li className="flex items-center gap-2 text-gray-600"><ChevronRight className="h-4 w-4 text-primary" /> Geolocalização aproximada</li>
                   <li className="flex items-center gap-2 text-gray-600"><ChevronRight className="h-4 w-4 text-primary" /> Dados do dispositivo e OS</li>
                   <li className="flex items-center gap-2 text-gray-600"><ChevronRight className="h-4 w-4 text-primary" /> Nome, CPF, RG e Endereço</li>
                   <li className="flex items-center gap-2 text-gray-600"><ChevronRight className="h-4 w-4 text-primary" /> Fotos de documentos e biometria facial</li>
                </ul>
              </div>
            </div>

            {/* --- Seção 2: Finalidade do Tratamento --- */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-navy-dark flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                2. Utilização dos Dados Pessoais
              </h2>
              <p className="text-sm">Utilizamos seus dados para finalidades legítimas do setor financeiro:</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm bg-gray-50 p-6 rounded-xl">
                 <ul className="space-y-2">
                    <li className="flex items-start gap-2">✔ Identificação e autenticação</li>
                    <li className="flex items-start gap-2">✔ Consultas no SCR e Bureau de Crédito</li>
                    <li className="flex items-start gap-2">✔ Análise de risco e concessão de crédito</li>
                    <li className="flex items-start gap-2">✔ Verificação de garantias e recebíveis</li>
                 </ul>
                 <ul className="space-y-2">
                    <li className="flex items-start gap-2">✔ Prevenção à lavagem de dinheiro</li>
                    <li className="flex items-start gap-2">✔ Cumprimento de obrigações do Banco Central</li>
                    <li className="flex items-start gap-2">✔ Comunicação via WhatsApp, E-mail e SMS</li>
                    <li className="flex items-start gap-2">✔ Combate a fraudes e crimes financeiros</li>
                 </ul>
              </div>
            </div>

            {/* --- Seção 3: Acesso de Terceiros --- */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-navy-dark flex items-center gap-3">
                <Share2 className="h-6 w-6 text-primary" />
                3. Acesso de Terceiros e Compartilhamento
              </h2>
              <p className="leading-relaxed">
                Apenas dados necessários são compartilhados com parceiros estratégicos para viabilizar seu crédito, como Instituições Financeiras emissoras, empresas de análise de risco, Google Analytics para métricas e órgãos governamentais quando exigido por lei.
              </p>
            </div>

            {/* --- Seção 4: Direitos do Titular --- */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-navy-dark flex items-center gap-3">
                <UserCheck className="h-6 w-6 text-primary" />
                4. Seus Direitos (LGPD)
              </h2>
              <p className="text-sm">Você possui o direito de:</p>
              <ul className="list-none space-y-2 pl-4 text-sm">
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-primary mt-1" /> Confirmar tratamento e acessar seus dados;</li>
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-primary mt-1" /> Corrigir dados incompletos ou inexatos;</li>
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-primary mt-1" /> Solicitar anonimização ou exclusão (salvo obrigações legais de retenção);</li>
                <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-primary mt-1" /> Revogar o consentimento a qualquer momento.</li>
              </ul>
            </div>

            {/* --- Seção 5: Retenção e Exclusão --- */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-navy-dark flex items-center gap-3">
                <FileClock className="h-6 w-6 text-primary" />
                5. Retenção de Dados
              </h2>
              <p className="leading-relaxed">
                Reteremos seus dados enquanto você for nosso cliente e pelo período exigido por lei para fins de auditoria e cumprimento de normas do Banco Central. Para solicitações de exclusão, entre em contato via <a href="mailto:gestao@bancometropolitan.com.br" className="text-primary font-medium hover:underline">gestao@bancometropolitan.com.br</a>.
              </p>
            </div>

            {/* --- Seção 6: Segurança --- */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-navy-dark flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-primary" />
                6. Segurança da Informação
              </h2>
              <p className="leading-relaxed">
                Adotamos salvaguardas físicas, eletrônicas e processuais de padrão bancário para proteger a confidencialidade das suas informações e prevenir acessos não autorizados.
              </p>
            </div>

            {/* --- Rodapé Interno --- */}
            <div className="pt-8 border-t border-gray-100 text-[11px] text-gray-400 text-center uppercase tracking-widest">
              Aprovado pela Diretoria da Metropolitan Securitizadora S.A.
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacidadePage;