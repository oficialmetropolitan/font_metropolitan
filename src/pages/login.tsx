import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "@/services/http/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const stateFromSimulation = location.state as { email?: string; nome?: string } | null;

  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: stateFromSimulation?.email || "",
    password: "",
  });
  const [tempToken, setTempToken] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [useRecovery, setUseRecovery] = useState(false);
  const [error, setError] = useState("");

  const finalizeLogin = async (token: string, isAdmin: boolean, session2fa?: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("is_admin", isAdmin ? "true" : "false");
    if (session2fa) {
      localStorage.setItem("session_2fa_token", session2fa);
    }

    try {
      await api.post("/api/simulacoes/vincular-simulacoes-pendentes", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Simulação recuperada com sucesso!");
    } catch {
      console.warn("Nenhuma simulação pendente para vincular.");
    }

    if (isAdmin) {
      navigate("/admin/financeiro");
    } else {
      navigate("/perfil");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append("username", formData.email);
      formDataEncoded.append("password", formData.password);

      const response = await api.post("/api/auth/token", formDataEncoded, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.data.requires_2fa) {
        setTempToken(response.data.temp_token);
        setStep("2fa");
        return;
      }

      await finalizeLogin(response.data.access_token, response.data.is_admin);
    } catch (err) {
      console.error(err);
      setError("E-mail ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const endpoint = useRecovery ? "/api/auth/2fa/recovery" : "/api/auth/2fa/verify";
      const payload = useRecovery
        ? { temp_token: tempToken, recovery_code: totpCode }
        : { temp_token: tempToken, code: totpCode };

      const response = await api.post(endpoint, payload);

      await finalizeLogin(
        response.data.access_token,
        response.data.is_admin,
        response.data.session_2fa_token,
      );
    } catch (err) {
      console.error(err);
      setError(useRecovery ? "Código de recuperação inválido." : "Código inválido ou expirado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4">

        {stateFromSimulation?.email && step === "credentials" && (
          <div className="mb-4 flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={18} />
            <p className="text-sm font-medium">
              Simulação encontrada para <strong>{stateFromSimulation.email}</strong>. Entre para salvar.
            </p>
          </div>
        )}

        <Card className="w-full max-w-md shadow-lg">
          {step === "credentials" ? (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Acessar Conta</CardTitle>
                <CardDescription>Metropolitan Securitizadora - Sistema de Crédito</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded border border-red-100">
                      {error}
                    </p>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                  <div className="flex flex-col items-center gap-2 text-sm">
                    <p className="text-muted-foreground">
                      Não tem uma conta?{" "}
                      <Link to="/cadastro" state={location.state} className="text-primary font-bold hover:underline">
                        Criar conta
                      </Link>
                    </p>
                    <Link to="/esqueci-senha" className="text-gray-500 hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <ShieldCheck size={40} className="text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Verificação em Dois Fatores</CardTitle>
                <CardDescription>
                  {useRecovery
                    ? "Digite um dos seus códigos de recuperação."
                    : "Digite o código do seu aplicativo autenticador."}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handle2FASubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded border border-red-100">
                      {error}
                    </p>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="totp">{useRecovery ? "Código de recuperação" : "Código de 6 dígitos"}</Label>
                    <Input
                      id="totp"
                      type="text"
                      placeholder={useRecovery ? "xxxxxxxx" : "000000"}
                      value={totpCode}
                      onChange={(e) => setTotpCode(e.target.value.trim())}
                      maxLength={useRecovery ? 10 : 6}
                      autoComplete="one-time-code"
                      autoFocus
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    {isLoading ? "Verificando..." : "Verificar"}
                  </Button>
                  <div className="flex flex-col items-center gap-2 text-sm">
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => { setUseRecovery(!useRecovery); setTotpCode(""); setError(""); }}
                    >
                      {useRecovery ? "Usar código do aplicativo" : "Usar código de recuperação"}
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:underline"
                      onClick={() => { setStep("credentials"); setTempToken(""); setTotpCode(""); setError(""); setUseRecovery(false); }}
                    >
                      Voltar ao login
                    </button>
                  </div>
                </CardFooter>
              </form>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default Login;
