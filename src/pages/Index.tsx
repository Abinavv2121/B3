import React, { Suspense, lazy, useEffect, useState, useRef } from 'react';
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
const AutoScrollCarousel = lazy(() => import('@/components/AutoScrollCarousel').then(m => ({ default: m.AutoScrollCarousel })));
const CategoryShowcase = lazy(() => import('@/components/CategoryShowcase').then(m => ({ default: m.CategoryShowcase })));
const FeaturedProducts = lazy(() => import('@/components/FeaturedProducts').then(m => ({ default: m.FeaturedProducts })));
import Footer from "@/components/Footer";


/**
 * Home page component with optimized structure and reusable components
 */
// Defer rendering of children until near viewport
const DeferRender: React.FC<{ children: React.ReactNode; rootMargin?: string }> = ({ children, rootMargin = '600px' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible) return; // already rendered
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, { root: null, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref}>{visible ? children : null}</div>;
};

const Index = () => {
  // Idle-prefetch split chunks for ultra-smooth nav
  useEffect(() => {
    const idle = (cb: () => void) => ("requestIdleCallback" in window ? (window as any).requestIdleCallback(cb) : setTimeout(cb, 200));
    idle(() => {
      import('@/components/AutoScrollCarousel');
      import('@/components/CategoryShowcase');
      import('@/components/FeaturedProducts');
    });
  }, []);
  return (
    <div className="min-h-screen m-0 p-0">
      <Navigation />
      <main 
        className="m-0 p-0 relative"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #1e3a8a 25%, #3b82f6 40%, #60a5fa 55%, #fbbf24 70%, #fde047 85%, #fef3c7 100%)'
        }}
      >
        <div className="cv-auto"><HeroSection /></div>
        <DeferRender>
          <div className="cv-auto">
            <Suspense fallback={null}>
              <AutoScrollCarousel />
            </Suspense>
          </div>
        </DeferRender>
        <DeferRender>
          <div className="cv-auto">
            <Suspense fallback={null}>
              <CategoryShowcase />
            </Suspense>
          </div>
        </DeferRender>
        <DeferRender>
          <div className="cv-auto" data-section="featured-collections">
            <Suspense fallback={null}>
              <FeaturedProducts />
            </Suspense>
          </div>
        </DeferRender>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
