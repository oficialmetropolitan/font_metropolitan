// src/pages/SobreNos.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Target, Rocket, ShieldCheck, Landmark, Globe, Link } from "lucide-react";
import { Button } from "react-day-picker";

const SobreNos = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* --- HERO: O Salto de Confiança --- */}
      <section className="relative pt-32 pb-48 bg-navy-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-accent font-bold tracking-[0.4em] text-[12px] uppercase px-4 py-2 border border-accent/30 rounded-full text-white">
              Sobre a Metropolitan
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight max-w-4xl mx-auto">
              Transformamos desafios em <br />
              <span className="text-gray-400 font-light italic">oportunidades financeiras.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Unimos experiência no mercado bancário à agilidade da securitização digital para impulsionar sua jornada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SEÇÃO 1: Identidade e Propósito --- */}
      <section className="py-24 -mt-32 relative z-20">
        <div className="container-custom">
          <div className="bg-white rounded-[48px] shadow-2xl border border-gray-100 p-10 md:p-20 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-navy-dark tracking-tight">
                  Sua jornada financeira <br />
                  <span className="text-primary">merece saltos determinados.</span>
                </h2>
                <div className="w-20 h-1.5 bg-accent rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                <p>
                  A <strong>Metropolitan Securitizadora S.A.</strong> nasceu da visão de executivos com experiência nos segmentos bancário e de fundos de investimento. Entendemos que o mercado tradicional muitas vezes impõe passos lentos onde o empreendedor precisa de velocidade.
                </p>
                <p>
                  Atuamos como o parceiro ideal para empresas e indivíduos, garantindo <strong>segurança e transparência</strong> enquanto buscamos criar valor real para a sociedade através da otimização do capital.
                </p>
              </div>

          
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-8 rounded-3xl space-y-3 hover:bg-white hover:shadow-xl transition-all duration-500">
                  <Target className="h-8 w-8 text-primary" />
                  <h4 className="font-bold text-navy-dark">Missão</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">Ser o principal parceiro em gestão financeira e estruturação de ativos com excelência.</p>
                </div>
                <div className="bg-navy-dark p-8 rounded-3xl space-y-3 text-white translate-y-8">
                  <Rocket className="h-8 w-8 text-[#038fff] " />
                  <h4 className="font-bold">Visão</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">Ser referência nacional em alta performance e agilidade na concessão de crédito estruturado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 2: Diferenciais (Estilo Jump) --- */}
      <section className="py-24 bg-gray-50/50">
        <div className="container-custom">
          <div className="text-center mb-16">
             <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase">Nossa Filosofia</span>
             <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mt-2">Gestão de Excelência</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6 group hover:bg-navy-dark transition-all duration-500 ">
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white/10 group-hover:text-accent">
                <ShieldCheck className="h-7 w-7   group-hover:text-white " />
              </div>
              <h3 className="text-xl font-bold text-navy-dark group-hover:text-white transition-colors">Governança Rigorosa</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 font-light leading-relaxed transition-colors">
                Políticas operacionais e governança corporativa sólidas para assegurar resultados consistentes e segurança aos nossos parceiros.
              </p>
            </div>

            <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6 group hover:bg-navy-dark transition-all duration-500">
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white/10 group-hover:text-accent">
                <Globe className="h-7 w-7  group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-dark group-hover:text-white transition-colors ">Atendimento Próximo</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 font-light leading-relaxed transition-colors">
                Personalização e foco no negócio do cliente. Atuamos estrategicamente nas principais regiões do Brasil com agilidade digital.
              </p>
            </div>

            <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6 group hover:bg-navy-dark transition-all duration-500">
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white/10 group-hover:text-accent">
                <Landmark className="h-7 w-7 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-dark group-hover:text-white transition-colors">Mitigação de Riscos</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 font-light leading-relaxed transition-colors">
                Realizamos uma gestão conservadora, diversificando nossa atuação para manter a qualidade das operações e a longevidade do grupo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 3: Onde Estamos --- */}

    
      <section className="py-24">
        <div className="container-custom">
           <div className="bg-gray-50 rounded-[40px] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold text-[#0000ff] tracking-tight">Onde estamos</h2>
                <p className="text-gray-600 font-light leading-relaxed">
               Estamos localizados em  Vaginha - Minas Gerais, operando em um modelo full digital para melhor atender nossos clientes.
                </p>
                <div className="flex gap-4">
                   
                </div>
              </div>
        <div className="flex-1 w-full h-[350px]">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231.8953668337588!2d-45.44689987908013!3d-21.573199504352065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca92a21557a851%3A0xf9db76be8b720d2!2sR.%20Alvarina%20Frota%2C%2055%20-%20Jardim%20dos%20Passaros%2C%20Varginha%20-%20MG%2C%2037026-670!5e0!3m2!1spt-BR!2sbr!4v1769518612141!5m2!1spt-BR!2sbr" 
            className="w-full h-full border-0"
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
</div>
           </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-24 bg-navy-dark text-center  border-b border-white/20 pb-20 ">
         <div className="container-custom space-y-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter max-w-2xl mx-auto">
              Construa o próximo capítulo da sua empresa conosco.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
       
              <button  className="bg-primary hover:bg-white hover:text-navy-dark text-white px-12 py-5 rounded-full font-bold tracking-widest text-xs transition-all duration-500">
               <a href="/contato">
                FALAR COM ESPECIALISTA
                </a>
              </button>
            
              <button className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-12 py-5 rounded-full font-bold tracking-widest text-xs transition-all duration-500 uppercase">
              <a href="/#solucao">
                Conhecer Soluções
                </a>
              </button>
            </div>
         </div>
      </section>
   

      <Footer />
    </div>
  );
};

export default SobreNos;