// src/pages/TermodeUsoPage.tsx (VERSÃO MELHORADA)

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const TermodeUsoPage = () => {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        {/* --- Cabeçalho da Página --- */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Termos de Uso
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Última atualização: 10 de setembro de 2025
          </p>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-8 md:p-10">
            <Accordion type="single" collapsible className="w-full">
              
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-left">
                  1. Propriedade e Aceitação
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 leading-relaxed pt-2">
                  Este site pertence à Metropolitan SCD, inscrita no CNPJ sob o nº 56.953.476/0001-00, autorizada pelo Banco Central do Brasil a atuar como Sociedade de Crédito Direto (SCD). O acesso e a utilização deste site implicam na aceitação integral e irrestrita destes Termos de Uso. Caso o usuário não concorde com qualquer disposição, deverá abster-se de utilizar o site.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-left">
                  2. Objeto do Site
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 leading-relaxed pt-2">
                  O objetivo deste site é disponibilizar informações sobre produtos e serviços financeiros, incluindo concessão de crédito, simulações, análise de perfil, atendimento online e demais operações relacionadas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold text-left">
                  3. Obrigações do Usuário
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 leading-relaxed pt-2">
                  O usuário compromete-se a utilizar o site de forma lícita, fornecendo apenas informações verdadeiras, completas e atualizadas. É vedada a prática de atos que possam comprometer a segurança do ambiente, violar direitos da Metropolitan SCD ou de terceiros, ou ainda utilizar o site para fins ilícitos ou fraudulentos.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold text-left">
                  4. Responsabilidades e Limitações
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 leading-relaxed pt-2">
                  O usuário é responsável pela confidencialidade de seus dados de acesso, quando aplicável, e por qualquer ação realizada em seu nome. A Metropolitan SCD não se responsabiliza por indisponibilidades temporárias do site decorrentes de fatores técnicos, manutenção ou força maior.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold text-left">
                  5. Alterações nos Termos
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 leading-relaxed pt-2">
                  A Metropolitan SCD poderá alterar estes Termos a qualquer momento, mediante publicação atualizada neste site. O uso continuado do site após as alterações implica na aceitação das novas condições.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b-0">
                <AccordionTrigger className="text-lg font-semibold text-left">
                  6. Legislação e Foro
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 leading-relaxed pt-2">
                  O foro eleito para dirimir quaisquer controvérsias decorrentes destes Termos será o da comarca da sede da Metropolitan SCD, com exclusão de qualquer outro, por mais privilegiado que seja.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </CardContent>
        </Card>

        {/* --- Seção de Contato (Call to Action) --- */}
        <div className="text-center mt-12 p-8 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Ainda tem dúvidas?</h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Nossa equipe está pronta para ajudar. Entre em contato conosco para esclarecer qualquer ponto sobre nossos Termos de Uso.
          </p>
          <Button asChild className="mt-6">
            <Link to="/contato">Fale Conosco</Link>
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default TermodeUsoPage;