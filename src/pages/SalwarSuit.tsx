import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SalwarSuit = () => {
  return (
    <div className="m-0 p-0">
      <Navigation />
      <main className="m-0 p-0">
        {/* Hero Section for Salwar Suit */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-6xl lg:text-8xl font-serif font-bold text-white">
              <span className="text-cultural">SALWAR SUIT</span>
              <br />
              <span className="text-foreground">COLLECTION</span>
            </h1>
            <p className="text-white text-xl lg:text-2xl font-light tracking-widest opacity-90">
              Comfort Meets Style in Perfect Harmony
            </p>
          </div>
        </section>

        {/* Salwar Suit Categories */}
        <section className="section-padding bg-white">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Discover Our</span>
                <br />
                <span className="text-foreground">Salwar Suit Collection</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From traditional suits to contemporary designs, explore our versatile collection 
                that offers the perfect blend of comfort, style, and elegance for every occasion.
              </p>
            </div>

            {/* Salwar Suit Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Traditional Salwar Suits */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-emerald-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🕉️</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Traditional Suits</h3>
                  <p className="text-gray-600 mb-4">Classic traditional designs</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹8,999</p>
                </div>
              </div>

              {/* Designer Salwar Suits */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Designer Suits</h3>
                  <p className="text-gray-600 mb-4">Exclusive designer collections</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹15,999</p>
                </div>
              </div>

              {/* Party Wear Suits */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Party Wear</h3>
                  <p className="text-gray-600 mb-4">Glamorous party and festive wear</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹12,999</p>
                </div>
              </div>

              {/* Casual Salwar Suits */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Casual Suits</h3>
                  <p className="text-gray-600 mb-4">Comfortable everyday wear</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹6,999</p>
                </div>
              </div>

              {/* Office Wear Suits */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-gray-100 to-slate-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">💼</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Office Wear</h3>
                  <p className="text-gray-600 mb-4">Professional and elegant</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹9,999</p>
                </div>
              </div>

              {/* Wedding Suits */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-red-100 to-pink-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-red-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👰</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Wedding Suits</h3>
                  <p className="text-gray-600 mb-4">Elegant wedding collections</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹18,999</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Salwar Suits */}
        <section className="section-padding bg-gray-50">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Why Choose</span>
                <br />
                <span className="text-foreground">Our Salwar Suits</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Perfect Fit</h3>
                <p className="text-gray-600">Tailored to perfection with comfortable cuts that flatter every body type.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">🌟</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Versatile Style</h3>
                <p className="text-gray-600">From casual to formal, our suits are perfect for every occasion and setting.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">💎</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Quality Craftsmanship</h3>
                <p className="text-gray-600">Meticulously crafted with attention to detail and premium materials.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default SalwarSuit; 