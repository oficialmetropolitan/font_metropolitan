import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Target, Rocket, ShieldCheck, Landmark, Globe, TrendingUp, Layers, ArrowRight } from "lucide-react";
import { HashLink } from 'react-router-hash-link';

const SobreNos = () => {

  return (
    <div className="bg-white min-h-screen selection:bg-primary/10">
      <Header />

      {/* --- HERO: Minimalista & Impactante --- */}
      <section className="relative pt-44 pb-32 bg-[#0A0F1A] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container-custom relative z-10 justify-center flex flex-col items-start items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-white font-bold tracking-[0.3em] text-[11px] uppercase bg-primary/10 px-4 py-2 rounded-full mb-8 inline-block">
              Institutional Excellence
            </span>
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
              Arquitetando o <br />
              <span className="text-gray-500 font-light italic">futuro financeiro.</span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
              A Metropolitan une o rigor do mercado tradicional à agilidade da nova economia digital.
            </p>
          </motion.div>
        </div>
      </section>

      

      {/* --- SEÇÃO 1: Identidade (O Cartão de Visitas) --- */}
      <section className="py-32 relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <motion.div  

            initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} 
            
                 className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-navy-dark tracking-tight leading-tight">
                  Sua jornada merece <br />
                  <span className="text-primary">estratégia e precisão.</span>
                </h2>
                <div className="w-24 h-1 bg-primary"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 text-gray-600 font-light text-lg leading-relaxed">
                <p>
                  A <strong className="font-semibold text-navy-dark">Metropolitan Securitizadora S.A.</strong> foi moldada por executivos que dominam as engrenagens do sistema bancário e de fundos de investimento.
                </p>
                <p>
                  Nascemos para eliminar a lentidão burocrática, entregando velocidade onde o empreendedor mais precisa, sem abrir mão da segurança institucional.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Metropolitan Corporate" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary p-12 rounded-2xl hidden md:block">
                <p className="text-white text-4xl font-bold tracking-tighter">100%</p>
                <p className="text-white/80 text-xs uppercase tracking-widest font-medium">Digital & Seguro</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0A0F1A] text-white overflow-hidden">
  <div className="container-custom">
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      
      <motion.div             initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}  className="relative">
        <div className="absolute -left-4 top-0 w-1 h-full bg-primary/50"></div>
        <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
          Market Intelligence
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          A inteligência por trás da <br />
          <span className="text-gray-500">transformação de ativos.</span>
        </h2>
        <p className="text-gray-400 text-lg font-light leading-relaxed mb-6">
          Diferente de um banco tradicional, que apenas empresta capital próprio, uma <strong>Securitizadora</strong> atua como uma ponte estratégica entre ativos financeiros e o mercado de capitais.
        </p>
        <p className="text-gray-400 text-lg font-light leading-relaxed">
          Nós convertemos fluxos de recebíveis (como parcelas de vendas, aluguéis ou contratos) em títulos negociáveis. Isso gera <strong>liquidez imediata</strong> para quem precisa crescer e segurança para quem busca investir.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            title: "Desbancarização",
            desc: "Menos burocracia e mais agilidade do que os bancos convencionais.",
            icon: <Landmark className="w-6 h-6 text-primary" />
          },
          {
            title: "Liquidez",
            desc: "Transformamos o que você receberia em meses em capital hoje.",
            icon: <TrendingUp className="w-6 h-6 text-primary" />
          },
          {
            title: "Lastro Real",
            desc: "Operações baseadas em garantias sólidas e ativos auditáveis.",
            icon: <ShieldCheck className="w-6 h-6 text-primary" />
          },
          {
            title: "Eficiência",
            desc: "Estruturas personalizadas para cada tipo de fluxo financeiro.",
            icon: <Layers className="w-6 h-6 text-primary" />
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h4 className="font-bold text-white mb-2">{item.title}</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Infográfico Simples (Opcional/Visual) */}
    <div className="mt-20 pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
      <div className="flex flex-col items-center text-center">
        <div className="text-xs tracking-[0.2em] uppercase mb-2">Sua Empresa</div>
        <div className="text-lg font-light italic">Ativos & Contratos</div>
      </div>
      <ArrowRight className="hidden md:block text-primary" />
      <div className="px-6 py-3 border border-primary rounded-full text-primary font-bold text-xs tracking-widest uppercase">
        Metropolitan Securitizadora
      </div>
      <ArrowRight className="hidden md:block text-primary" />
      <div className="flex flex-col items-center text-center">
        <div className="text-xs tracking-[0.2em] uppercase mb-2">Mercado</div>
        <div className="text-lg font-light italic">Capital & Crescimento</div>
      </div>
    </div>
  </div>
