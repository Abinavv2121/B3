import { useState, useEffect } from 'react';
import heroImage from "/src/assets/hero.png";

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of hero images to cycle through (replacing the text)
  const heroImages = [
    "/src/assets/1.png",
    "/src/assets/2.png", 
    "/src/assets/3.png",
    "/src/assets/4.png",
    "/src/assets/5.png"
  ];

  // Cycle through images every 5 seconds
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // avoid background timers on low-end/PRM devices
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section 
      id="hero-section"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Original background image */}
      <div 
        className="absolute inset-0 z-1 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: '65% center'
        }}
      ></div>

      {/* Static overlay for readability */}
      <div className="absolute inset-0 z-2 bg-gradient-to-b from-black/50 via-black/20 to-black/60 will-change-opacity" />
      
      {/* Additional gentle corner shading */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 z-5" />
      
      {/* Cycling hero images (replacing the text) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-left -mt-16">
          {heroImages.map((image, index) => (
            <div 
              key={image}
              className={`transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 'auto',
                maxWidth: '80%',
                maxHeight: '80%'
              }}
            >
              <img 
                src={image} 
                alt={`Hero Image ${index + 1}`}
                className="w-auto h-auto max-w-full max-h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 4px 28px rgba(0,0,0,0.45))'
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Fixed subtitle positioned independently */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="text-left -mt-16">
          <div className="h-[6rem] lg:h-[10rem]"></div>
                <p className="text-white/90 text-lg lg:text-xl font-light tracking-[0.25em] mt-32" style={{ fontFamily: "Inter, sans-serif" }}>
                  BY B3 FASHION STUDIO
                </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;