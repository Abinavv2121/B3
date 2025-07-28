import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Saree = () => {
  return (
    <div className="m-0 p-0">
      <Navigation />
      <main className="m-0 p-0">
        {/* Hero Section for Saree */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-6xl lg:text-8xl font-serif font-bold text-white">
              <span className="text-cultural">SAREE</span>
              <br />
              <span className="text-foreground">COLLECTION</span>
            </h1>
            <p className="text-white text-xl lg:text-2xl font-light tracking-widest opacity-90">
              Traditional Elegance Meets Modern Grace
            </p>
          </div>
        </section>

        {/* Saree Categories */}
        <section className="section-padding bg-white">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Discover Our</span>
                <br />
                <span className="text-foreground">Saree Collection</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From handwoven silk to contemporary georgette, explore our curated collection of sarees 
                that celebrate the timeless beauty of Indian tradition.
              </p>
            </div>

            {/* Saree Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Silk Sarees */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-amber-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🕉️</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Silk Sarees</h3>
                  <p className="text-gray-600 mb-4">Luxurious handwoven silk sarees</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹25,999</p>
                </div>
              </div>

              {/* Georgette Sarees */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Georgette Sarees</h3>
                  <p className="text-gray-600 mb-4">Elegant and comfortable daily wear</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹12,999</p>
                </div>
              </div>

              {/* Designer Sarees */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Designer Sarees</h3>
                  <p className="text-gray-600 mb-4">Exclusive designer collections</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹35,999</p>
                </div>
              </div>

              {/* Bridal Sarees */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-red-100 to-pink-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-red-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👰</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Bridal Sarees</h3>
                  <p className="text-gray-600 mb-4">Magnificent bridal collections</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹45,999</p>
                </div>
              </div>

              {/* Party Wear Sarees */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Party Wear</h3>
                  <p className="text-gray-600 mb-4">Glamorous party and festive wear</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹18,999</p>
                </div>
              </div>

              {/* Casual Sarees */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-green-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Casual Sarees</h3>
                  <p className="text-gray-600 mb-4">Comfortable everyday sarees</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹8,999</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Sarees */}
        <section className="section-padding bg-gray-50">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Why Choose</span>
                <br />
                <span className="text-foreground">Our Sarees</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">🎨</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Handcrafted Excellence</h3>
                <p className="text-gray-600">Each saree is meticulously crafted by skilled artisans with decades of experience.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">🌟</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Premium Materials</h3>
                <p className="text-gray-600">We use only the finest silk, georgette, and other premium fabrics for our sarees.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">💎</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Unique Designs</h3>
                <p className="text-gray-600">Exclusive designs that blend traditional motifs with contemporary aesthetics.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Saree; 