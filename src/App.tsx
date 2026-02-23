import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { ProfileProvider, useProfileContext } from "./context/ProfileContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaginaAjuda from './pages/PaginaAjuda';
import PaginaContato from "./pages/paginaContato";
import Login from "./pages/login";
import Register from "./pages/registro";
import ProfilePage from "./pages/ProfilePage";
import SimulationPage from "./pages/simulate"; 
import TermodeUsoPage from "./pages/TermoUso";
import PrivacidadePage from "./pages/Privacidade"
import ProtectedRoute from "./context/ProtectedRoute";
import EditProfilePage from "./pages/editarPerfilPage";
import ProductDetailPage from "./pages/ProdutoDetalhes";
import VerificacaoPage from "./pages/verificacaoPage";
import RedefinirSenhaPage from "./pages/redefinirSenhaPage";
import EsqueciSenhaPage from "./pages/Esquecisenhapage";
import PaginaSeguranca from "./pages/EviteGolpesPages";
import MySimulationsPage from "./pages/MinhaSimulacaopage";

import { AdminRoute } from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import SobreNos from "./pages/SobreNosPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const AppRoutes = () => {

  const { isLoading } = useProfileContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <>
    <ScrollToTop />    
    <Routes>
     
    <Route path="/" element={<Index />} />
      <Route path="/ajuda" element={<PaginaAjuda />} />
      <Route path="/termoUso" element={<TermodeUsoPage />} />
      <Route path="/privacidade" element={<PrivacidadePage />} />
      <Route path="/contato" element={<PaginaContato />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
       <Route path="/produto/:productId" element={<ProductDetailPage />} />
       <Route path="/verificar-email" element={<VerificacaoPage />} />
       <Route path="/redefinir-senha" element={<RedefinirSenhaPage />} />
      <Route path="/esqueci-senha" element={<EsqueciSenhaPage />} />
      <Route path="/EviteGolpes" element={<PaginaSeguranca />} />
      <Route path="/sobreNos" element={<SobreNos />} />

      
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route path="/perfil/editar" element={
        <ProtectedRoute>
        <EditProfilePage />
        </ProtectedRoute>
        } /> 
      <Route 
        path="/simulacao" 
        element={
            <SimulationPage />
        } 
      />
           <Route 
        path="/minhas-simulacoes" 
        element={
          <ProtectedRoute>
            <MySimulationsPage />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
      <Route 
  path="/admin/financeiro" 
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  } 
/>
    </Routes>
    </>
  );
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ProfileProvider>
        
          <AppRoutes />
        </ProfileProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

