import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, AlertCircle, LogOut, Edit, Handshake, ShieldCheck, User } from "lucide-react";
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
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <>
      <AnimatePresence>
        {isBannerVisible && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-navy-dark text-white overflow-hidden"
          >
            <div className="container-custom py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-accent">
                   <ShieldCheck className="h-3 w-3 text-white" />
                </div>
                <span className="text-[10px] md:text-xs font-medium tracking-wide text-gray-300">
                  SEGURANÇA INSTITUCIONAL: A Metropolitan nunca solicita depósitos antecipados.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/EviteGolpes" className="text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors border-b border-white/20 pb-0.5">
                  Protocolo de Segurança
                </Link>
                <button onClick={() => setIsBannerVisible(false)} className="text-gray-400 hover:text-white">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            
            {/* Branding */}
            <div className="flex items-center gap-10">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative h-10 w-10 flex items-center justify-center  rounded-xl overflow-hidden shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                  <img src="https://res.cloudinary.com/dtwruiuyw/image/upload/v1768401044/logoMetropolitan_k7jpw7.png" alt="Metropolitan Logo" className="h-7 w-auto relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black text-navy-dark tracking-tighter leading-none uppercase">Metropolitan</span>
                  <span className="text-[9px] font-bold text-gray-400 tracking-[0.3em] uppercase leading-none mt-1">Securitizadora</span>
                </div>
              </Link>

              
              <nav className="hidden lg:flex items-center space-x-1">
                {menuData.map((item, index) => (
                  <div key={index} className="relative group px-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-navy-dark transition-all">
                      {item.label}
                      <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    
                    {/* Dropdown Refinado */}
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                      <div className="p-2 space-y-0.5">
                        {item.items.map((subItem, subIndex) => (
                          <Link 
                            key={subIndex} 
                            to={subItem.href} 
                            className="flex items-center justify-between group/item px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-600 group-hover/item:text-navy-dark">{subItem.label}</span>
                            <div className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover/item:opacity-100 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <Link to="/sobreNos" className="px-5 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-navy-dark transition-all">
                  Sobre Nós
                </Link>
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3">
                {isAuthenticated ? (
                  <div className="flex items-center bg-gray-50 p-1 rounded-full border border-gray-100">
                    <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-bold tracking-widest uppercase  hover:bg-[#10161E]" asChild>
                      <Link to="/perfil/editar">
                        <Edit className="h-3 w-3 mr-2  text-blue-500 transition-colors duration-200 " />
                          Perfil
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-bold tracking-widest uppercase  hover:bg-[#10161E]" asChild>
                      <Link to="/minhas-simulacoes">
                        <Handshake className="h-3 w-3 mr-2  transition-colors duration-200 text-blue-500 " /> Minhas Simulações
                      </Link>
                    </Button>
                    <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-full text-[10px] font-bold tracking-widest uppercase hover:text-blue-100">
                      <LogOut className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="ghost" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-blue-100" asChild>
                      <Link to="/login">Área do Cliente</Link>
                    </Button>
                    <Button className="bg-navy-dark hover:bg-primary text-white px-8 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all shadow-xl hover:shadow-primary/20" asChild>
                      <HashLink smooth to="/#solucao">SOLUÇÕES</HashLink>
                    </Button>
                  </>
                )}
              </div>
              
              <button 
                className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5 text-navy-dark" /> : <Menu className="h-5 w-5 text-navy-dark" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Refined */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl p-6"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {isAuthenticated ? (
                    <>
                      <Link to="/perfil/editar" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                         <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><User className="h-5 w-5 text-primary" /></div>
                         <span className="font-bold text-navy-dark tracking-tight">Gerenciar Perfil</span>
                      </Link>
                      <Link to="/minhas-simulacoes" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                         <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><Handshake className="h-5 w-5 text-primary" /></div>
                         <span className="font-bold text-navy-dark tracking-tight">Simulações Ativas</span>
                      </Link>
                      <Button onClick={handleLogout} variant="ghost" className="w-full text-red-500 font-bold uppercase tracking-widest text-[10px]">Encerrar Sessão</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full h-14 rounded-2xl border-gray-100 font-bold text-navy-dark" asChild>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sou Cliente</Link>
                      </Button>
                      <Button className="w-full h-14 rounded-2xl bg-navy-dark font-bold text-white shadow-xl" asChild>
                        <HashLink smooth to="/#solucao" onClick={() => setIsMenuOpen(false)}>Explorar Soluções</HashLink>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;