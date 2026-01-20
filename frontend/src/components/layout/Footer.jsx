import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { salonInfo } from '../../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2c2c2c] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src={salonInfo.logo}
                alt="Luna Hair Salon"
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              At Luna Hair Salon, we believe great hair is more than a look—it's a feeling.
              Experience premium hair & beauty services in the heart of Ottawa.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#b8956c] hover:border-[#b8956c] hover:text-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-[#b8956c] hover:border-[#b8956c] hover:text-white transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Contact', 'Book Now'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Book Now' ? '/booking' : `/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#b8956c] transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {['Haircuts & Styling', 'Color Services', 'Hair Treatments', 'Beauty Services'].map(
                (service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-gray-400 hover:text-[#b8956c] transition-colors text-sm"
                    >
                      {service}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-[#b8956c] mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {salonInfo.address}<br />
                  {salonInfo.location}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-[#b8956c] mr-3 flex-shrink-0" />
                <a
                  href={`tel:${salonInfo.phone}`}
                  className="text-gray-400 hover:text-[#b8956c] transition-colors text-sm"
                >
                  {salonInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-[#b8956c] mr-3 flex-shrink-0" />
                <a
                  href={`mailto:${salonInfo.email}`}
                  className="text-gray-400 hover:text-[#b8956c] transition-colors text-sm"
                >
                  {salonInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-[#b8956c] mt-1 mr-3 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>Mon-Fri: {salonInfo.hours.weekdays}</p>
                  <p>Sat: {salonInfo.hours.saturday}</p>
                  <p>Sun: {salonInfo.hours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-xs">
              © {currentYear} Luna Hair Salon. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2 md:mt-0">
              Locally owned, woman-led salon in Ottawa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
