import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import Header from "@/components/Header";
import { Link } from "react-router-dom";

// --- Dados das Perguntas e Respostas ---
// Você pode facilmente adicionar ou remover perguntas aqui
const faqData = [
  {
    category: "Sobre a empresa",
    questions: [
      {
        question: "Quem é a Metropolitan?",
        answer: "A Metropolitan é uma promotora de crédito inovadora que atua como correspondente bancário, facilitando o acesso a diversas soluções financeiras. Nosso objetivo é oferecer um serviço transparente, ágil e seguro para pessoas físicas e jurídicas em todo o Brasil.",
      },
      {
        question: "Vocês são um banco?",
        answer: "Não, a Metropolitan não é um banco. Somos um correspondente bancário autorizado, o que significa que atuamos como intermediários entre você e as principais instituições financeiras do país, oferecendo as melhores condições de crédito disponíveis no mercado.",
      },
    ],
  },
  {
    category: "Atendimento",
    questions: [
      {
        question: "Vocês atendem a todo o Brasil?",
        answer: "Sim! Nossa plataforma é 100% digital, o que nos permite atender clientes de todas as regiões do Brasil com a mesma eficiência e qualidade, sem a necessidade de deslocamento a uma agência física.",
      },
      {
        question: "Qual o horário de atendimento?",
        answer: "Nosso atendimento online está disponível de segunda a sexta-feira, das 8h às 18h. Você pode entrar em contato conosco através do nosso chat, e-mail ou telefone.",
      },
    ],
  },
  {
    category: "Produtos",
    questions: [
      {
        question: "Como funciona o empréstimo com garantia de imóvel?",
        answer: "O empréstimo com garantia de imóvel, também conhecido como Home Equity, permite que você utilize seu imóvel quitado como garantia para obter crédito com taxas de juros mais baixas e prazos de pagamento mais longos. O imóvel continua sendo seu e você pode usar o dinheiro como quiser.",
      },
    ],
  },
  {
    category: "Condições",
    questions: [
      {
        question: "Qual a taxa de juros?",
        answer: "As taxas de juros variam de acordo com o produto de crédito escolhido, o valor solicitado, o prazo de pagamento e a análise de crédito do seu perfil. Nosso compromisso é buscar sempre as condições mais competitivas e transparentes para você.",
      },
      {
        question: "Preciso pagar algum valor antecipado?",
        answer: "Não! A Metropolitan não solicita nenhum tipo de depósito ou pagamento antecipado para a análise ou liberação do seu crédito. Essa é uma prática ilegal. Fique atento a golpes!",
      },
    ],
  },
];


const PaginaAjuda = () => {
  return (
    <>
    <Header />
    <div className="bg-white py-16 sm:py-24">
      <div className="container-custom max-w-4xl mx-auto px-4">
        
        {/* --- Cabeçalho da Página --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-accent">
            Central de Ajuda
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Tire suas dúvidas sobre nossos produtos e serviços.
          </p>
        </div>

        {/* --- Seções de Perguntas --- */}
        <div className="space-y-10">
          {faqData.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold text-navy-dark mb-4 border-b pb-2">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((qa, qaIndex) => (
                  <AccordionItem key={qaIndex} value={`item-${index}-${qaIndex}`}>
                    <AccordionTrigger className="text-left text-lg hover:no-underline">
                      {qa.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700">
                      {qa.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* --- Seção de Contato (Call to Action) --- */}
        <div className="text-center mt-16 p-8 bg-gray-50 rounded-lg">
          <h3 className="text-2xl font-semibold text-navy-dark">
            Não encontrou o que procurava?
          </h3>
          <p className="mt-2 text-gray-600">
            Nossa equipe está pronta para te ajudar.
          </p>
           <Link to="/contato">
          <Button className="mt-6 btn-primary">
            Fale com a gente
          </Button>
          </Link>
        </div>
      </div>
    </div></>
  );
};

export default PaginaAjuda;