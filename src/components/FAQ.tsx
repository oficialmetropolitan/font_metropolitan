import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom"; // 1. Importe o componente Link

const FAQ = () => {
  const faqs = [
    {
      question: "Quem é a Metropolitan?",
      category: "A Metropolitan é uma promotora de crédito inovadora que atua como correspondente bancário, facilitando o acesso a diversas soluções financeiras. Nosso objetivo é oferecer um serviço transparente, ágil e seguro para pessoas físicas e jurídicas em todo o Brasil."
    },
    {
      question: "Vocês atendem a todo o Brasil?",
      category: "Sim! Nossa plataforma é 100% digital, o que nos permite atender clientes de todas as regiões do Brasil com a mesma eficiência e qualidade, sem a necessidade de deslocamento a uma agência física."
    },
    {
      question: "Como funciona o empréstimo com garantia de imóvel?",
      category: "O empréstimo com garantia de imóvel, também conhecido como Home Equity, permite que você utilize seu imóvel quitado como garantia para obter crédito com taxas de juros mais baixas e prazos de pagamento mais longos. O imóvel continua sendo seu e você pode usar o dinheiro como quiser."
    },
    {
      question: "Qual a taxa de juros?",
      category: "As taxas de juros variam de acordo com o produto de crédito escolhido, o valor solicitado, o prazo de pagamento e a análise de crédito do seu perfil. Nosso compromisso é buscar sempre as condições mais competitivas e transparentes para você.",
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">
              Ajuda
            </h2>
            <p className="text-lg text-gray-600">
              Tire suas dúvidas sobre nossos produtos e serviços
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {faqs.map((faq, index) => (
              // 2. Adicione o Link envolvendo cada card
              <Link to="/ajuda" key={index}>
                <div 
                  className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer h-full"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-navy-dark group-hover:text-primary transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {faq.category}
                      </p>
                    </div>
                    <div className="text-gray-400 group-hover:text-primary transition-colors">
                      * * *
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            {/* 3. Adicione o Link envolvendo o botão */}
            <Link to="/ajuda">
              <Button variant="outline" className="btn-secondary mb-6">
                Ver todas as respostas
              </Button>
            </Link>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Não encontrou o que procurava?
              </p><br></br>
 <Link to="/contato">
    <Button className="btn-primary group">
        <MessageCircle className="mr-2 h-4 w-4" />
        Fale com a gente
    </Button>
</Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;