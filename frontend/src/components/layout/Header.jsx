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
            ? 'bg-[#0d0d0f]/95 backdrop-blur-lg shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
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
              className="lg:hidden p-2 text-[#f7f5f2] hover:text-[#c9a96e] transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-[#0d0d0f] z-50 transform transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="p-6 border-b border-[#c9a96e]/10">
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
                      ? 'text-[#c9a96e] bg-[#c9a96e]/10'
                      : 'text-[#f7f5f2] hover:text-[#c9a96e] hover:bg-[#c9a96e]/5'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
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
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#c9a96e]/10 bg-[#0d0d0f]">
          <div className="space-y-3">
            <a
              href={`tel:${salonInfo.phone}`}
              className="flex items-center text-[#bbb5ae] hover:text-[#c9a96e] transition-colors text-sm"
            >
              <Phone className="w-4 h-4 mr-3 text-[#c9a96e]" />
              {salonInfo.phone}
            </a>
            <div className="flex items-start text-[#bbb5ae] text-sm">
              <MapPin className="w-4 h-4 mr-3 text-[#c9a96e] mt-0.5 flex-shrink-0" />
              <span>{salonInfo.location}</span>
            </div>
            <div className="flex items-center text-[#bbb5ae] text-sm">
              <Clock className="w-4 h-4 mr-3 text-[#c9a96e]" />
              <span>Mon-Fri: {salonInfo.hours.weekdays}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-3 mt-4 pt-4 border-t border-[#c9a96e]/10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0d0d0f] transition-all duration-300"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0d0d0f] transition-all duration-300"
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
