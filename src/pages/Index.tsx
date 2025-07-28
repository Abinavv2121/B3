import Navigation from "@/components/Navigation";
import SupportiveToolbar from "@/components/SupportiveToolbar";
import HeroSection from "@/components/HeroSection";
import AutoScrollCarousel from "@/components/AutoScrollCarousel";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import SupabaseTest from "@/components/SupabaseTest";

const Index = () => {
  return (
    <div className="min-h-screen m-0 p-0">
      <SupabaseTest />
      <Navigation />
      <SupportiveToolbar />
      <main className="m-0 p-0">
        <HeroSection />
        <AutoScrollCarousel />
        <CategoryShowcase />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
