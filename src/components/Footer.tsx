import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Star,
  Award,
  Shield
} from "lucide-react";
import brandLogo from "/src/assets/brand-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Bridal Dreams", href: "/bridal" },
      { name: "Festival Glory", href: "/festival" },
      { name: "Special Moments", href: "/special" },
      { name: "Western Edge", href: "/western" },
      { name: "New Arrivals", href: "/new-arrivals" },
      { name: "Sale", href: "/sale" }
    ],
    help: [
      { name: "Size Guide", href: "/size-guide" },
      { name: "Care Instructions", href: "/care" },
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "Track Your Order", href: "/track" },
      { name: "Customer Reviews", href: "/reviews" },
      { name: "FAQs", href: "/faq" }
    ],
    company: [
      { name: "About B3", href: "/about" },
      { name: "Our Craftsmen", href: "/craftsmen" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Refund Policy", href: "/refund" },
      { name: "Cookie Policy", href: "/cookies" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/b3fashionstudio/", color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/b3fashionstudio?igsh=MWQxY3Y1bTN0NWFuZg==", color: "hover:text-pink-600" }
  ];

  const trustBadges = [
    { icon: Shield, text: "Secure Payments" },
    { icon: Award, text: "Premium Quality" },
    { icon: Star, text: "4.9★ Rated" },
    { icon: Heart, text: "50K+ Happy Customers" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* Main Footer Content */}
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center">
              <img
                src={brandLogo}
                alt="B3 Fashion Studio"
                className="h-16 w-auto"
              />
            </Link>
            
            <p className="text-white/80 leading-relaxed">
              Where cultural heritage meets contemporary elegance. 
              Crafting timeless ethnic wear for the modern Indian woman since 2020.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/80">
                <MapPin className="h-5 w-5 text-primary" />
                <span>14, 285, Purasaivakkam High Rd, Perumalpet, Purasaiwakkam, Chennai, Tamil Nadu 600007</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Phone className="h-5 w-5 text-primary" />
                <span>9884091314 / 044-42661314</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Mail className="h-5 w-5 text-primary" />
                <span>hello@b3ethnic.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Customer Care</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-premium py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {currentYear} B3 Premium Ethnic Wear. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <span>Crafted with ❤️ in India</span>
              <span>•</span>
              <span>Made for Global Fashion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;