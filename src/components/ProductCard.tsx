// src/components/ProductCard.tsx

import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

// Definimos as propriedades que o nosso card vai receber
interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const ProductCard = ({ image, title, description, link }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group flex flex-col">
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-navy-dark mb-2">{title}</h3>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
        <div className="mt-4">
          {/* O componente Link faz a navegação sem recarregar a página */}
          <Link 
            to={link} 
            className="font-semibold text-primary inline-flex items-center group/link"
          >
            Saiba mais
            <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;