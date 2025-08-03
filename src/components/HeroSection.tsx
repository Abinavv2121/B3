import heroImage from "/src/assets/hero.png";
import RotatingText from './RotatingText';

const HeroSection = () => {
  return (
    <section 
      id="hero-section"
      className="relative w-full h-screen bg-cover bg-no-repeat bg-gray-500"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: '65% center'
      }}
    >
      {/* Vignette overlay for bokeh effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 z-5"></div>
      
      {/* Additional corner darkening for stronger vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-black/20 via-transparent to-black/30 z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/30 z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-black/20 via-transparent to-black/30 z-5"></div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-left -mt-16">
          <RotatingText
            texts={['HER.', 'AVAL.']}
            mainClassName="text-white text-[6rem] lg:text-[10rem] font-normal font-['Playfair_Display'] tracking-wider"
            rotationInterval={9000}
          />
        </div>
      </div>
      
      {/* Fixed subtitle positioned independently */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="text-left -mt-16">
          <div className="h-[6rem] lg:h-[10rem]"></div>
                <p className="text-white text-lg lg:text-xl font-thin tracking-widest mt-1 opacity-90" style={{ fontFamily: "'Playfair Display', serif" }}>
        BY B3 FASHION STUDIOS
      </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;