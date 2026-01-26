// src/components/ProductCard.tsx

import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const ProductCard = ({ image, title, description, link }: ProductCardProps) => {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full">
      {/* Container da Imagem com Overlay sutil */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        {/* Overlay de gradiente para dar profundidade à imagem */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <CardContent className="p-8 flex flex-col flex-grow relative bg-white">
        {/* Detalhe visual: barrinha colorida que aparece no hover */}
        <div className="absolute top-0 left-8 w-12 h-1 bg-primary transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" />

        <h3 className="font-bold text-xl text-navy-dark mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {description}
        </p>

        <div className="pt-4 border-t border-gray-50">
          <Link 
            to={link} 
            className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-navy-dark group/link"
          >
            <span className="relative">
              Explorar Solução
              {/* Linha animada embaixo do texto */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
            </span>
            <div className="ml-3 p-2 rounded-full bg-gray-50 group-hover/link:bg-primary group-hover/link:text-white transition-all duration-300">
              <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;