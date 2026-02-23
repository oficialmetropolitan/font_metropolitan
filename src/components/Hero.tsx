import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import modelImage from "@/assets/modelo-.png";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden selection:bg-blue-500/30" 
      style={{ 
        background: "linear-gradient(180deg, rgba(3, 19, 236, 1) 0%, rgba(47, 50, 71, 1) 100%)" 
      }}
    >

      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] blur-[150px] rounded-full bg-blue-400/20 animate-pulse duration-[10000ms]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center gap-12">

          <div className="max-w-2xl py-20">
            

            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gray-200/40 border border-blue-500/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ShieldCheck className="w-4 h-4 text-white animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[0.25em] text-white/70 uppercase">
                Metropolitan Securitizadora S.A.
              </span>
            </div>

            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-voga tracking-tight text-white leading-[1.1]">
                O crédito que impulsiona seus planos.
              </h1>
            </div>

   <div className="mt-12 flex flex-wrap items-center gap-8 animate-reveal-up [animation-delay:400ms]">
              <a href="https://wa.me/5535997446658" target="_blank" className="relative group">
                <Button className="h-12 px-10 bg-white text-[#0313EC] hover:bg-white/90 rounded-none transition-all duration-500 shadow-2xl group-hover:-translate-y-1 rounded-full ">
                  <span className="text-xs font-bold uppercase tracking-widest">Falar com especialista</span>
                  <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                </Button>
         
                <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
              <a href="/#solucao" className="group flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
              >
                Explorar Soluções
                <span className="block w-0 group-hover:w-8 h-[1px] bg-white ml-2 transition-all duration-500"></span>
              </a>
            </div>


            <div className="mt-16 pt-8 border-t border-white/20 animate-in fade-in duration-1000 delay-500">
              <p className="text-[10px] text-gray-100 uppercase tracking-widest font-medium">
                Operações Estruturadas
              </p>
              <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-1">
                Sujeito à análise de garantia e conformidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:flex items-end justify-end select-none">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/10 rounded-full animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-white/10 rounded-full animate-pulse duration-[6000ms] delay-500" />

        <div className="relative animate-in fade-in zoom-in-95 duration-1000">
          <img
            src={modelImage}
            alt="Especialista Metropolitan"
            className="h-[95vh] w-auto object-contain object-bottom filter brightness-90 contrast-110 drop-shadow-2xl animate-float"
          />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-10 bg-black/40 blur-3xl rounded-[100%] z-[-1]" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0A0F1A] to-transparent z-20" />

  
    </section>
  );
};

export default Hero;