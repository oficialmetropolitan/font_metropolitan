import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  if (!token || !isAdmin) {
    // Se não tiver token ou não for admin, bloqueia o acesso
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};