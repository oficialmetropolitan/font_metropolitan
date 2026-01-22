import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Este componente recebe 'children', que serão as páginas que queremos proteger.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Se NÃO existir um token...
    if (!token) {
      // ...mostramos um aviso e redirecionamos para a página de login.
      toast.error('Acesso negado. Por favor, faça login para continuar.');
      navigate('/login');
    }
  }, [token, navigate]); // Roda este efeito sempre que o token ou a função navigate mudarem.

  // Se o token existir, simplesmente renderizamos a página filha (children).
  // Retornamos null enquanto a verificação e o redirecionamento acontecem para evitar um flash da página protegida.
  return token ? <>{children}</> : null;
};

export default ProtectedRoute;