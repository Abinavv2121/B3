import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { AutoScrollCarousel } from "@/components/AutoScrollCarousel";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";


/**
 * Home page component with optimized structure and reusable components
 */
const Index = () => {
  return (
    <div className="min-h-screen m-0 p-0">
      <Navigation />
      <main 
        className="m-0 p-0 relative"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #1e3a8a 25%, #3b82f6 40%, #60a5fa 55%, #fbbf24 70%, #fde047 85%, #fef3c7 100%)'
        }}
      >
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
