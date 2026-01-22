import { CheckCircle, Shield, Zap, Users } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Facilidade e transparência",
      description: "Consiga crédito com agilidade e clareza para realizar os seus projetos com confiança."
    },
    {
      icon: Zap,
      title: "Flexibilidade",
      description: "Diferentes opções de crédito adaptadas às suas necessidades específicas."
    },
    {
      icon: Shield,
      title: "Soluções tecnológicas",
      description: "Processo 100% digital com segurança e praticidade em todas as etapas."
    },
    {
      icon: Users,
      title: "Atendimento humanizado",
      description: "Suporte especializado para tirar suas dúvidas e orientar suas decisões."
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">
            Vantagens
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Por que escolher a Metropolitan para realizar seus projetos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-navy-dark">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;