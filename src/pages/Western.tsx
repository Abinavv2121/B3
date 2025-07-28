import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Western = () => {
  return (
    <div className="m-0 p-0">
      <Navigation />
      <main className="m-0 p-0">
        {/* Hero Section for Western Wear */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-6xl lg:text-8xl font-serif font-bold text-white">
              <span className="text-cultural">WESTERN</span>
              <br />
              <span className="text-foreground">WEAR</span>
            </h1>
            <p className="text-white text-xl lg:text-2xl font-light tracking-widest opacity-90">
              Modern Fusion Meets Contemporary Style
            </p>
          </div>
        </section>

        {/* Western Wear Categories */}
        <section className="section-padding bg-white">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Discover Our</span>
                <br />
                <span className="text-foreground">Western Collection</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From trendy crop tops to elegant dresses, explore our contemporary western wear 
                that blends modern fashion with ethnic touches for the perfect fusion look.
              </p>
            </div>

            {/* Western Wear Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Crop Tops & Skirts */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👚</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Crop Tops & Skirts</h3>
                  <p className="text-gray-600 mb-4">Trendy crop top and skirt sets</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹6,999</p>
                </div>
              </div>

              {/* Dresses */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👗</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Dresses</h3>
                  <p className="text-gray-600 mb-4">Elegant western dresses</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹8,999</p>
                </div>
              </div>

              {/* Palazzo Sets */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👖</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Palazzo Sets</h3>
                  <p className="text-gray-600 mb-4">Comfortable palazzo sets</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹7,999</p>
                </div>
              </div>

              {/* Sharara Sets */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-amber-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">💃</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Sharara Sets</h3>
                  <p className="text-gray-600 mb-4">Elegant sharara collections</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹9,999</p>
                </div>
              </div>

              {/* Party Wear */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-red-100 to-pink-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-red-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Party Wear</h3>
                  <p className="text-gray-600 mb-4">Glamorous party collections</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹12,999</p>
                </div>
              </div>

              {/* Casual Wear */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-green-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Casual Wear</h3>
                  <p className="text-gray-600 mb-4">Comfortable everyday wear</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹4,999</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Western Wear */}
        <section className="section-padding bg-gray-50">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Why Choose</span>
                <br />
                <span className="text-foreground">Our Western Wear</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">🌟</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Modern Fusion</h3>
                <p className="text-gray-600">Contemporary designs that blend western trends with ethnic elegance.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Perfect Fit</h3>
                <p className="text-gray-600">Tailored to perfection with comfortable cuts that flatter every body type.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">💎</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Quality Materials</h3>
                <p className="text-gray-600">Crafted from premium fabrics for comfort, durability, and style.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Western; 