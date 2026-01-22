import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";
import { products } from "@/lib/produtoData"; 

const allProducts = Object.values(products);

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("para-voce");

  const productSections = {
    "para-voce": {
      title: "Veja os empréstimos que temos para você",
      subtitle: "Conheça os produtos que combinam com a sua necessidade.",
      products: allProducts.filter(p => p.category === 'para-voce'),
    },
    "para-seu-negocio": {
      title: "Empréstimos que combinam com o seu negócio",
      subtitle: "Tenha acesso ao crédito rápido e digital, exclusivo para empresas.",
      products: allProducts.filter(p => p.category === 'para-seu-negocio'),
    },
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Adicionado max-w-4xl e mx-auto para os botões não ficarem largos demais em telas gigantes */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-2 mb-12 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger 
              value="para-voce"
              className="data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
            >
              PARA VOCÊ
            </TabsTrigger>
            <TabsTrigger 
              value="para-seu-negocio"
              className="data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
            >
              PARA SEU NEGÓCIO
            </TabsTrigger>
          </TabsList>

          {Object.entries(productSections).map(([key, section]) => (
            <TabsContent key={key} value={key} className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-navy-dark max-w-4xl mx-auto">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {section.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-8">
                {section.products.map((product) => (
                  <div key={product.id} className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] max-w-[300px]">
                    <ProductCard
                      title={product.title}
                      description={product.description}
                      image={product.image}
                      link={`/produto/${product.id}`} 
                    />
                  </div>
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