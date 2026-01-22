// src/pages/ProductDetailPage.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import React, { useEffect, useState } from 'react';
// ATUALIZADO: Removido 'Link'
import { useParams, useNavigate } from 'react-router-dom'; 
import { products, Product } from '@/lib/produtoData'; 
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';


const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>(); 
  const navigate = useNavigate(); // ATUALIZADO: Adicionado
  const [product, setProduct] = useState<Product | null>(null);

 useEffect(() => {
    // ATUALIZADO: Verifique se productId não é nulo
    if (productId && products[productId]) {
      setProduct(products[productId]);
    } else if (productId) {
       // Se o ID existe mas não está nos 'products', redireciona
       navigate('/');
    }
    // Adicionado productId como dependência
  }, [productId, navigate]);
  const handleSimulateClick = () => {
    // Enviamos o ID do produto (ex: 'home_equity') para a próxima rota
    // usando o 'state' do react-router
    navigate('/simulacao', { state: { tipo: productId } });
  };

  if (!product) {
    return <div>Carregando...</div>;
  }
return (
    <>
      <Header />
      <div className="bg-white">
        {/* Seção Hero */}
        <div className="bg-gray-50 py-16 sm:py-24">
          <div className="container mx-auto px-4 text-center">
            {/* ... */}
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{product.headline}</p>
            
            {/* BOTÃO ATUALIZADO */}
            <Button size="lg" className="mt-8" onClick={handleSimulateClick}>
                Simule Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

          </div>
        </div>

        <div className="container mx-auto px-4 py-16 space-y-16">
          {/* Seção "Como Funciona" */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-10">Como Funciona</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {product.howItWorks.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 bg-primary/10 text-primary rounded-full mx-auto mb-4 font-bold text-xl">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Seção "Vantagens" */}
          <section className="bg-gray-50 p-12 rounded-lg">
             <h2 className="text-3xl font-bold text-center mb-10">Principais Vantagens</h2>
             <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {product.advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                           <h3 className="font-semibold text-lg">{advantage.title}</h3>
                           <p className="text-gray-500">{advantage.description}</p>
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
                            <AccordionTrigger className="font-semibold">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
             </div>
          </section>

        </div>
      </div>
      {/* Adicione seu Footer aqui */}
    </>
  );
};

export default ProductDetailPage;