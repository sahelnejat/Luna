import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-sm'
            : 'bg-white'
        }`}
      >
        {/* Top Bar */}
        <div className="hidden lg:block bg-[#faf9f7] border-b border-[#e8e6e3]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6 text-[#5a5a5a]">
                <a href={`tel:${salonInfo.phone}`} className="flex items-center hover:text-[#b8956c] transition-colors">
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  {salonInfo.phone}
                </a>
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-2" />
                  {salonInfo.location}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#5a5a5a] hover:text-[#b8956c] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#5a5a5a] hover:text-[#b8956c] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center group z-50">
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
                      ? 'text-[#b8956c]'
                      : 'text-[#2c2c2c] hover:text-[#b8956c]'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#b8956c] animate-line-expand" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
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
              className="lg:hidden p-2 text-[#2c2c2c] hover:text-[#b8956c] transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-white z-50 transform transition-transform duration-500 ease-out shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="p-6 border-b border-[#e8e6e3]">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src={salonInfo.logo}
              alt="Luna Hair Salon"
              className="h-14 w-auto"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-6">
          <ul className="space-y-1">
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                className={`transform transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 75 + 150}ms` : '0ms' }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-lg text-lg font-light tracking-wider uppercase transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-[#b8956c] bg-[#b8956c]/10'
                      : 'text-[#2c2c2c] hover:text-[#b8956c] hover:bg-[#faf9f7]'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#b8956c]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Book Now Button */}
          <div
            className={`mt-6 transform transition-all duration-300 ${
              isMobileMenuOpen 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-4 opacity-0'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '450ms' : '0ms' }}
          >
            <Link
              to="/booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-gold w-full py-4 text-center text-sm tracking-wider uppercase rounded-lg flex items-center justify-center"
            >
              Book Now
            </Link>
          </div>
        </nav>

        {/* Contact Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#e8e6e3] bg-[#faf9f7]">
          <div className="space-y-3">
            <a
              href={`tel:${salonInfo.phone}`}
              className="flex items-center text-[#5a5a5a] hover:text-[#b8956c] transition-colors text-sm"
            >
              <Phone className="w-4 h-4 mr-3 text-[#b8956c]" />
              {salonInfo.phone}
            </a>
            <div className="flex items-start text-[#5a5a5a] text-sm">
              <MapPin className="w-4 h-4 mr-3 text-[#b8956c] mt-0.5 flex-shrink-0" />
              <span>{salonInfo.location}</span>
            </div>
            <div className="flex items-center text-[#5a5a5a] text-sm">
              <Clock className="w-4 h-4 mr-3 text-[#b8956c]" />
              <span>Mon-Fri: {salonInfo.hours.weekdays}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-3 mt-4 pt-4 border-t border-[#e8e6e3]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#b8956c]/30 flex items-center justify-center text-[#b8956c] hover:bg-[#b8956c] hover:text-white transition-all duration-300"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#b8956c]/30 flex items-center justify-center text-[#b8956c] hover:bg-[#b8956c] hover:text-white transition-all duration-300"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
