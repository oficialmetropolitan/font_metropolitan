import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom"; 
import { menuData } from "../lib/MenuData";

const Footer = () => {
  const footerSections = [
    {
      title: "Para você",
      links: [
        { label: "Home Equity", href: "/produto/home-equity" },
        { label: "Crédito Consignado", href: "/produto/consignado" },
        { label: "Empréstimo Pessoal", href: "/produto/pessoal" }
      ]
    },
    {
      title: "Para seu negócio", 
      links: [
        { label: "Capital de Giro", href: "/produto/capital-giro" },
        { label: "Antecipação de Recebíveis", href: "/produto/antecipacao" },
        { label: "Trava de Maquininha", href: "/produto/trava-maquininha" }
      ]
    },
    {
      title: "A Metropolitan",
      links: [
        { label: "Quem somos", href: "/sobre" },
        { label: "Como funciona", href: "/ajuda" },
        { label: "Segurança", href: "/seguranca" },
        { label: "Seja parceiro", href: "/parceiro" }
      ]
    }
  ];

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-6 gap-8 text-left">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-2xl font-bold">
              <span className="text-white">Metropolitan</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crédito inteligente para impulsionar seus sonhos. 
              Processo 100% digital, seguro e transparente através do modelo de securitização.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

      
          {menuData.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-white/10 pb-2">{section.label}</h3>
              <ul className="space-y-3">
                {section.items.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href} 
                      className="text-gray-400 hover:text-primary transition-colors text-sm block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 space-y-6">
          <div className="text-[10px] md:text-xs text-gray-400 leading-relaxed space-y-4">
            <p>
              A <strong>Metropolitan Securitizadora S.A.</strong> não é uma instituição financeira. Somos uma companhia securitizadora de ativos financeiros que atua na estruturação de operações de crédito. 
              As operações de empréstimo e financiamento exibidas neste site são concedidas por instituições financeiras parceiras devidamente autorizadas pelo Banco Central do Brasil.
            </p>
            <p>
              <strong>Atenção:</strong> A Metropolitan não solicita depósitos ou pagamentos antecipados para liberação de crédito. 
              Toda análise de crédito está sujeita aos critérios de aprovação da instituição emissora. As taxas e prazos podem variar de acordo com o perfil de cada cliente.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5">
            <div className="text-xs text-gray-500">
              © 2024 Metropolitan Securitizadora. Todos os direitos reservados.
            </div>
            <div className="flex gap-6 text-xs">
              <Link to="/privacidade" className="text-gray-500 hover:text-white transition-colors">Política de Privacidade</Link>
              <Link to="/termoUso" className="text-gray-500 hover:text-white transition-colors">Termos de Uso</Link>
              <Link to="/contato" className="text-gray-500 hover:text-white transition-colors">Contato</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;