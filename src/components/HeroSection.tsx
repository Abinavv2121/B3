import heroImage from "/src/assets/hero.png";
import RotatingText from './RotatingText';

const HeroSection = () => {
  return (
    <section 
      id="hero-section"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Main hero image - full opacity */}
      <div 
        className="absolute inset-0 z-1 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: '65% center'
        }}
      ></div>

      {/* Static overlay for readability */}
      <div className="absolute inset-0 z-2 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      
      {/* Additional gentle corner shading */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 z-5" />
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-left -mt-16">
          <RotatingText
            texts={['HER.', 'AVAL.']}
            mainClassName="text-white/95 drop-shadow-[0_4px_28px_rgba(0,0,0,0.45)] text-[6rem] lg:text-[9rem] font-normal font-['Playfair_Display'] tracking-[0.06em]"
            rotationInterval={9000}
          />
        </div>
      </div>
      
      {/* Fixed subtitle positioned independently */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="text-left -mt-16">
          <div className="h-[6rem] lg:h-[10rem]"></div>
                <p className="text-white/90 text-lg lg:text-xl font-light tracking-[0.25em] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  BY B3 FASHION STUDIOS
                </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;