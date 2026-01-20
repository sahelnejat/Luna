import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Award, Users, Sparkles } from 'lucide-react';
import { salonInfo, salonImages } from '../data/mock';

const MILANO_BOOKING_URL = "https://milanoweb.milanocloud.com:1443/index.html?store=lunasalon";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white pt-32 lg:pt-40">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
                About Us
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2c2c2c] leading-tight mb-6">
                We want you to<br />
                <span className="text-gradient-gold italic">love your hair</span>
              </h1>
              <p className="text-[#5a5a5a] text-lg leading-relaxed mb-6">
                At Luna Hair Salon, we believe great hair is more than a look—it's a feeling. 
                Located in the heart of Ottawa at CF Rideau Centre, our salon is a space where 
                beauty meets care and creativity.
              </p>
              <p className="text-[#5a5a5a] leading-relaxed">
                Our team of certified professionals is passionate about helping you look and feel 
                your best, offering expert hair and beauty services tailored to your unique style. 
                Whether it's a fresh cut, flawless color, or a restorative treatment, we're here 
                to make every visit a confidence boost.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={salonImages.glamorousHair}
                  alt="Beautiful hairstyle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-[#b8956c]/30 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Ethos Section */}
      <section className="py-24 lg:py-32 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                  <img
                    src={salonImages.stylistWorking}
                    alt="Professional styling"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[3/4] mt-8">
                  <img
                    src={salonImages.eyebrowTreatment}
                    alt="Beauty treatment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
                Our Philosophy
              </p>
              <h2 className="text-3xl lg:text-5xl font-light text-[#2c2c2c] mb-6 leading-tight">
                More than just a salon
              </h2>
              <p className="text-[#5a5a5a] text-lg leading-relaxed mb-6">
                Luna Hair Salon is a locally owned, woman-led space where luxury meets inclusivity. 
                We offer expert hair and beauty services in a welcoming environment that celebrates 
                all styles and identities.
              </p>
              <p className="text-[#5a5a5a] leading-relaxed mb-8">
                Our team of passionate professionals is dedicated to helping every client feel 
                confident, seen, and cared for—whether you're here for a quick touch-up or a 
                full transformation.
              </p>

              {/* Values */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Heart, text: 'Inclusive for all' },
                  { icon: Award, text: 'Certified stylists' },
                  { icon: Sparkles, text: 'Premium products' },
                  { icon: Users, text: 'Woman-led' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#b8956c]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#b8956c]" />
                    </div>
                    <span className="text-[#2c2c2c] text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-[#faf9f7] p-12 lg:p-16 rounded-2xl">
            <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-6">
              Our Mission
            </p>
            <blockquote className="text-2xl lg:text-3xl font-light text-[#2c2c2c] leading-relaxed italic">
              "Hair and beauty upkeep isn't just about looking good—it's about feeling your best, 
              showing up with confidence, and honoring the time you take for yourself."
            </blockquote>
            <div className="w-16 h-[2px] bg-[#b8956c] mx-auto mt-8" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
              Our Team
            </p>
            <h2 className="text-3xl lg:text-5xl font-light text-[#2c2c2c]">
              Expert Stylists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sofia Martinez', role: 'Color Specialist', years: '8+ years' },
              { name: 'Emma Chen', role: 'Cut & Style Expert', years: '6+ years' },
              { name: 'Olivia Brown', role: 'Bridal & Updos', years: '10+ years' },
            ].map((member, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-xl">
                {/* Avatar */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#b8956c]/20 to-[#faf9f7] flex items-center justify-center">
                  <span className="text-4xl text-[#b8956c]">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl text-[#2c2c2c] font-medium mb-1">{member.name}</h3>
                <p className="text-[#b8956c] text-sm mb-1">{member.role}</p>
                <p className="text-[#8a8a8a] text-sm">{member.years}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">
            Ready to experience the Luna difference?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Book your appointment today and let our expert team transform your look.
          </p>
          <a
            href={MILANO_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#b8956c] hover:bg-[#a07d5c] text-white px-10 py-4 text-sm font-medium tracking-wider uppercase rounded-sm inline-flex items-center group transition-all duration-300"
          >
            Book Your Appointment
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
