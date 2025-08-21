import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { AutoScrollCarousel } from "@/components/AutoScrollCarousel";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { GoldDivider } from "@/components/ui/gold-divider";

/**
 * Home page component with optimized structure and reusable components
 */
const Index = () => {
  return (
    <div className="min-h-screen m-0 p-0">
      <Navigation />
      <main className="m-0 p-0">
        <HeroSection />
        <GoldDivider />
        <AutoScrollCarousel />
        <GoldDivider />
        <CategoryShowcase />
        <GoldDivider />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
