import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, AlertCircle, LogOut, Edit, Handshake } from "lucide-react"; // Adicionei o ícone 'Edit'
import { useNavigate, Link } from "react-router-dom"; // Use Link para navegação interna
import { menuData } from "../lib/MenuData";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Para você",
      items: ["Empréstimo com garantia de imóvel", "Empréstimo com garantia de veículos", "Financiamento de veículos", "Empréstimo pessoal"]
    },
    {
      label: "Para seu negócio", 
      items: [
        "MedPlan (crédito para área da saúde)", "Capital de Giro", "Leasing",
        "Financiamentos", "Operações Estruturadas", "Adiantamento de Recebíveis",
        "Trava de Maquininha (garantia de recebíveis)"
      ]
    },
  ];

  return (
    <>
      {isBannerVisible && (
        <div className="bg-navy-dark text-white py-3 px-4">
          <div className="container-custom flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>A Metropolitan não solicita depósito ou pagamento antecipado para aprovação de crédito.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/EviteGolpes" className="text-sm hover:text-gray-300 transition-colors border border-white/20 px-3 py-1 rounded">
                Evite Golpes
              </a>
              <button 
                className="text-white hover:text-gray-300"
                onClick={() => setIsBannerVisible(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-x-6">
              <div className="flex items-center">
                <div className="text-2xl font-bold" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://res.cloudinary.com/dtwruiuyw/image/upload/v1768401044/logoMetropolitan_k7jpw7.png" alt="Logo Metropolitan" className="h-10 w-auto"/>
                  <a href="/"><span className="text-primary">Metropolitan</span></a>
                  <span className="text-accent"></span>
                </div>
              </div>
    <nav className="hidden lg:flex items-center space-x-8">
                
                {/* Aqui ele renderiza o menuData importado */}
                {menuData.map((item, index) => (
                  <div key={index} className="relative group">
                    <button className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors py-2">
                      {item.label}
                      <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="p-4 space-y-3">
                        
                        {/* AQUI ESTÁ A MUDANÇA: Usamos <Link> em vez de <a> */}
                        {item.items.map((subItem, subIndex) => (
                          <Link 
                            key={subIndex} 
                            to={subItem.href} // ex: /produto/imovel-garantia
                            className="block text-sm text-gray-600 hover:text-primary transition-colors py-2 border-b border-gray-100 last:border-0"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* --- Lógica condicional para os botões de ação --- */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/perfil/editar">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Perfil
                    </Link>
                  </Button>
        
                     <Button variant="outline" asChild>
                    <Link to="/minhas-simulacoes">
                    <Handshake className="h-4 w-4 mr-2" />
                      Minhas Simulações
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                // Se NÃO estiver autenticado, mostra os botões ENTRAR e SIMULAR
                <>
                  <Button variant="outline" className="btn-secondary" asChild>
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button className="btn-primary" asChild>
                    <Link to="/simulacao">Simular</Link>
                  </Button>
                </>
              )}
            </div>
            
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Lógica para o menu mobile */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="container-custom py-4 space-y-4">
              {/* ... (código dos itens de menu mobile continua o mesmo) ... */}

              <div className="pt-4 border-t space-y-3">
                {isAuthenticated ? (
                  // Se estiver autenticado no mobile
                  <>
                    <Button variant="default" className="w-full" asChild>
                      <Link to="/simulacao">Fazer Simulação</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/perfil/editar">Editar meu Perfil</Link>
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={handleLogout}>
                      Sair da Conta
                    </Button>
                  </>
                ) : (
              
                  <>
                     <Button variant="outline" className="w-full btn-secondary" asChild>
                       <Link to="/login">Sou cliente</Link>
                     </Button>
      
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;