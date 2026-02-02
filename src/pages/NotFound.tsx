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
    <div className="relative min-h-screen bg-[linear-gradient(180deg,rgba(229,227,222,1)_0%,rgba(231,228,222,1)_60%,rgba(240,238,232,1)_100%)] font-sans overflow-hidden">

      <header className="absolute top-0 left-0 z-20 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 border-b border-navy-dark/40 ">
          <div className="flex flex-col ">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-navy-dark">
              Metropolitan
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Securitizadora S.A.
            </span>
          </div>


          <Link to="/">
            <Button
              variant="link"
              className="text-[10px] uppercase tracking-[0.2em] text-navy-dark hover:text-primary transition-colors p-0 h-auto"
            >
              [ Voltar ao Início ]
            </Button>
          </Link>
        </div>
      </header>

      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-navy-dark/5 blur-3xl" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-7xl">

          <div className="flex flex-col items-center text-center">

            <div className="relative flex items-center justify-center gap-2 md:gap-8">

              <motion.span
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="select-none text-[10rem] md:text-[18rem] lg:text-[23rem] font-black leading-none text-[#456274]/[0.8] mt-8"
              >
                4
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="relative
                          w-40 md:w-64 lg:w-[360px]
                          h-48 md:h-80 lg:h-[450px]
                          overflow-hidden"
              >

                <div
                  className="absolute inset-x-0 bottom-0
                  h-40 md:h-56
                  z-0 pointer-events-none"
                  style={{
                    background: `
            linear-gradient(
              to bottom,
              rgba(240,239,235,0) 0%,
              #F0EFEB 35%,
              #F0EFEB 100%
            )
          `,
                  }}
                />

                <video
                  src="https://res.cloudinary.com/daeczbv7v/video/upload/v1769810177/mostrinho3_qvbotm.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 h-full w-full
                  object-cover object-center
                  grayscale-[0.35]
                  contrast-[1.05]
                  opacity-90
                  mix-blend-multiply"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(circle at center, black 60%, rgba(0, 0, 0, 0.8) 72%, transparent 100%)",
                    maskImage:
                      "radial-gradient(circle at center, black 60%, rgba(0,0,0,0.8) 72%, transparent 100%)",
                  }}
                />


                <div className="absolute inset-0 z-20 bg-[#E4E2DC]/30 mix-blend-color pointer-events-none" />
              </motion.div>

              <motion.span
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="select-none text-[10rem] md:text-[18rem] lg:text-[23rem] font-black leading-none text-[#456274]/[0.8] mt-8"
              >
                4
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative
              mt-1
              -translate-y-8 md:-translate-y-12 lg:-translate-y-16
              z-20 text-center"
            >
              <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-navy-dark">
                Página não{" "}
                <span className="font-serif  text-primary">
                  encontrada
                </span>.
              </h1>


              <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-gray-500">
                O conteúdo solicitado foi movido ou não existe mais.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-12"
            >
              <Link to="/">
                <Button className="group relative overflow-hidden rounded-full bg-navy-dark px-12 py-7 text-[10px] font-bold tracking-[0.3em] uppercase text-white transition-all duration-500 hover:bg-primary hover:scale-105 shadow-xl">
                  <span className="relative z-10 flex items-center">
                    <ArrowLeft className="mr-3 h-3 w-3 transition-transform duration-500 group-hover:-translate-x-2" />
                    Retornar ao Portal
                  </span>
                </Button>
              </Link>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
};


export default NotFound;

