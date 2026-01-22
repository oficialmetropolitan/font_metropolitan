import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductTabs />
      <Benefits />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
