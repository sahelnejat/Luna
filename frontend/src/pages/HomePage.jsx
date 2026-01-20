import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Scissors, Palette, Sparkles, Star } from 'lucide-react';
import { services, testimonials, salonInfo, salonImages } from '../data/mock';

const MILANO_BOOKING_URL = "https://milanoweb.milanocloud.com:1443/index.html?store=lunasalon";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    salonImages.glamorousHair,
    salonImages.stylistWorking,
    salonImages.hairTreatment
  ];

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Slideshow */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Slideshow Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt="Luna Hair Salon"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        {/* Static Centered Content */}
        <div className="relative z-10 text-center px-6">
          {/* Luna Logo */}
          <img
            src={salonInfo.logo}
            alt="Luna Hair Salon"
            className="h-44 md:h-60 lg:h-80 w-auto mx-auto mb-8"
          />
          
          {/* Tagline */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 tracking-wide">
            We want you to <span className="italic text-[#b8956c]">love your look</span>
          </h1>
          
          <p className="text-white/70 text-base md:text-lg mb-10 max-w-md mx-auto">
            Expert hair care and styling in the heart of Ottawa
          </p>
          
          {/* Book Now Button */}
          <a
            href={MILANO_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#b8956c] hover:bg-[#a07d5c] text-white px-10 py-4 text-sm font-medium tracking-wider uppercase rounded-sm inline-flex items-center justify-center group transition-all duration-300"
            data-testid="hero-book-now-btn"
          >
            Book Now
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#b8956c] w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-12 bg-[#faf9f7] border-y border-[#e8e6e3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center flex-wrap gap-12 opacity-50">
            {['Davines', 'Olaplex', 'Redken', 'Kérastase', 'Moroccanoil'].map((brand) => (
              <span key={brand} className="text-[#5a5a5a] text-sm uppercase tracking-widest font-medium">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                    <img
                      src={salonImages.stylistWorking}
                      alt="Professional styling"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                    <img
                      src={salonImages.hairTreatment}
                      alt="Hair treatment"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#b8956c]/20 rounded-xl -z-10" />
            </div>

            {/* Content */}
            <div>
              <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
                About Us
              </p>
              <h2 className="text-3xl lg:text-5xl font-light text-[#2c2c2c] mb-6 leading-tight">
                A unique salon experience
              </h2>
              <p className="text-[#5a5a5a] text-lg leading-relaxed mb-6">
                At Luna Hair Salon, we believe great hair is more than a look—it's a feeling. 
                Located in the heart of Ottawa at CF Rideau Centre, our salon is a space where 
                beauty meets care and creativity.
              </p>
              <p className="text-[#5a5a5a] leading-relaxed mb-8">
                Our philosophy is simple. As a locally owned, woman-led business, we believe 
                in creating an inclusive space where every person who steps through our doors 
                feels like family.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-[#b8956c] font-medium group"
              >
                <span className="mr-2">Learn more about us</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 lg:py-32 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
              Our Services
            </p>
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
              What we offer
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We are happy to offer a full range of services in the salon, from bang trims to balayage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Scissors, title: 'Haircuts & Styling', desc: 'Expert cuts, blowouts, and styling for any occasion', image: salonImages.stylistWorking },
              { icon: Palette, title: 'Color Services', desc: 'From highlights to balayage, we create your perfect color', image: salonImages.glamorousHair },
              { icon: Sparkles, title: 'Hair Treatments', desc: 'Keratin, deep conditioning, and restorative treatments', image: salonImages.hairTreatment },
              { icon: Star, title: 'Beauty Services', desc: 'Makeup, brows, lashes, and more to complete your look', image: salonImages.eyebrowTreatment },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-[#252525] rounded-xl overflow-hidden hover:bg-[#2a2a2a] transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-full bg-[#b8956c]/20 flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-[#b8956c]" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{service.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{service.desc}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-[#b8956c] text-sm font-medium group/link"
                  >
                    <span className="mr-2">View services</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#b8956c]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
            Ready for your transformation?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book your appointment today and let our expert stylists help you look and feel amazing.
          </p>
          <a
            href={MILANO_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a1a1a] hover:bg-black text-white px-10 py-4 text-sm font-medium tracking-wider uppercase rounded-sm inline-flex items-center group transition-all duration-300"
          >
            Book Now
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
              Pricing
            </p>
            <h2 className="text-3xl lg:text-5xl font-light text-[#2c2c2c] mb-4">
              Our prices
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {services.slice(0, 4).map((category) => (
              <div
                key={category.id}
                className="bg-[#faf9f7] rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-[#2c2c2c] font-medium mb-3">{category.category}</h3>
                <p className="text-[#b8956c] text-2xl font-light">
                  {category.items[0]?.price}
                </p>
                <p className="text-[#8a8a8a] text-sm">starting at</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="border-2 border-[#b8956c] text-[#b8956c] hover:bg-[#b8956c] hover:text-white px-8 py-4 text-sm font-medium tracking-wider uppercase rounded-sm inline-flex items-center group transition-all duration-300"
            >
              View Full Price List
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
              Testimonials
            </p>
            <h2 className="text-3xl lg:text-5xl font-light text-[#2c2c2c]">
              What our clients say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#b8956c]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#5a5a5a] leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-[#2c2c2c] font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Map */}
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.513837385873!2d-75.69336792393981!3d45.42613927107429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce04ff4f3c6c8b%3A0x3c4b2d7f5c8e0c8e!2sCF%20Rideau%20Centre!5e0!3m2!1sen!2sca!4v1690000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luna Hair Salon Location"
              />
            </div>

            {/* Content */}
            <div>
              <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
                Visit Us
              </p>
              <h2 className="text-3xl lg:text-5xl font-light text-[#2c2c2c] mb-6">
                Come see us
              </h2>
              <p className="text-[#5a5a5a] text-lg leading-relaxed mb-8">
                Drop in and experience premium hair & beauty services, right in the heart 
                of Ottawa at CF Rideau Centre, on the top floor.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#b8956c] mt-1 mr-4" />
                  <div>
                    <p className="text-[#2c2c2c] font-medium">Address</p>
                    <p className="text-[#5a5a5a]">{salonInfo.address}</p>
                    <p className="text-[#5a5a5a]">{salonInfo.location}</p>
                  </div>
                </div>
              </div>
              
              <a
                href={MILANO_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#b8956c] hover:bg-[#a07d5c] text-white px-8 py-4 text-sm font-medium tracking-wider uppercase rounded-sm inline-flex items-center group transition-all duration-300"
              >
                Book Now
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
