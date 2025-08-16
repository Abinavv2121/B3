import { Link, useNavigate } from "react-router-dom";
import { Crown, Sparkles, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Shield, Truck, CreditCard, HeadphonesIcon } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const handlePageNavigation = (path: string) => {
    navigate(path);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Top fade transition from previous section */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0.6) 50%, rgba(26,26,26,0) 100%)'
        }}
      />
      
      {/* Main footer background */}
      <div 
        className="relative z-10 bg-black/95 backdrop-blur-xl"
      >
        {/* Subtle luxury texture overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='footer-luxury' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M50 50c0-27.614-22.386-50-50-50v100c27.614 0 50-22.386 50-50z' fill='%23D4AF37' fill-opacity='0.15'/%3E%3Cpath d='M50 50c0-27.614 22.386-50 50-50v100c-27.614 0-50-22.386-50-50z' fill='%23B8860B' fill-opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23footer-luxury)'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
        
        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="w-full px-4 lg:px-8 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto">
                              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                
                {/* Brand Section */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/src/assets/brand-logo.png" 
                        alt="B3 Fashion Studio Logo" 
                        className="h-20 w-auto"
                      />
                      <div className="flex items-center space-x-2">
                        <Crown className="w-6 h-6 text-yellow-500" />
                        <span className="text-sm font-medium tracking-widest uppercase text-yellow-500">
                          Premium Ethnic Wear
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-white/80 leading-relaxed font-light tracking-wide max-w-sm">
                      Crafting timeless elegance through premium ethnic wear. Every piece tells a story of tradition, luxury, and contemporary sophistication.
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: '#D4AF37',
                          border: '2px solid #B8860B'
                        }}
                      >
                        <Phone className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-white font-medium">+91 98765 43210</p>
                        <p className="text-white/60 text-sm">24/7 Support</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: '#D4AF37',
                          border: '2px solid #B8860B'
                        }}
                      >
                        <Mail className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-white font-medium">hello@aval.com</p>
                        <p className="text-white/60 text-sm">Email Support</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: '#D4AF37',
                          border: '2px solid #B8860B'
                        }}
                      >
                        <MapPin className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <a 
                          href="https://maps.google.com/?q=14,+285,+Purasaivakkam+High+Rd,+Perumalpet,+Purasaiwakkam,+Chennai,+Tamil+Nadu+600007"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
                        >
                          Chennai, Tamil Nadu
                        </a>
                        <p className="text-white/60 text-sm">Head Office</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-3">
                    <h4 className="text-white font-medium tracking-wider">Follow Us</h4>
                    <div className="flex space-x-4">
                      {[
                        { icon: Facebook, href: "#", label: "Facebook" },
                        { icon: Twitter, href: "#", label: "Twitter" },
                        { icon: Instagram, href: "#", label: "Instagram" },
                        { 
                          icon: ({ className }: { className?: string }) => (
                            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                            </svg>
                          ), 
                          href: "#", 
                          label: "Pinterest" 
                        }
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#D4AF37';
                            e.currentTarget.style.border = '1px solid #B8860B';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <social.icon className="w-5 h-5 text-white" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Shop Links */}
                <div className="space-y-6">
                  <h4 
                    className="text-xl font-['Playfair_Display'] font-medium tracking-wider"
                    style={{ color: '#D4AF37' }}
                  >
                    Shop
                  </h4>
                  <div className="space-y-4">
                    {[
                      { name: "Sarees", href: "/saree" },
                      { name: "Anarkalis", href: "/anarkali" },
                      { name: "Lehengas", href: "/lehenga" },
                      { name: "Salwar Suits", href: "/salwar-suit" },
                      { name: "Western Wear", href: "/western" },
                      { name: "Bridal Collection", href: "/bridal" }
                    ].map((link) => (
                      <button
                        key={link.name}
                        onClick={() => handlePageNavigation(link.href)}
                        className="block text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide font-['Italiana', serif] text-left w-full"
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Care */}
                <div className="space-y-6">
                  <h4 
                    className="text-xl font-['Playfair_Display'] font-medium tracking-wider"
                    style={{ color: '#D4AF37' }}
                  >
                    Customer Care
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: "Contact Us", href: "/contact" },
                      { name: "Size Guide", href: "/size-guide" },
                      { name: "Shipping Info", href: "/shipping" },
                      { name: "Returns & Exchanges", href: "/returns" }
                    ].map((link) => (
                      <button
                        key={link.name}
                        onClick={() => handlePageNavigation(link.href)}
                        className="block text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide font-['Italiana', serif] text-left w-full"
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Legal */}
                <div className="space-y-6">
                  <h4 
                    className="text-xl font-['Playfair_Display'] font-medium tracking-wider"
                    style={{ color: '#D4AF37' }}
                  >
                    Legal
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: "Privacy Policy", href: "/privacy" },
                      { name: "Terms of Service", href: "/terms" },
                      { name: "Cookie Policy", href: "/cookies" },
                      { name: "Accessibility", href: "/accessibility" }
                    ].map((link) => (
                      <button
                        key={link.name}
                        onClick={() => handlePageNavigation(link.href)}
                        className="block text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide font-['Italiana', serif] text-left w-full"
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* Bottom Bar */}
          <div 
            className="border-t border-white/10"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            <div className="w-full px-4 lg:px-8 py-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                  <div className="text-center lg:text-left">
                    <p className="text-white/60 font-light tracking-wide">
                      © 2024 Aval. All rights reserved. Crafted with elegance and precision.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <span className="text-white/60">Made in India</span>
                    <span 
                      className="text-yellow-500"
                      style={{ fontSize: '18px' }}
                    >
                      •
                    </span>
                    <span className="text-white/60">Handcrafted Excellence</span>
                    <span 
                      className="text-yellow-500"
                      style={{ fontSize: '18px' }}
                    >
                      •
                    </span>
                    <Link 
                      to="/admin" 
                      className="text-white/60 hover:text-yellow-500 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <Crown className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;