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
import Footer from '@/components/Footer'; // Adicionado
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ShieldCheck, AlertCircle, Landmark } from 'lucide-react';
import { motion } from "framer-motion"; // Opcional para animações

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
    window.scrollTo(0, 0); // Garante que a página comece no topo
  }, [productId, navigate]);

  const handleSimulateClick = () => {
    navigate('/simulacao', { state: { tipo: productId } });
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen text-gray-400">Carregando...</div>;
  }

  return (
    <div className="bg-[#FBFBFC] min-h-screen">
      <Header />

      <section className="relative pt-20 pb-32 overflow-hidden bg-[#fff] text-white">
    
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
        
        <div className="container-custom relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-black rounded-full bg-[#000]/5 border border-white/10  text-[10px] font-bold tracking-[0.3em] uppercase">
            <Landmark className="w-3 h-3 text-black" />
            Estruturação Profissional
          </div>
          
          <h1 className="text-5xl text-black md:text-6xl font-extrabold tracking-tighter max-w-4xl mx-auto leading-[1.1]">
            {product.title} <br />
          </h1>
          
          <p className="mt-6 text-xl text-black max-w-2xl mx-auto font-dark leading-relaxed">
            {product.headline}
          </p>
          
          <div className="flex flex-col items-center gap-6 pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-white hover:text-navy-dark text-white px-12 py-8 rounded-full text-sm font-bold tracking-widest transition-all duration-500 shadow-2xl"
              onClick={handleSimulateClick}
            >
                INICIAR SIMULAÇÃO <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              <ShieldCheck className="w-4 h-4 text-accent" />
              Operação Segura via Metropolitan Securitizadora
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="container-custom max-w-6xl mx-auto -mt-16 pb-24 relative z-20">
        
        {/* Card de Aviso Jurídico (Estilo Concierge) */}
        <section className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 md:p-12 mb-20">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center flex-shrink-0">
              <AlertCircle size={40} className="text-amber-500" />
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-navy-dark uppercase tracking-widest">Protocolo de Transparência</h4>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex gap-3 items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                   <p className="text-sm text-gray-500 leading-relaxed">
                     <strong>Análise de Crédito:</strong> A aprovação depende de verificação de documentos e garantias reais.
                   </p>
                </div>
                <div className="flex gap-3 items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                   <p className="text-sm text-gray-500 leading-relaxed">
                     <strong>Variação de Taxas:</strong> Condições sujeitas ao mercado até a assinatura do contrato.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona (Timeline Horizontal) */}
        <section className="space-y-12 mb-32">
          <div className="text-center space-y-4">
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">O Fluxo</span>
            <h2 className="text-4xl font-bold text-navy-dark tracking-tight">Experiência Simplificada</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {product.howItWorks.map((step, index) => (
              <div key={index} className="relative group p-6 text-center">
                <div className="flex items-center justify-center h-20 w-20 bg-white shadow-xl rounded-3xl mx-auto mb-6 group-hover:bg-navy-dark group-hover:text-white transition-all duration-500">
                  <span className="text-2xl font-black">{index + 1}</span>
                </div>
                <h3 className="font-bold text-navy-dark mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vantagens (Grid de Cartão de Crédito Black) */}
        <section className="bg-navy-dark rounded-[48px] p-12 md:p-20 text-white overflow-hidden relative mb-32">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Vantagens Exclusivas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {product.advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-6 bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-colors">
                <div className="p-3 bg-white/20 rounded-2xl">
                   <CheckCircle className="h-6 w-6 text-[#fff] " />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{advantage.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ (Estilo Minimalista) */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-navy-dark tracking-tight">Consultoria e Dúvidas</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {product.faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border border-gray-100 bg-white px-8 rounded-2xl shadow-sm overflow-hidden">
                <AccordionTrigger className="font-bold text-navy-dark text-lg hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
            
            {/* FAQ Institucional */}
            <AccordionItem value="item-securitizadora" className="border border-gray-100 bg-white px-8 rounded-2xl shadow-sm overflow-hidden">
              <AccordionTrigger className="font-bold text-navy-dark text-lg hover:no-underline py-6">
                Quem fornece o capital para a operação?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 leading-relaxed pb-6">
                A Metropolitan atua como a **securitizadora** que estrutura o lastro financeiro. A formalização é concluída através de instituições financeiras parceiras autorizadas pelo Banco Central, unindo o rigor regulatório à nossa agilidade de estruturação.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;