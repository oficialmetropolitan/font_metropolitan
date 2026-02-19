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
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] blur-[150px] rounded-full" />
      </div>


      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center gap-12">
   
          <div className="max-w-2xl py-20 animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
            

            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gray-200/40 border border-blue-500/20 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="text-[10px] font-semibold tracking-[0.25em] text-white/70 uppercase">
                Metropolitan Securitizadora S.A.
              </span>
            </div>

            {/* Heading & Description */}
            <div className="mt-8 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
                O crédito que impulsiona seus planos.
              </h1>

              <p className="text-base md:text-lg text-gray-100 max-w-lg leading-relaxed font-light">
                Atuamos na securitização de ativos com agilidade e segurança, conectando suas metas às melhores soluções financeiras do mercado.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
                  <a  href="https://wa.me/5535997446658?text=Olá! Vim pelo site da Metropolitan e gostaria de receber mais informações sobre as soluções de crédito. Poderia me orientar, por favor?" target="_blank"  > 
              <Button className="h-12 px-8 bg-[#2F3247] hover:bg-blue-800 text-white rounded-full transition-all duration-300 shadow-lg shadow-blue-600/20 group">
                Falar com especialista
                
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
                  </a> 
              <a 
                href="/#solucao" 
                className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors group"
              >
                Explorar Soluções
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Footer Info */}
            <div className="mt-16 pt-8 border-t border-white/30">
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

      {/* Right Side - Model Image */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:flex items-end justify-end select-none">
        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/30 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-white/30 rounded-full pointer-events-none" />


       <img
          src={modelImage}
          alt="Especialista Metropolitan"
          className="h-[95vh] w-auto object-contain object-bottom filter brightness-90 contrast-110"
    
        />
        
        {/* Shadow Effect */}
        <div className="absolute bottom-10 right-[15%] w-[40%] h-20 bg-black/40 blur-2xl rounded-full" />
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0A0F1A] to-transparent z-20" />
    </section>
  );
};

export default Hero;