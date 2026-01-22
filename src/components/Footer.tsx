import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Para você",
      links: [
        "Empréstimo com garantia de imóvel",
        "Emprestimo com garantia de veículos", 
        "Financiamento de veículos",
        "Crédito Consignado",
        "Empréstimo pessoal"
      ]
    },
    {
      title: "Para seu negócio", 
      links: [
        "MedPlan (Crédito)",
        "Capital de Giro",
        "Leasing",
        "Financiamentos",
        "Operação estruturada", 
        "Antecipação de recebíveis",
        "Trava de maquininha (garantia de recebíveis)"

      ]
    },
  
    {
      title: "A Metropolitan",
      links: [
        "Quem somos",
        "Como funciona",
        "Segurança",
        "Seja parceiro",
        
      ]
    }
  ];

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-2xl font-bold">
              <span className="text-white">Metropolitan</span>
              
            </div>
            <p className="text-gray-300 leading-relaxed">
              Crédito inteligente para impulsionar seus sonhos. 
              Processo 100% digital, seguro e transparente.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2024 Metropolitan. Todos os direitos reservados.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="/termoUso" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="/contato" className="text-gray-400 hover:text-white transition-colors">
              contato
               </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;