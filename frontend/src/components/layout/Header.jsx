import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { salonInfo } from '../../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0d0d0f]/95 backdrop-blur-lg shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={salonInfo.logo}
              alt="Luna Hair Salon"
              className="h-12 lg:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-[#c9a96e]'
                    : 'text-[#f7f5f2] hover:text-[#c9a96e]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#c9a96e] animate-line-expand" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href={`tel:${salonInfo.phone}`}
              className="flex items-center text-[#bbb5ae] hover:text-[#c9a96e] transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">{salonInfo.phone}</span>
            </a>
            <Link
              to="/booking"
              className="btn-gold px-6 py-3 text-sm tracking-wider uppercase rounded-sm"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#f7f5f2] hover:text-[#c9a96e] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-[#0d0d0f]/98 backdrop-blur-xl transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 pb-20">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-2xl font-light tracking-widest uppercase transition-all duration-300 ${
                isActive(link.path) ? 'text-[#c9a96e]' : 'text-[#f7f5f2]'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking"
            className="btn-gold px-8 py-4 text-lg tracking-wider uppercase rounded-sm mt-8"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
