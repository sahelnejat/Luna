import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Palette, Sparkles, Star, ChevronDown } from 'lucide-react';
import { services } from '../data/mock';

const iconMap = {
  Scissors: Scissors,
  Palette: Palette,
  Sparkles: Sparkles,
  Star: Star,
};

const ServicesPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-[#0d0d0f] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#c9a96e]/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#c9a96e]/3 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4 animate-fade-in">
              Our Services
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#f7f5f2] mb-6 animate-fade-in-up">
              Find the right service<br />
              <span className="text-gradient-gold">for you</span>
            </h1>
            <p className="text-[#bbb5ae] text-lg max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Explore our offerings and choose the treatment that fits your style,
              hair goals, and schedule.
            </p>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-16 lg:py-24 bg-[#1a1a1f]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-6">
            {services.map((category, index) => {
              const IconComponent = iconMap[category.icon] || Scissors;
              const isExpanded = expandedCategory === category.id;

              return (
                <div
                  key={category.id}
                  className="bg-[#0d0d0f] rounded-xl overflow-hidden border border-[#c9a96e]/10 hover:border-[#c9a96e]/20 transition-all duration-300"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-6 lg:p-8 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center group-hover:bg-[#c9a96e]/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-[#c9a96e]" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-light text-[#f7f5f2] mb-1">
                          {category.category}
                        </h3>
                        <p className="text-[#bbb5ae] text-sm hidden sm:block">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-[#c9a96e] transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Category Items */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                      <div className="border-t border-[#c9a96e]/10 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center justify-between p-4 rounded-lg bg-[#1a1a1f]/50 hover:bg-[#1a1a1f] transition-colors group/item"
                            >
                              <div>
                                <p className="text-[#f7f5f2] font-medium group-hover/item:text-[#c9a96e] transition-colors">
                                  {item.name}
                                </p>
                                <p className="text-[#bbb5ae] text-sm">
                                  {item.duration} min
                                </p>
                              </div>
                              <span className="text-[#c9a96e] font-medium">
                                {item.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Pricing Section */}
      <section className="py-24 lg:py-32 bg-[#0d0d0f]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4">
              Quick Reference
            </p>
            <h2 className="text-3xl lg:text-5xl font-light text-[#f7f5f2] mb-6">
              Our Prices
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto" />
          </div>

          {/* Price Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'HairCut', price: '$50+' },
              { name: 'BlowDry', price: '$50+' },
              { name: 'Wash Cut & BlowDry', price: '$70+' },
              { name: 'Root Touch-up', price: '$75+' },
              { name: 'Full Color', price: '$125+' },
              { name: 'Highlights', price: '$200+' },
              { name: 'Partial Highlights', price: '$140+' },
              { name: 'Balayage', price: '$240+' },
              { name: 'Partial Balayage', price: '$160+' },
              { name: 'Toner', price: '$65+' },
              { name: 'Hair Keratin', price: '$350+' },
              { name: 'Deep Treatment', price: '$55+' },
              { name: 'Hair Extension', price: 'Consultation' },
              { name: 'Up Do', price: '$150+' },
              { name: 'Half Up Do/Prom', price: '$75+' },
              { name: 'Perm', price: '$150' },
              { name: 'Makeup', price: '$90+' },
              { name: 'Eyebrow Shaping', price: '$20+' },
              { name: 'Eyelash Extensions', price: '$100+' },
              { name: 'Full Face Threading', price: '$50+' },
            ].map((item, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg text-center hover:border-[#c9a96e]/30 transition-colors"
              >
                <p className="text-[#f7f5f2] font-medium text-sm mb-1">{item.name}</p>
                <p className="text-[#c9a96e] font-semibold">{item.price}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#bbb5ae] text-sm mt-8">
            * Prices may vary based on hair length and condition. Free consultation available.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#1a1a1f]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-[#f7f5f2] mb-6">
            Ready to book your service?
          </h2>
          <p className="text-[#bbb5ae] text-lg mb-10">
            Schedule your appointment online and let us help you look and feel amazing.
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
    </div>
  );
};

export default ServicesPage;
