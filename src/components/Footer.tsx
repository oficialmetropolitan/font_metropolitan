import { Clock, Facebook, Instagram, Linkedin, MapPin, Youtube } from "lucide-react";
import { Link } from "react-router-dom"; 
import { menuData } from "../lib/MenuData";

const Footer = () => {
 

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-custom py-16 justify-center ">
         <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          <div className="lg:col-span-4 space-y-8">
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase leading-none">Metropolitan</span>
              <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase mt-1">Securitizadora</span>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">
              Soluções inteligentes em securitização de ativos, conectando o mercado de capitais aos seus maiores objetivos com agilidade digital e rigor jurídico.
            </p>

            <div className="space-y-4">
               <div className="flex items-start gap-3 text-xs text-gray-400">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>Rua Alvarina Frota, 55, Santa Luiza<br />Varginha, Minas Gerais</span>
               </div>
               <div className="flex items-center gap-3 text-xs text-gray-400">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Segunda a Sexta: 09h às 18h</span>
               </div>
            </div>

            <div className="flex gap-4 pt-2">
              
              <a href="https://www.facebook.com/profile.php?id=61585138614368" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">

                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/metropolitan.securitizadora/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">

                <Instagram className="w-5 h-5" />

              </a>

              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">

                <Linkedin className="w-5 h-5" />

              </a>

            </div>
          </div>

          {/* Colunas Dinâmicas: Navegação */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {menuData.map((section, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] border-l-2 border-primary pl-4">
                  {section.label}
                </h3>
                <ul className="space-y-4">
                  {section.items.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.href} 
                        className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm font-light flex items-center gap-2 group"
                      >
                        <div className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>


        <div className="border-t border-gray-700 mt-10 pt-8 space-y-6">
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