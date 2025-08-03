import Navigation from "@/components/Navigation";
import SupportiveToolbar from "@/components/SupportiveToolbar";
import Footer from "@/components/Footer";

const Special = () => {
  return (
    <div className="min-h-screen m-0 p-0">
      <Navigation />
      <SupportiveToolbar />
      <main className="m-0 p-0">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold">
              <span className="text-cultural">Special</span>
              <br />
              <span className="text-foreground">Moments</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create unforgettable memories with our elegant special occasion collection
            </p>
          </div>
        </section>

        {/* Special Moments Categories */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Special</span>
                <br />
                <span className="text-foreground">Collections</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From birthdays to anniversaries, graduations to promotions - every special moment deserves the perfect outfit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Party Wear */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Party Wear</h3>
                  <p className="text-gray-600 mb-4">Glamorous party ensembles</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹18,999</p>
                </div>
              </div>

              {/* Occasion Wear */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-indigo-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Occasion Wear</h3>
                  <p className="text-gray-600 mb-4">Elegant occasion dresses</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹22,999</p>
                </div>
              </div>

              {/* Celebration Dresses */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎊</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Celebration Dresses</h3>
                  <p className="text-gray-600 mb-4">Stunning celebration attire</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹28,999</p>
                </div>
              </div>

              {/* Special Events */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-emerald-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Special Events</h3>
                  <p className="text-gray-600 mb-4">Exclusive event collections</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹35,999</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Special Moments Collection */}
        <section className="section-padding bg-gray-50">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Why Choose</span>
                <br />
                <span className="text-foreground">Our Special Moments Collection</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">💫</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Memorable Design</h3>
                <p className="text-gray-600">Each piece is designed to make your special moments even more memorable and magical.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">👗</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Perfect Fit</h3>
                <p className="text-gray-600">Tailored to perfection ensuring you look and feel your best on every special occasion.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">💎</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Premium Quality</h3>
                <p className="text-gray-600">Luxurious fabrics and exquisite craftsmanship for the most important moments of your life.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Special; 