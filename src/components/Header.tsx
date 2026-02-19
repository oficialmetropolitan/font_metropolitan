import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, LogOut, Edit, Handshake, ShieldCheck, User } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { menuData } from "../lib/MenuData";
import { HashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuth();
    // Fecha o menu mobile sempre que mudar de página
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isBannerVisible && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#10161E] text-white overflow-hidden"
          >
            <div className="container-custom py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20">
                   <ShieldCheck className="h-3 w-3 text-blue-400" />
                </div>
                <span className="text-[10px] md:text-xs font-medium tracking-wide text-gray-300">
                  SEGURANÇA: A Metropolitan nunca solicita depósitos antecipados.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/EviteGolpes" className="text-[10px] uppercase font-bold tracking-widest hover:text-blue-400 transition-colors border-b border-white/20 pb-0.5">
                  Protocolo
                </Link>
                <button onClick={() => setIsBannerVisible(false)} className="text-gray-400 hover:text-white">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-10">
              <Link to="/" className="relative group">
                  <img src="https://res.cloudinary.com/dtwruiuyw/image/upload/v1770817623/LOGOBGT_d7kzhm.png" alt="Metropolitan Logo" className="h-40 w-auto relative z-10" />
              </Link>

              <nav className="hidden lg:flex items-center space-x-1">
                {menuData.map((item, index) => (
                  <div key={index} className="relative group px-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-navy-dark ">
                      {item.label}
                      <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform" />
                    </button>
                    
                    <div className=" absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                      <div className="p-2">
                        {item.items.map((subItem, subIndex) => (
                          <Link 
                            key={subIndex} 
                            to={subItem.href} 
                            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors "
                          >
                            <span className="  text-sm font-medium text-gray-600">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <Link to="/sobreNos" className="px-5 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-navy-dark">
                  Sobre Nós
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3">
                {isAuthenticated ? (
                  <div className="flex items-center bg-gray-50 p-1 rounded-full border border-gray-100">
                    <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-bold uppercase" asChild>
                      <Link to="/perfil/editar">
                        <Edit className="h-3 w-3 mr-2 text-blue-500" /> Perfil
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-bold uppercase" asChild>
                      <Link to="/minhas-simulacoes">
                        <Handshake className="h-3 w-3 mr-2 text-blue-500" /> Simulações
                      </Link>
                    </Button>
                    <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-full hover:text-red-500">
                      <LogOut className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="ghost" className="text-xs font-bold uppercase text-gray-500" asChild>
                      <Link to="/login">Área do Cliente</Link>
                    </Button>
                    <Button className="bg-[#10161E] text-white px-8 rounded-full text-[10px] font-bold" asChild>
                      <HashLink smooth to="/#solucao">SOLUÇÕES</HashLink>
                    </Button>
                  </>
                )}
              </div>
              
              <button 
                className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/perfil/editar" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                       <User className="h-5 w-5 text-blue-600" />
                       <span className="font-bold text-navy-dark">Meu Perfil</span>
                    </Link>
                    <Link to="/minhas-simulacoes" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                       <Handshake className="h-5 w-5 text-blue-600" />
                       <span className="font-bold text-navy-dark">Minhas Simulações</span>
                    </Link>
                    <Button onClick={handleLogout} variant="destructive" className="w-full rounded-2xl">Sair</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full h-12 rounded-xl" asChild>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sou Cliente</Link>
                    </Button>
                    <Button className="w-full h-12 rounded-xl bg-[#10161E]" asChild>
                      <HashLink smooth to="/#solucao" onClick={() => setIsMenuOpen(false)}>Explorar Soluções</HashLink>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;