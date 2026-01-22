import { ShieldCheck, Lock, Eye, FileCheck, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

export default function PaginaSeguranca() {
  return (
    <>
      <Header />
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 text-black py-16 text-center">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Segurança e Proteção de Dados</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-150">
            Na Metropolitan, a sua segurança é nossa prioridade. Utilizamos tecnologia de ponta e seguimos as melhores práticas do mercado para proteger suas informações.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-navy-dark mb-12">Como garantimos sua segurança</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 shadow-md hover:shadow-lg transition-all">
              <CardContent className="flex flex-col items-center text-center">
                <Lock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Criptografia de Dados</h3>
                <p className="text-gray-600">
                  Todas as suas informações são protegidas por criptografia de ponta a ponta, garantindo total sigilo.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-md hover:shadow-lg transition-all">
              <CardContent className="flex flex-col items-center text-center">
                <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Conformidade com a LGPD</h3>
                <p className="text-gray-600">
                  Estamos totalmente alinhados à Lei Geral de Proteção de Dados (Lei nº 13.709/2018), priorizando transparência e consentimento.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-md hover:shadow-lg transition-all">
              <CardContent className="flex flex-col items-center text-center">
                <Eye className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Monitoramento Contínuo</h3>
                <p className="text-gray-600">
                  Nossos sistemas são constantemente monitorados contra acessos indevidos e ameaças cibernéticas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-dark">Boas práticas de segurança</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Algumas recomendações para manter sua conta ainda mais protegida.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-l-4 border-primary bg-gray-50">
              <CardContent className="flex items-start gap-4">
                <FileCheck className="w-8 h-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-dark">Use senhas fortes</h3>
                  <p className="text-gray-600">Combine letras, números e símbolos, e evite repetir senhas em diferentes sites.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-l-4 border-primary bg-gray-50">
              <CardContent className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-dark">Cuidado com golpes</h3>
                  <p className="text-gray-600">A Metropolitan nunca pede senhas ou códigos por e-mail, SMS ou WhatsApp.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-navy-dark text-white py-12 text-center">
        <div className="container-custom">
          <p className="text-lg mb-2">Dúvidas sobre segurança?</p>
          <p className="text-gray-300">
            Entre em contato com nosso suporte:{" "}
            <a href="mailto:suporte.metropolitan@bancometropolitan.com.br" className="text-primary underline">
              suporte.metropolitan@bancometropolitan.com.br
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
