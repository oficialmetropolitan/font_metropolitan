import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const RedefinirSenhaPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            toast.error("Token de redefinição não encontrado ou inválido.");
            navigate('/esqueci-senha');
        }
    }, [token, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem.");
            return;
        }
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'https://api.bancometropolitan.com.br';
            const response = await axios.post(`${apiUrl}/api/auth/reset-password`, {
                token: token,
                new_password: password,
            });
            toast.success(response.data.message);
            navigate('/login');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(`Erro: ${error.response.data.detail || 'Tente novamente.'}`);
            } else {
                toast.error("Ocorreu um erro inesperado.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Crie sua nova senha</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Nova Senha</Label>
                            <Input
                                id="password" type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirme a Nova Senha</Label>
                            <Input
                                id="confirmPassword" type="password" value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Salvar Nova Senha'}
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
};

export default RedefinirSenhaPage;