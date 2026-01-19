import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Award, Users, Sparkles } from 'lucide-react';
import { salonInfo } from '../data/mock';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-[#0d0d0f] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#c9a96e]/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#c9a96e]/3 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4 animate-fade-in">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#f7f5f2] mb-6 animate-fade-in-up">
              Perfect hair,<br />
              <span className="text-gradient-gold">made with care</span>
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-[#bbb5ae] text-lg lg:text-xl leading-relaxed text-center mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              At Luna Hair Salon, we believe great hair is more than a look—it's a feeling.
              Located in the heart of Ottawa at CF Rideau Centre, our salon is a space where
              beauty meets care and creativity.
            </p>
            <p className="text-[#bbb5ae] leading-relaxed text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Our team of certified professionals is passionate about helping you look and feel
              your best, offering expert hair and beauty services tailored to your unique style.
              Whether it's a fresh cut, flawless color, or a restorative treatment, we're here
              to make every visit a confidence boost.
            </p>
          </div>
        </div>
      </section>

      {/* Our Ethos Section */}
      <section className="py-24 lg:py-32 bg-[#1a1a1f] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4">
                Our Ethos
              </p>
              <h2 className="text-3xl lg:text-5xl font-light text-[#f7f5f2] mb-6 leading-tight">
                More than just a salon
              </h2>
              <p className="text-[#bbb5ae] text-lg leading-relaxed mb-6">
                Luna Hair Salon is a locally owned, woman-led space where luxury meets inclusivity.
                We offer expert hair and beauty services in a welcoming environment that celebrates
                all styles and identities.
              </p>
              <p className="text-[#bbb5ae] leading-relaxed mb-8">
                Our team of passionate professionals is dedicated to helping every client feel
                confident, seen, and cared for—whether you're here for a quick touch-up or a
                full transformation.
              </p>

              {/* Values */}
              <div className="space-y-4">
                {[
                  { icon: Heart, text: 'Inclusive environment for all' },
                  { icon: Award, text: 'Certified professional stylists' },
                  { icon: Sparkles, text: 'Premium quality products' },
                  { icon: Users, text: 'Woman-led, locally owned' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#c9a96e]" />
                    </div>
                    <span className="text-[#f7f5f2]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo Display */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#c9a96e]/10 rounded-full blur-3xl scale-150" />
                <img
                  src={salonInfo.logo}
                  alt="Luna Hair Salon"
                  className="relative z-10 w-64 lg:w-80 h-auto animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 lg:py-32 bg-[#0d0d0f] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c9a96e]/3 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="glass p-12 lg:p-16 rounded-2xl">
            <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-6">
              Our Mission
            </p>
            <blockquote className="text-2xl lg:text-3xl font-light text-[#f7f5f2] leading-relaxed italic">
              "Hair and beauty upkeep isn't just about looking good—it's about feeling your best,
              showing up with confidence, and honoring the time you take for yourself."
            </blockquote>
            <div className="w-16 h-[1px] bg-[#c9a96e] mx-auto mt-8" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 bg-[#1a1a1f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4">
              Meet The Team
            </p>
            <h2 className="text-3xl lg:text-5xl font-light text-[#f7f5f2] mb-6">
              Expert Stylists
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sofia Martinez', role: 'Color Specialist', years: '8+ years' },
              { name: 'Emma Chen', role: 'Cut & Style Expert', years: '6+ years' },
              { name: 'Olivia Brown', role: 'Bridal & Updos', years: '10+ years' },
            ].map((member, index) => (
              <div
                key={index}
                className="group text-center"
              >
                {/* Avatar Placeholder */}
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#c9a96e]/20 to-[#1a1a1f] flex items-center justify-center border border-[#c9a96e]/10 group-hover:border-[#c9a96e]/30 transition-colors">
                  <span className="text-5xl text-[#c9a96e]/40">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl text-[#f7f5f2] font-medium mb-1">{member.name}</h3>
                <p className="text-[#c9a96e] text-sm mb-1">{member.role}</p>
                <p className="text-[#bbb5ae] text-sm">{member.years}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#0d0d0f]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-[#f7f5f2] mb-6">
            Ready to experience the Luna difference?
          </h2>
          <p className="text-[#bbb5ae] text-lg mb-10">
            Book your appointment today and let our expert team transform your look.
          </p>
          <Link
            to="/booking"
            className="btn-gold px-10 py-5 text-sm tracking-wider uppercase rounded-sm inline-flex items-center group"
          >
            Book Your Appointment
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
