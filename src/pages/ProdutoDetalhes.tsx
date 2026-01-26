// src/pages/ProductDetailPage.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { products, Product } from '@/lib/produtoData'; 
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'; // Adicionado ShieldCheck

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId && products[productId]) {
      setProduct(products[productId]);
    } else if (productId) {
      navigate('/');
    }
  }, [productId, navigate]);

  const handleSimulateClick = () => {
    navigate('/simulacao', { state: { tipo: productId } });
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Carregando...</div>;
  }

  return (
    <>
      <Header />
      <div className="bg-white">
        {/* Seção Hero */}
        <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-dark mb-4">{product.title}</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{product.headline}</p>
            
            <Button size="lg" className="mt-8 px-10 py-6 text-lg" onClick={handleSimulateClick}>
                Simule Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Banner de Transparência (Securitizadora) */}
            <div className="mt-10 max-w-2xl mx-auto flex items-center justify-center gap-3 bg-blue-50/50 p-4 rounded-full border border-blue-100">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-xs md:text-sm text-gray-600">
                A <strong>Metropolitan</strong> estrutura sua operação como securitizadora, utilizando parceiros bancários autorizados para a emissão do seu crédito.
              </p>
            </div>
          </div>
        </div>
<div className="container mx-auto px-4 py-16 space-y-16">
        <section className="bg-amber-50/30 border border-amber-100 p-8 rounded-2xl">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="bg-amber-100 p-4 rounded-full text-amber-600">
                      <AlertCircle size={32} />
                    </div>
                    <div className="text-sm text-gray-700 space-y-2">
                      <h4 className="font-bold text-gray-900 uppercase tracking-wider text-xs">Informações importantes sobre sua solicitação:</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li><strong>Análise de Crédito:</strong> Toda solicitação passa por uma análise de perfil, garantias e documentação. A simulação inicial não representa compromisso de contratação.</li>
                        <li><strong>Variação de Taxas:</strong> Os valores exibidos na simulação são baseados nas condições atuais de mercado e podem ser alterados sem aviso prévio até a assinatura do contrato.</li>
                        <li><strong>Parceria Bancária:</strong> O crédito será formalizado através de uma Instituição Financeira parceira estruturada pela Metropolitan Securitizadora.</li>
                      </ul>
                    </div>
                  </div>
                </section>

          </div>


        <div className="container mx-auto px-4 py-16 space-y-16">
          {/* Seção "Como Funciona" */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-10">Como Funciona</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {product.howItWorks.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center h-16 w-16 bg-primary/10 text-primary rounded-full mx-auto mb-4 font-bold text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

        

          {/* Seção "Vantagens" */}
          <section className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
             <h2 className="text-3xl font-bold text-center mb-10">Principais Vantagens</h2>
             <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {product.advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                        <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                           <h3 className="font-semibold text-lg text-navy-dark">{advantage.title}</h3>
                           <p className="text-gray-500 text-sm md:text-base">{advantage.description}</p>
                        </div>
                    </div>
                ))}
             </div>
          </section>

          {/* Seção FAQ */}
          <section>
             <h2 className="text-3xl font-bold text-center mb-10">Perguntas Frequentes</h2>
             <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {product.faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="font-semibold text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                    {/* Pergunta adicional padrão para todos os produtos */}
                    <AccordionItem value="item-securitizadora">
                        <AccordionTrigger className="font-semibold text-left">Quem fornece o capital para o meu empréstimo?</AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">
                          A Metropolitan é uma securitizadora que estrutura o lastro financeiro das operações. Para garantir a conformidade legal e segurança, a formalização e liberação dos recursos são realizadas através de instituições financeiras parceiras devidamente autorizadas pelo Banco Central do Brasil.
                        </AccordionContent>
                    </AccordionItem>
                              <AccordionItem value="item-aprovacao">
                        <AccordionTrigger className="font-semibold text-left">A simulação garante que meu crédito será aprovado?</AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Não. A simulação é apenas uma estimativa inicial para que você conheça as condições gerais. A aprovação final depende de uma análise detalhada de crédito, verificação de documentos e, no caso de garantias reais, da avaliação técnica do bem (imóvel/veículo). Somente após essas etapas o crédito é confirmado.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
              
              
             </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;