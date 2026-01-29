
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // NOVO: Importando ícone de loading
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast } from "sonner"; 
import { useState, useEffect } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom"; 

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para pegar os dados da rota

  const [formData, setFormData] = useState({
    full_name: "", 
    email: "",
    phone: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });


  useEffect(() => {
   
    if (location.state) {
      const { full_name, email, phone, cpf } = location.state;
      
      setFormData(prev => ({
        ...prev,
        full_name: full_name || prev.full_name,
        email: email || prev.email,
        phone: phone || prev.phone,
        cpf: cpf || prev.cpf
      }));
    }
  }, [location.state]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    if (!formData.acceptTerms) {
      toast.warning("Você precisa aceitar os termos para continuar!");
      return;
    }

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      
    
      const response = await axios.post(`${apiUrl}/api/auth/clientes`, {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        password: formData.password,
      });

      
      toast.success("Conta criada! Verifique seu e-mail para ativar.");
      console.log("Resposta do cadastro:", response.data.message);

      navigate(`/verificar-email?email=${formData.email}`);

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro no registro:", error.response.data);
        toast.error(error.response.data.detail || "Erro ao criar conta, tente novamente!");
      } else {
        toast.error("Ocorreu um erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-navy-dark">
              Criar sua conta
            </CardTitle>
            <CardDescription>
              Preencha os dados para começar
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nome completo</Label>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Crie uma senha forte"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-input"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Label htmlFor="acceptTerms" className="text-sm leading-5">
                  Aceito os{" "}
                  <Link to="/termoUso" className="text-primary hover:underline">
                    termos de uso
                  </Link>
                  {" "}e{" "}
                  <Link to="/privacidade" className="text-primary hover:underline">
                    política de privacidade
                  </Link>
                </Label>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full btn-primary" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando conta...
                    </>
                ) : "Criar conta"}
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Já tem uma conta? </span>
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Fazer login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Register;