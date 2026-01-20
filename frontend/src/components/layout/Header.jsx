import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { salonInfo } from '../../data/mock';

const MILANO_BOOKING_URL = "https://milanoweb.milanocloud.com:1443/index.html?store=7bbffaa5-ecd4-4b93-a5b5-665ea16d281c";

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

  const leftNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#1a1a1a]/98 backdrop-blur-lg shadow-lg'
            : 'bg-[#1a1a1a]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1">
              {leftNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-[#b8956c]'
                      : 'text-white/80 hover:text-[#b8956c]'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#b8956c]" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#b8956c] transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Center Logo */}
            <Link to="/" className="flex items-center justify-center group">
              <img
                src={salonInfo.logo}
                alt="Luna Hair Salon"
                className="h-14 lg:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-end">
              <Link
                to="/contact"
                className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                  isActive('/contact')
                    ? 'text-[#b8956c]'
                    : 'text-white/80 hover:text-[#b8956c]'
                }`}
              >
                Contact
              </Link>
              <a
                href={`tel:${salonInfo.phone}`}
                className="flex items-center text-white/80 hover:text-[#b8956c] transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{salonInfo.phone}</span>
              </a>
              <a
                href={MILANO_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#b8956c] hover:bg-[#a07d5c] text-white px-6 py-3 text-sm font-medium tracking-wider uppercase rounded-sm transition-all duration-300"
              >
                Book Now
              </a>
            </div>

            {/* Mobile Book Now */}
            <a
              href={MILANO_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden bg-[#b8956c] hover:bg-[#a07d5c] text-white px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-sm transition-all duration-300"
            >
              Book
            </a>
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
        className={`lg:hidden fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-[#1a1a1a] z-50 transform transition-transform duration-500 ease-out shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="p-6 border-b border-white/10">
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
          <ul className="space-y-2">
            {[...leftNavLinks, { name: 'Contact', path: '/contact' }].map((link, index) => (
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
                      : 'text-white/80 hover:text-[#b8956c] hover:bg-white/5'
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
            className={`mt-8 transform transition-all duration-300 ${
              isMobileMenuOpen 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-4 opacity-0'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '450ms' : '0ms' }}
          >
            <a
              href={MILANO_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#b8956c] hover:bg-[#a07d5c] text-white py-4 text-center text-sm font-medium tracking-wider uppercase rounded-lg transition-all duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Phone */}
          <div className="mt-6">
            <a
              href={`tel:${salonInfo.phone}`}
              className="flex items-center justify-center text-white/60 hover:text-[#b8956c] transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">{salonInfo.phone}</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
