import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";
import { products } from "@/lib/produtoData";
import { motion, AnimatePresence } from "framer-motion"; // Opcional: para animações suaves

const allProducts = Object.values(products);

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("para-voce");

  const productSections = {
    "para-voce": {
      badge: "Pessoa Física",
      title: "Soluções sob medida para sua vida",
      subtitle: "Crédito estruturado para realizar grandes planos com a segurança que você merece.",
      products: allProducts.filter(p => p.category === 'para-voce'),
    },
    "para-seu-negocio": {
      badge: "Corporate & SMB",
      title: "Impulsione o crescimento da sua empresa",
      subtitle: "Capital estratégico e soluções financeiras digitais para empresas que buscam o próximo nível.",
      products: allProducts.filter(p => p.category === 'para-seu-negocio'),
    },
  };

  return (
    <section id="solucao" className="py-20   bg-[#F8F9FA] from-slate-50 via-white to-white overflow-hidden" >
      <div className="container-custom">
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs Centralizadas e Minimalistas */}
          <div className="flex justify-center mb-16" >
            <TabsList className="inline-flex h-14 items-center justify-center rounded-full bg-gray-100/80 p-1.5 backdrop-blur-md border border-gray-200 shadow-inner">
              <TabsTrigger 
                value="para-voce"
                className="rounded-full px-8 py-2.5 text-sm font-bold tracking-wide transition-all data-[state=active]:bg-navy-dark data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                PARA VOCÊ
              </TabsTrigger>
              <TabsTrigger 
                value="para-seu-negocio"
                className="rounded-full px-8 py-2.5 text-sm font-bold tracking-wide transition-all data-[state=active]:bg-navy-dark data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                PARA SEU NEGÓCIO
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(productSections).map(([key, section]) => (
            <TabsContent 
              key={key} 
              value={key} 
              className="mt-0 focus-visible:outline-none outline-none ring-0"
            >
              {/* Header da Seção */}
              <div className="text-center space-y-5 mb-20">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]"
                >
                  {section.badge}
                </motion.span>
                
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }} 
                className="text-xl md:text-4xl font-extrabold text-navy-dark tracking-tight leading-tight max-w-3xl mx-auto"
              >
                {section.title}
              </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light"
                >
                  {section.subtitle}
                </motion.p>
              </div>

        
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-4xl mx-auto px-4"  >
                {section.products.map((product, index) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex justify-center"
                  >
                    <div className="w-full transition-transform duration-500 hover:-translate-y-2">
                      <ProductCard
                        title={product.title}
                        description={product.description}
                        image={product.image}
                        link={`/produto/${product.id}`} 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      

    </section>
  );
};

export default ProductTabs;