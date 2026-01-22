import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary tracking-wider uppercase">
                EMPRÉSTIMO
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-navy-dark">Crédito que</span>
                <br />
                <span className="text-accent">impulsiona seus</span>
                <br />
                <span className="text-accent">melhores planos</span>
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Use o seu imóvel e tenha acesso ao crédito mais rápido, 
              com o nosso processo simplificado e 100% online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
               
        {/* <Link to="/simulacao">
        <Button className="btn-primary group">
            Simule agora
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
    </Link> */}
            
             
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Casal feliz comemorando conquista do lar"
                className="w-full h-[500px] object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-accent/5 to-transparent"></div>
    </section>
  );
};

export default Hero;