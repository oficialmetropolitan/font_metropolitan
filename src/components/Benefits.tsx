import { CheckCircle, Shield, Zap, Users, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const Benefits = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Transparência Absoluta",
      description: "Operações estruturadas com clareza total em cada etapa, garantindo previsibilidade e segurança."
    },
    {
      icon: Zap,
      title: "Agilidade Estrutural",
      description: "Como securitizadora, transformamos processos burocráticos em fluxos ágeis e 100% digitais."
    },
    {
      icon: Shield,
      title: "Segurança de Ativos",
      description: "Tecnologia de ponta na custódia de dados e na formalização de garantias reais para sua tranquilidade."
    },
    {
      icon: Users,
      title: "Wealth Management",
      description: "Atendimento especializado focado em entender sua saúde financeira e oferecer a melhor estratégia."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="space-y-4">
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">
              Excelência Operacional
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy-dark tracking-tighter">
              A Diferença <span className="text-gray-400 font-light">Metropolitan</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-lg font-light leading-relaxed">
            Unimos o rigor do mercado de capitais à agilidade das fintechs para criar uma experiência de crédito superior.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-gray-100">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative p-10 border-b md:border-r border-gray-100 transition-all duration-500 hover:bg-navy-dark overflow-hidden"
            >
  
              <div className="absolute bottom-0 left-0 w-full h-0 bg-primary group-hover:h-1 transition-all duration-500"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-white/10 group-hover:rotate-[360deg] transition-all duration-700">
                  <benefit.icon className="w-6 h-6 text-primary group-hover:text-accent group-hover:text-white " />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-navy-dark group-hover:text-white transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>

            
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
            Modelo de Securitização e Inteligência Financeira Autorizada
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;