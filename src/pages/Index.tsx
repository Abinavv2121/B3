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
        {/* Subtle Gold Divider */}
        <div 
          className="w-full h-0"
          style={{
            borderTop: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 -12px 24px rgba(0,0,0,0.6) inset'
          }}
        />
        <AutoScrollCarousel />
        {/* Gold Divider between Customer Favourites and Category Showcase */}
        <div 
          className="w-full h-0"
          style={{
            borderTop: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 -12px 24px rgba(0,0,0,0.6) inset'
          }}
        />
        <CategoryShowcase />
        {/* Gold Divider between Category Showcase and Featured Products */}
        <div 
          className="w-full h-0"
          style={{
            borderTop: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 -12px 24px rgba(0,0,0,0.6) inset'
          }}
        />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
