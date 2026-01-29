import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Rota não estruturada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FBFBFC] font-sans">
      {/* Blobs decorativos */}
      <div className="absolute top-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-primary/5 animate-pulse" />
      <div className="absolute bottom-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-navy-dark/5" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-center text-center">
          {/* Imagem 404 */}
          <div className="relative flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dtwruiuyw/image/upload/v1769611173/4_0_4-removebg-preview_m1nhla.png"
              alt="Erro 404"
              className="max-h-[300px] w-full object-contain grayscale"
            />
          </div>

          {/* Texto */}
          <div className="mt-6 max-w-md">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-navy-dark">
              Caminho <br />
              <span className="font-light italic text-gray-400">
                não localizado.
              </span>
            </h1>

           
          </div>

          {/* Botão */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-12"
          >
            <Link to="/">
              <Button className="group relative overflow-hidden rounded-full bg-navy-dark px-12 py-8 text-[10px] font-bold tracking-[0.3em] uppercase text-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-700 hover:bg-primary">
                <span className="relative z-10 flex items-center">
                  <ArrowLeft className="mr-3 h-4 w-4 transition-transform duration-500 group-hover:-translate-x-2" />
                  Voltar para a Home
                </span>
                <span className="absolute inset-0 translate-y-full bg-primary transition-transform duration-500 group-hover:translate-y-0" />
              </Button>
            </Link>
          </motion.div>
 <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20 flex w-full items-center justify-center gap-3 border-t border-gray-400 pt-8 text-[10px] uppercase tracking-[0.4em] text-gray-400"
          >
            <ShieldCheck className="h-4 w-4 text-primary/40" />
            Metropolitan Securitizadora S.A.
          </motion.div>
      
        </div>
      </div>
    </div>
  );
};

export default NotFound;