</section>

      {/* --- SEÇÃO 2: Pilares (O Diferencial) --- */}
      <section className="py-32 bg-gray-50/50 border-y border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase">O que fazemos</span>
              <h2 className="text-4xl md:text-5xl font-bold text-navy-dark mt-4">Eficiência em Securitização</h2>
            </div>
            <p className="text-gray-500 max-w-sm font-light italic">
              "Transformamos ativos em oportunidades, conectando o capital a quem produz valor."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-1px bg-gray-200 border border-gray-200 rounded-3xl overflow-hidden">
            {[
              { icon: Layers, title: "Estruturação", desc: "Agrupamos ativos de alta qualidade em estruturas financeiras sólidas e rentáveis." },
              { icon: TrendingUp, title: "Acesso ao Capital", desc: "Conexão direta com o mercado de capitais para liquidez imediata de projetos." },
              { icon: Landmark, title: "Segurança Jurídica", desc: "Governança rigorosa e conformidade total com as normas regulatórias." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-12 hover:bg-gray-50 transition-colors group">
                <item.icon className="h-10 w-10 text-primary mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-navy-dark mb-4">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 3: Mapa Minimalista --- */}
      <section className="py-32">
        <div className="container-custom">
          <div className="bg-navy-dark rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="p-16 lg:w-1/2 space-y-8 self-center">
              <h2 className="text-4xl font-bold text-white tracking-tight">Presença Nacional, <br /><span className="text-primary font-light">DNA Mineiro.</span></h2>
              <p className="text-gray-400 font-light text-lg leading-relaxed">
                Sediados em <span className="text-white font-medium italic">Varginha - MG</span>, operamos em escala global através de um ecossistema 100% digital, atendendo as principais capitais do país com a mesma proximidade.
              </p>
              <div className="flex items-center gap-4 text-primary font-bold text-sm tracking-widest uppercase">
                <span>Conheça nossa sede</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
            <div className="lg:w-1/2 h-[500px]  opacity-80 hover:grayscale-0 transition-all duration-1000">
              <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.342640490848!2d-45.446526025134325!3d-21.57254448021638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca92a21557a851%3A0xf9db76be8b720d2!2sR.%20Alvarina%20Frota%2C%2055%20-%20Jardim%20dos%20Passaros%2C%20Varginha%20-%20MG%2C%2037026-670!5e0!3m2!1spt-BR!2sbr!4v1769781636475!5m2!1spt-BR!2sbr"
                className="w-full h-full border-0"
                allowFullScreen 
                loading="lazy" 
              ></iframe>

            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL: Luxo & Conversão --- */}
      <section className="py-32 bg-white text-center">
        <div className="container-custom">
          <motion.div             initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}  className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-6xl font-bold text-navy-dark tracking-tighter">
              Pronto para o próximo <br />grande salto?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button className="w-full sm:w-auto bg-primary hover:bg-navy-dark text-white px-10 py-6 rounded-full font-bold tracking-widest text-xs transition-all duration-500 uppercase shadow-xl shadow-primary/20">
                <a href="/contato">Falar com um especialista</a>
              </button>
              <button className="w-full sm:w-auto bg-transparent border border-navy-dark/10 hover:border-primary text-navy-dark px-10 py-6 rounded-full font-bold tracking-widest text-xs transition-all duration-500 uppercase">
                <HashLink smooth to="/#solucao">Ver soluções</HashLink>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SobreNos;