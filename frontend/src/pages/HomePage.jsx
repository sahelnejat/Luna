import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, Heart, Award } from 'lucide-react';
import { services, testimonials, salonInfo, salonImages } from '../data/mock';
import ServiceCard from '../components/ui/ServiceCard';

const HomePage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Parallax effect for hero
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div ref={heroRef} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0d0d0f]" />
          <img
            src={salonImages.hero}
            alt="Professional Hair Styling"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0f]/70 via-[#0d0d0f]/50 to-[#0d0d0f]" />
          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#c9a96e]/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#c9a96e]/3 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Logo Animation */}
          <div className="mb-8 animate-fade-in">
            <img
              src={salonInfo.logo}
              alt="Luna Hair Salon"
              className="h-32 lg:h-44 w-auto mx-auto"
            />
          </div>

          <p className="text-[#c9a96e] text-sm lg:text-base uppercase tracking-[0.3em] mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Welcome to Luna
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-[#f7f5f2] leading-tight mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            Your trusted Destination for<br />
            <span className="text-gradient-gold">expert hair care & beauty</span>
          </h1>

          <p className="text-[#bbb5ae] text-lg lg:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
            Experience premium hair & beauty services, right in the heart of Ottawa
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            <Link
              to="/booking"
              className="btn-gold px-8 py-4 text-sm tracking-wider uppercase rounded-sm inline-flex items-center group"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="btn-outline-gold px-8 py-4 text-sm tracking-wider uppercase rounded-sm"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[#c9a96e]/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#c9a96e] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 lg:py-32 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4">
              Our Expertise
            </p>
            <h2 className="text-3xl lg:text-5xl font-light text-[#f7f5f2] mb-6">
              Explore Our Services
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto" />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center text-[#c9a96e] text-sm font-medium hover:text-[#dfc291] transition-colors group"
            >
              <span className="mr-2">View All Services & Pricing</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="py-24 lg:py-32 bg-[#1a1a1f] relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c9a96e]/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Gallery */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] group">
                    <img
                      src={salonImages.glamorousHair}
                      alt="Glamorous hairstyle"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/50 to-transparent" />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-square group">
                    <img
                      src={salonImages.eyebrowTreatment}
                      alt="Beauty treatment"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/50 to-transparent" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative rounded-2xl overflow-hidden aspect-square group">
                    <img
                      src={salonImages.stylistWorking}
                      alt="Professional styling"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/50 to-transparent" />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] group">
                    <img
                      src={salonImages.hairTreatment}
                      alt="Hair treatment"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/50 to-transparent" />
                  </div>
                </div>
              </div>
              {/* Decorative border */}
              <div className="absolute -inset-4 border border-[#c9a96e]/20 rounded-3xl -z-10" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4">
                About Us
              </p>
              <h2 className="text-3xl lg:text-5xl font-light text-[#f7f5f2] mb-6 leading-tight">
                Perfect hair,<br />
                <span className="text-gradient-gold">made with care</span>
              </h2>
              <p className="text-[#bbb5ae] text-lg leading-relaxed mb-8">
                At Luna Hair Salon, we believe great hair is more than a look—it's a feeling.
                Located in the heart of Ottawa at CF Rideau Centre, our salon is a space where
                beauty meets care and creativity.
              </p>
              <p className="text-[#bbb5ae] leading-relaxed mb-8">
                Our team of certified professionals is passionate about helping you look and
                feel your best, offering expert hair and beauty services tailored to your unique style.
              </p>
              <Link
                to="/about"
                className="btn-outline-gold px-8 py-4 text-sm tracking-wider uppercase rounded-sm inline-block"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Sparkles, title: 'Expert Stylists', desc: 'Certified professionals with years of experience' },
                { icon: Heart, title: 'Woman-Led', desc: 'Locally owned, inclusive space for all' },
                { icon: Award, title: 'Premium Products', desc: 'Only the finest hair care products used' },
                { icon: MapPin, title: 'Prime Location', desc: 'CF Rideau Centre, top floor' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass p-6 rounded-lg group hover:border-[#c9a96e]/30 transition-all duration-300"
                >
                  <feature.icon className="w-8 h-8 text-[#c9a96e] mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-[#f7f5f2] font-medium mb-2">{feature.title}</h4>
                  <p className="text-[#bbb5ae] text-sm">{feature.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="py-24 lg:py-32 bg-[#0d0d0f] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a96e]/5 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4">
            Ready for a Change?
          </p>
          <h2 className="text-3xl lg:text-5xl font-light text-[#f7f5f2] mb-6">
            Book Your Appointment
          </h2>
          <p className="text-[#bbb5ae] text-lg max-w-2xl mx-auto mb-4">
            Easy, fast, and tailored just for you
          </p>
          <p className="text-[#bbb5ae] max-w-2xl mx-auto mb-10">
            Schedule your next hair or beauty service with ease. Choose your preferred date
            and time, and let us take care of the rest. We can't wait to help you look and feel amazing!
          </p>
          <Link
            to="/booking"
            className="btn-gold px-10 py-5 text-sm tracking-wider uppercase rounded-sm inline-flex items-center group animate-pulse-glow"
          >
            Book Now
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-[#1a1a1f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4">
              Client Love
            </p>
            <h2 className="text-3xl lg:text-5xl font-light text-[#f7f5f2] mb-6">
              What Our Clients Say
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto" />
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="glass p-8 rounded-lg relative"
              >
                {/* Quote Mark */}
                <div className="absolute top-4 right-4 text-6xl text-[#c9a96e]/10 font-serif leading-none">
                  "
                </div>
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-[#c9a96e]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#bbb5ae] leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <p className="text-[#f7f5f2] font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 lg:py-32 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Map Placeholder */}
            <div className="relative h-[400px] rounded-lg overflow-hidden bg-[#1a1a1f] border border-[#c9a96e]/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.513837385873!2d-75.69336792393981!3d45.42613927107429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce04ff4f3c6c8b%3A0x3c4b2d7f5c8e0c8e!2sCF%20Rideau%20Centre!5e0!3m2!1sen!2sca!4v1690000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luna Hair Salon Location"
              />
              <div className="absolute inset-0 pointer-events-none border border-[#c9a96e]/20 rounded-lg" />
            </div>

            {/* Content */}
            <div>
              <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4">
                Find Us
              </p>
              <h2 className="text-3xl lg:text-5xl font-light text-[#f7f5f2] mb-6">
                We're easy to find
              </h2>
              <p className="text-[#bbb5ae] text-lg leading-relaxed mb-8">
                Drop in and experience premium hair & beauty services, right in the heart
                of Ottawa at CF Rideau Centre, on the top floor.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#c9a96e] mt-1 mr-4" />
                  <div>
                    <p className="text-[#f7f5f2] font-medium">Address</p>
                    <p className="text-[#bbb5ae]">{salonInfo.address}</p>
                    <p className="text-[#bbb5ae]">{salonInfo.location}</p>
                  </div>
                </div>
              </div>
              <Link
                to="/booking"
                className="btn-gold px-8 py-4 text-sm tracking-wider uppercase rounded-sm inline-flex items-center group"
              >
                Book Now
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
