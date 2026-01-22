import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const EsqueciSenhaPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitted(false);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
            const response = await axios.post(`${apiUrl}/api/auth/forgot-password`, { email });
            toast.success(response.data.message);
            setSubmitted(true);
        } catch (error) {
            toast.error("Ocorreu um erro. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Esqueceu sua senha?</CardTitle>
                    <CardDescription>
                        {submitted 
                            ? "Verifique sua caixa de entrada (e spam)!" 
                            : "Digite seu e-mail e enviaremos um link para redefinir sua senha."
                        }
                    </CardDescription>
                </CardHeader>
                {!submitted && (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" /> : 'Enviar Link de Redefinição'}
                            </Button>
                        </CardContent>
                    </form>
                )}
                 <div className="p-6 text-center text-sm">
                    <Link to="/login" className="text-primary hover:underline">
                        Voltar para o Login
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default EsqueciSenhaPage;