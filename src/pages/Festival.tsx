import Navigation from "@/components/Navigation";
import SupportiveToolbar from "@/components/SupportiveToolbar";
import Footer from "@/components/Footer";

const Festival = () => {
  return (
    <div className="min-h-screen m-0 p-0">
      <Navigation />
      <SupportiveToolbar />
      <main className="m-0 p-0">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-gradient-to-br from-orange-100 via-yellow-100 to-red-100 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold">
              <span className="text-cultural">Festival</span>
              <br />
              <span className="text-foreground">Glory</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrate every occasion with our vibrant festival collection
            </p>
          </div>
        </section>

        {/* Festival Categories */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Festival</span>
                <br />
                <span className="text-foreground">Collections</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From Diwali to Holi, Eid to Christmas - we have the perfect festive attire for every celebration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Festival Sarees */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-red-100 to-orange-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-red-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎊</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Festival Sarees</h3>
                  <p className="text-gray-600 mb-4">Vibrant sarees for celebrations</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹15,999</p>
                </div>
              </div>

              {/* Festival Suits */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-purple-100 to-pink-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Festival Suits</h3>
                  <p className="text-gray-600 mb-4">Elegant suits for special occasions</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹12,999</p>
                </div>
              </div>

              {/* Festival Lehangas */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-yellow-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Festival Lehangas</h3>
                  <p className="text-gray-600 mb-4">Stunning lehangas for festivities</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹25,999</p>
                </div>
              </div>

              {/* Traditional Wear */}
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-green-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🏮</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Traditional Wear</h3>
                  <p className="text-gray-600 mb-4">Classic traditional ensembles</p>
                  <p className="text-lg font-semibold text-cultural">Starting ₹9,999</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Festival Collection */}
        <section className="section-padding bg-gray-50">
          <div className="container-premium">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold">
                <span className="text-cultural">Why Choose</span>
                <br />
                <span className="text-foreground">Our Festival Collection</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">🎨</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Vibrant Colors</h3>
                <p className="text-gray-600">Bold and beautiful colors that make every festival celebration more special.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">🌟</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Festival Ready</h3>
                <p className="text-gray-600">Perfectly designed for comfort and style during long festival celebrations.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cultural rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white">💎</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Cultural Heritage</h3>
                <p className="text-gray-600">Traditional designs that honor our rich cultural heritage and festivals.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Festival; 