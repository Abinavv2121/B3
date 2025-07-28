import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Lehenga = () => {
  return (
    <div className="m-0 p-0">
      <Navigation />
      <main className="m-0 p-0">
        {/* Hero Section for Lehenga */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-6xl lg:text-8xl font-serif font-bold text-white">
              <span className="text-cultural">LEHENGA</span>
              <br />
              <span className="text-foreground">COLLECTION</span>
            </h1>
            <p className="text-white text-xl lg:text-2xl font-light tracking-widest opacity-90">
              Festive Grandeur Meets Modern Elegance
            </p>
          </div>
        </section>

        {/* Lehenga Categories */}
        <section className="section-padding bg-white">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Discover Our</span>
                <br />
                <span className="text-foreground">Lehenga Collection</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From traditional bridal lehengas to contemporary party wear, explore our stunning collection 
                that celebrates the grandeur and beauty of Indian festivals and celebrations.
              </p>
            </div>

            {/* Lehenga Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Bridal Lehengas */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-red-100 to-pink-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-red-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👰</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Bridal Lehengas</h3>
                  <p className="text-gray-600 mb-4">Magnificent bridal collections</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹45,999</p>
                </div>
              </div>

              {/* Designer Lehengas */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Designer Lehengas</h3>
                  <p className="text-gray-600 mb-4">Exclusive designer collections</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹35,999</p>
                </div>
              </div>

              {/* Party Wear Lehengas */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Party Wear</h3>
                  <p className="text-gray-600 mb-4">Glamorous party and festive wear</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹25,999</p>
                </div>
              </div>

              {/* Reception Lehengas */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-amber-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">💫</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Reception Lehengas</h3>
                  <p className="text-gray-600 mb-4">Elegant reception wear</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹30,999</p>
                </div>
              </div>

              {/* Festival Lehengas */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🪔</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Festival Lehengas</h3>
                  <p className="text-gray-600 mb-4">Traditional festival wear</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹20,999</p>
                </div>
              </div>

              {/* Light Lehengas */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-green-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Light Lehengas</h3>
                  <p className="text-gray-600 mb-4">Comfortable light weight wear</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹15,999</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Lehengas */}
        <section className="section-padding bg-gray-50">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Why Choose</span>
                <br />
                <span className="text-foreground">Our Lehengas</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">👑</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Royal Craftsmanship</h3>
                <p className="text-gray-600">Each lehenga is crafted with royal precision, featuring intricate embroidery and premium materials.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">🌟</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Festive Elegance</h3>
                <p className="text-gray-600">Perfect for every celebration, from weddings to festivals, with designs that make you stand out.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">💎</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Luxurious Details</h3>
                <p className="text-gray-600">Adorned with zari work, stone embellishments, and hand-embroidered motifs for a luxurious finish.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Lehenga; 