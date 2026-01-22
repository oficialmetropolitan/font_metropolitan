// 1. Importamos a "fonte da verdade": seu objeto de produtos
import { products } from "@/lib/produtoData";
import { Product } from "@/lib/produtoData";


// 2. Definimos a estrutura que o HEADE)R espera (isso não muda)
export interface SubMenuItem {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  items: SubMenuItem[];
}

// --- A MÁGICA COMEÇA AQUI ---

// 3. Transformamos o objeto gigante de produtos em um array simples
const allProducts: Product[] = Object.values(products);

// 4. Criamos uma função que transforma um "Produto" em um "Item de Submenu"
const formatProductToSubMenu = (product: Product): SubMenuItem => ({
  label: product.title,
  href: `/produto/${product.id}` // O link para a página de detalhes
});

// 5. Filtramos e formatamos os produtos da Categoria "Para você"
const paraVoceItems: SubMenuItem[] = allProducts
  .filter(p => p.category === 'para-voce')
  .map(formatProductToSubMenu);

// 6. Filtramos e formatamos os produtos da Categoria "Para seu negócio"
const paraSeuNegocioItems: SubMenuItem[] = allProducts
  .filter(p => p.category === 'para-seu-negocio')
  .map(formatProductToSubMenu);

// 7. Exportamos a variável final, pronta para o Header.tsx consumir
export const menuData: MenuItem[] = [
  {
    label: "Para você",
    items: paraVoceItems
  },
  {
    label: "Para seu negócio",
    items: paraSeuNegocioItems
  }
];