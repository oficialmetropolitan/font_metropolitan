import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "Quem é a Metropolitan?",
      answer: "Uma securitizadora de ativos financeiros focada em estruturar soluções de crédito inteligentes, utilizando tecnologia e parcerias bancárias para oferecer agilidade e taxas competitivas."
    },
    {
      question: "Atendimento em todo o território nacional?",
      answer: "Sim. Nossa operação é integralmente digital, permitindo que clientes de qualquer região do Brasil acessem nossas soluções com a mesma eficiência e segurança jurídica."
    },
    {
      question: "O diferencial do Home Equity?",
      answer: "O crédito com garantia de imóvel permite as menores taxas do mercado e prazos estendidos. O bem permanece em seu nome, servindo apenas como lastro para uma operação de baixo custo."
    },
    {
      question: "Transparência nas taxas de juros?",
      answer: "Nossas taxas são personalizadas conforme a análise de risco e o perfil de cada operação, garantindo que você tenha acesso à estrutura de custos mais eficiente para seu projeto."
    }
  ];

  return (
    <section className="py-24 bg-[#F8F9FA] relative overflow-hidden">
      {/* Detalhe de luxo: Linhas de fundo sutis */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 border-b border-gray-200 pb-12">
            <div className="text-left space-y-2">
              <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Suporte Exclusivo</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-navy-dark tracking-tighter">
                Dúvidas <span className="text-gray-400 font-light">Frequentes</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed font-light italic">
              "Transparência é o pilar que sustenta nossa relação com o mercado de capitais e nossos clientes."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mb-16">
            {faqs.map((faq, index) => (
               <a  href="/ajuda" key={index} className="group">
                <div className="space-y-4 p-2 transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 group-hover:border-primary transition-colors">
                    <h3 className="font-bold text-lg text-navy-dark group-hover:text-primary transition-colors pr-4">
                      {faq.question}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {faq.answer}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-12">
             <a  href="/ajuda">
              <Button variant="ghost" className="text-navy-dark font-bold hover:bg-transparent hover:text-primary p-0 flex items-center gap-2 group">
                CENTRAL DE AJUDA COMPLETA 
                <span className="w-8 h-8 rounded-full bg-navy-dark text-white flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ChevronRight className="h-4 w-4" />
                </span>
              </Button>
            </a>
            
            <div className="w-full max-w-3xl bg-navy-dark rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
              {/* Efeito de luz no card de contato */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">Ainda precisa de consultoria?</h3>
                <p className="text-gray-400 max-w-lg mx-auto font-light">
                  Nossos especialistas em estruturação de crédito estão à disposição para um atendimento humanizado e personalizado.
                </p>
                <div className="pt-4">
                 <a  href="/contato">
                    <Button className="bg-primary hover:bg-white hover:text-navy-dark text-white px-8 py-7 rounded-full text-sm font-bold tracking-widest transition-all duration-500 shadow-xl">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      FALAR COM UM ESPECIALISTA
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;