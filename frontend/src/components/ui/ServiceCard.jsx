import React from 'react';
import { Scissors, Palette, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Scissors: Scissors,
  Palette: Palette,
  Sparkles: Sparkles,
  Star: Star,
};

const ServiceCard = ({ service, index, showLearnMore = true }) => {
  const IconComponent = iconMap[service.icon] || Scissors;

  return (
    <div
      className="group relative bg-[#1a1a1f] rounded-lg p-8 card-hover border border-[#c9a96e]/5 hover:border-[#c9a96e]/20 overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <div className="relative z-10 mb-6">
        <div className="w-14 h-14 rounded-full bg-[#c9a96e]/10 flex items-center justify-center group-hover:bg-[#c9a96e]/20 transition-colors duration-300">
          <IconComponent className="w-6 h-6 text-[#c9a96e]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl lg:text-2xl font-light text-[#f7f5f2] mb-3 tracking-wide">
          {service.category}
        </h3>
        <p className="text-[#bbb5ae] text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {showLearnMore && (
          <Link
            to="/services"
            className="inline-flex items-center text-[#c9a96e] text-sm font-medium group/link"
          >
            <span className="mr-2">Learn more</span>
            <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-[#c9a96e]/30 to-transparent transform origin-top group-hover:scale-y-150 transition-transform duration-500" />
        <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-[#c9a96e]/30 to-transparent transform origin-right group-hover:scale-x-150 transition-transform duration-500" />
      </div>
    </div>
  );
};

export default ServiceCard;
