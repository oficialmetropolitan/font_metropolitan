
import { products } from "@/lib/produtoData";
import { Product } from "@/lib/produtoData";


export interface SubMenuItem {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  items: SubMenuItem[];
}


const allProducts: Product[] = Object.values(products);


const formatProductToSubMenu = (product: Product): SubMenuItem => ({
  label: product.title,
  href: `/produto/${product.id}` 
});


const paraVoceItems: SubMenuItem[] = allProducts
  .filter(p => p.category === 'para-voce')
  .map(formatProductToSubMenu);

const paraSeuNegocioItems: SubMenuItem[] = allProducts
  .filter(p => p.category === 'para-seu-negocio')
  .map(formatProductToSubMenu);

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