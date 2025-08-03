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
      
      {/* Subtle animated luxury fabric texture overlay */}
      <div className="absolute inset-0 z-2">
        <div 
          className="w-full h-full opacity-12"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 80% 70%, rgba(184, 134, 11, 0.06) 0%, transparent 60%),
              radial-gradient(circle at 60% 20%, rgba(255, 215, 0, 0.04) 0%, transparent 60%)
            `,
            animation: 'luxuryFlow 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='hero-luxury' x='0' y='0' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Cpath d='M60 60c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30z' fill='%23D4AF37' fill-opacity='0.03'/%3E%3Cpath d='M60 60c0-16.569 13.431-30 30-30s30 13.431 30 30-13.431 30-30 30-30-13.431-30-30z' fill='%23B8860B' fill-opacity='0.02'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='120' height='120' fill='url(%23hero-luxury)'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
            animation: 'textureShift 15s linear infinite'
          }}
        />
      </div>
      
      {/* Magical sparkly effects */}
      <div className="absolute inset-0 z-3 overflow-hidden pointer-events-none">
        {/* Large floating sparkles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-100 opacity-80"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkleFloat ${Math.random() * 4 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.6)',
              filter: 'blur(0.5px)'
            }}
          />
        ))}
        
        {/* Medium sparkles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`sparkle-med-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-50 opacity-70"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkleFloat ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
              filter: 'blur(0.3px)'
            }}
          />
        ))}
        
        {/* Tiny sparkles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`sparkle-tiny-${i}`}
            className="absolute rounded-full bg-yellow-200 opacity-60"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkleFloat ${Math.random() * 2 + 1}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.4)'
            }}
          />
        ))}
        
        {/* Shooting star effects */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute opacity-40"
            style={{
              left: `${Math.random() * 50}%`,
              top: `${Math.random() * 50}%`,
              animation: `shootingStar ${Math.random() * 8 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
            <div
              className="w-0.5 h-16 bg-gradient-to-b from-yellow-300 to-transparent rounded-full"
              style={{
                transform: 'rotate(25deg)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
                filter: 'blur(0.5px)'
              }}
            />
          </div>
        ))}
      </div>
      
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