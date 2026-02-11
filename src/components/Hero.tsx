import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
       
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary tracking-wider uppercase">
                SOLUÇÕES EM CRÉDITO
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-navy-dark">Crédito que</span>
                <br />
                <span className="text-accent">impulsiona seus</span>
                <br />
                <span className="text-accent">melhores planos</span>
              </h1>
            </div>
            
            <div className="space-y-4">
             
              
              <p className="text-xs text-gray-700 max-w-md leading-relaxed">
                A <strong>Metropolitan</strong> atua como securitizadora de ativos, facilitando o acesso ao crédito em parceria com instituições financeiras autorizadas, garantindo segurança e agilidade na sua operação.
              </p>
            </div>
          </div>


          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Casal feliz comemorando conquista do lar"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-accent/5 to-transparent"></div>
    </section>
  );
};

export default Hero;