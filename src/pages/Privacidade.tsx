// src/pages/PrivacidadePage.tsx (VERSÃO MELHORADA)

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Adicione os imports dos ícones que usaremos
import {
  ShieldCheck,
  Database,
  Target,
  Share2,
  UserCheck,
  Cookie,
  FileClock,
  ChevronRight,
} from "lucide-react";

const PrivacidadePage = () => {
  return (
    // Removido o <Header/> daqui pois ele já deve estar no seu layout principal (App.tsx)
    // Se não estiver, pode adicionar de volta.
    <div className="bg-gray-50/50 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        {/* --- Cabeçalho da Página --- */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Política de Privacidade
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Última atualização: 10 de setembro de 2025
          </p>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-8 md:p-10 text-gray-700 space-y-8">
            <p className="text-base leading-relaxed">
              A Metropolitan SCD valoriza a privacidade de seus clientes e usuários e cumpre integralmente a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD).
            </p>

            {/* --- Seção 1: Coleta de Dados --- */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                1. Coleta de Dados
              </h2>
              <p className="leading-relaxed">
                Coletamos informações pessoais fornecidas diretamente pelo usuário, como nome, CPF, telefone, e-mail e dados financeiros, bem como informações de navegação, como cookies, endereço IP e comportamento no site.
              </p>
            </div>

            {/* --- Seção 2: Finalidade do Uso --- */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                2. Finalidade do Uso
              </h2>
              <p className="leading-relaxed">
                Os dados coletados são utilizados para:
              </p>
              <ul className="list-none space-y-2 pl-4">
                <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Realizar análise e concessão de crédito;</span></li>
                <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Cumprir obrigações legais e regulatórias, inclusive junto ao Banco Central do Brasil;</span></li>
                <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Atualizar cadastros;</span></li>
                <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Enviar comunicações relacionadas aos serviços contratados;</span></li>
                <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Prevenir fraudes e garantir a segurança das operações.</span></li>
              </ul>
            </div>
            
            {/* --- Seção 3: Compartilhamento de Dados --- */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <Share2 className="h-6 w-6 text-primary" />
                    3. Compartilhamento de Dados
                </h2>
                <p className="leading-relaxed">
                    Os dados poderão ser compartilhados com:
                </p>
                <ul className="list-none space-y-2 pl-4">
                    <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Órgãos de proteção ao crédito (SPC, Serasa, Boa Vista, entre outros);</span></li>
                    <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Banco Central do Brasil, por meio do Sistema de Informações de Crédito (SCR);</span></li>
                    <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Empresas parceiras e prestadores de serviços que atuem em nome da Metropolitan SCD, como correspondentes bancários, empresas de tecnologia, análise de risco e cobrança.</span></li>
                </ul>
            </div>

            {/* --- Seção 4: Direitos do Usuário --- */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-primary" />
                    4. Direitos do Usuário
                </h2>
                <p className="leading-relaxed">
                    O titular dos dados tem direito a:
                </p>
                <ul className="list-none space-y-2 pl-4">
                    <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Confirmar a existência de tratamento;</span></li>
                    <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Solicitar acesso, correção, exclusão ou portabilidade dos dados;</span></li>
                    <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Revogar o consentimento para uso dos dados, quando aplicável;</span></li>
                    <li className="flex items-start"><ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="ml-2">Solicitar informações sobre o compartilhamento de seus dados.</span></li>
                </ul>
                <p className="pt-2">
                    As solicitações podem ser feitas pelo e-mail: <a href="mailto:contato@metropolitanscd.com" className="text-primary font-medium hover:underline">contato@metropolitanscd.com</a>
                </p>
            </div>
            
            {/* --- Seção 5: Segurança da Informação --- */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    5. Segurança da Informação
                </h2>
                <p className="leading-relaxed">
                    A Metropolitan SCD adota medidas técnicas e administrativas para proteger os dados pessoais contra acessos não autorizados, perdas ou tratamentos inadequados.
                </p>
            </div>
            
            {/* --- Seção 6: Política de Cookies --- */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <Cookie className="h-6 w-6 text-primary" />
                    6. Política de Cookies
                </h2>
                <p className="leading-relaxed">
                    Utilizamos cookies para melhorar a experiência do usuário, personalizar conteúdos e analisar estatísticas de navegação. O usuário pode gerenciar as permissões de cookies diretamente em seu navegador.
                </p>
            </div>
            
            {/* --- Seção 7: Alterações na Política --- */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <FileClock className="h-6 w-6 text-primary" />
                    7. Alterações na Política
                </h2>
                <p className="leading-relaxed">
                    A Metropolitan SCD poderá atualizar esta Política de Privacidade a qualquer momento, mediante publicação neste site.
                </p>
            </div>

          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};

export default PrivacidadePage;