import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Search, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";

const faqData = [
  {
    category: "Institucional",
    questions: [
      {
        question: "Qual o posicionamento da Metropolitan no mercado?",
        answer: "A Metropolitan opera como uma securitizadora de ativos financeiros de alta performance. Nossa expertise reside na estruturação de operações de crédito robustas, conectando o mercado de capitais a tomadores que buscam eficiência, agilidade e taxas competitivas através de tecnologia proprietária.",
      },
      {
        question: "Qual a relação entre a Metropolitan e as instituições financeiras?",
        answer: "Atuamos em um ecossistema de colaboração. A Metropolitan estrutura a inteligência e o lastro das operações, enquanto a emissão formal do crédito é realizada por instituições financeiras parceiras devidamente autorizadas pelo Banco Central, garantindo total conformidade jurídica e segurança para todas as partes.",
      },
    ],
  },
  {
    category: "Operacional",
    questions: [
      {
        question: "O processo de contratação é integralmente digital?",
        answer: "Sim. Desenvolvemos uma jornada 'Full Digital' que elimina a necessidade de deslocamentos físicos. Desde a simulação até a assinatura do contrato, tudo é realizado em ambiente criptografado, garantindo agilidade sem comprometer o rigor da análise.",
      },
      {
        question: "Como funciona a garantia real no modelo de Securitização?",
        answer: "No Home Equity, por exemplo, o imóvel é utilizado como lastro para a emissão de títulos securitizados. Isso permite que acessemos capital com custo reduzido no mercado, repassando essa economia ao cliente na forma de taxas muito menores que o crédito pessoal convencional.",
      },
    ],
  },
  {
    category: "Segurança e Ética",
    questions: [
      {
        question: "Existe alguma taxa de conveniência ou pagamento antecipado?",
        answer: "Não. Em absoluta conformidade com as diretrizes do Banco Central e as melhores práticas de governança, a Metropolitan nunca solicita depósitos ou taxas antecipadas. Nossa remuneração está estritamente ligada ao sucesso da operação estruturada.",
      },
    ],
  },
];

const PaginaAjuda = () => {
  return (
    <div className="bg-[#FBFBFC] min-h-screen">
      <Header />
      

<section className="bg-[#1a2a40] pt-24 pb-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots)" /></svg>
        </div>
        
        <div className="container-custom max-w-4xl mx-auto px-4 relative z-10 text-center space-y-6">
          <span className="text-accent font-bold tracking-[0.4em] text-[10px] text-white uppercase ">Suporte e Governança</span>
          <h1 className="text-4xl md:text-6xl font-extrabold  tracking-tighter text-white">
            Como podemos <br /><span className="text-gray-400 font-light italic text-gray-400 ">orientar você hoje?</span>
          </h1>
     
        </div>
      </section>

      <div className="container-custom max-w-4xl mx-auto px-4 -mt-10 relative z-20 pb-24">
        
        {/* --- Grid de Categorias --- */}
        <div className="space-y-16">
          {faqData.map((category, index) => (
            <div key={index} className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-10 w-1 bg-primary rounded-full" />
                 <h2 className="text-2xl font-bold text-navy-dark tracking-tight">
                   {category.category}
                 </h2>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {category.questions.map((qa, qaIndex) => (
                  <AccordionItem 
                    key={qaIndex} 
                    value={`item-${index}-${qaIndex}`}
                    className="border border-gray-50 rounded-2xl px-6 transition-all data-[state=open]:border-primary/20 data-[state=open]:bg-blue-50/30"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-navy-dark hover:no-underline hover:text-primary py-6">
                      {qa.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 leading-relaxed pb-6">
                      {qa.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-br from-navy-dark to-[#1a2a40] rounded-[40px] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="relative z-10 space-y-8">
           
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Sua dúvida requer uma <br />análise técnica?
            </h3>
            <p className="text-gray-400 max-w-lg mx-auto font-light text-lg">
              Nossa equipe de estruturação financeira está disponível para reuniões de consultoria personalizada.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato">
                <Button className="bg-primary hover:bg-white hover:text-navy-dark text-white px-10 py-7 rounded-full text-sm font-bold tracking-widest transition-all duration-500">
                  FALAR COM CONSULTOR <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* --- Footer de Segurança --- */}
        <div className="mt-12 flex items-center justify-center gap-3 text-gray-400">
           <ShieldCheck className="h-4 w-4" />
           <span className="text-[10px] uppercase tracking-[0.2em]">Ambiente Seguro e Monitorado | Metropolitan Securitizadora S.A.</span>
        </div>
      </div>
    </div>
  );
};

export default PaginaAjuda;