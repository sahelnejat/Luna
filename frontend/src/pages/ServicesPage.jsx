import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { services } from '../data/mock';

const MILANO_BOOKING_URL = "https://milanoweb.milanocloud.com:1443/index.html?store=lunasalon";

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('HAIRCUTS');

  const tabs = ['HAIRCUTS', 'COLOR', 'TREATMENTS', 'BEAUTY'];

  const servicesByTab = {
    HAIRCUTS: services[0]?.items || [],
    COLOR: services[1]?.items || [],
    TREATMENTS: services[2]?.items || [],
    BEAUTY: services[3]?.items || [],
  };

  return (
    <div className="min-h-screen bg-white pt-32 lg:pt-40">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
            Our Services
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2c2c2c] mb-6">
            Services & Pricing
          </h1>
          <p className="text-[#5a5a5a] text-lg max-w-2xl mx-auto">
            We are happy to offer a full range of services in the salon, from bang trims to balayage.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 border-b border-[#e8e6e3] sticky top-[80px] lg:top-[120px] bg-white z-30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-1 lg:justify-center hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium tracking-wider whitespace-nowrap transition-all duration-300 rounded-lg ${
                  activeTab === tab
                    ? 'bg-[#b8956c] text-white'
                    : 'text-[#5a5a5a] hover:bg-[#faf9f7]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-4">
            {servicesByTab[activeTab]?.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 bg-[#faf9f7] rounded-xl hover:bg-[#f5f4f2] transition-colors"
              >
                <div>
                  <h3 className="text-[#2c2c2c] font-medium text-lg">{service.name}</h3>
                  <p className="text-[#8a8a8a] text-sm">{service.duration} min</p>
                </div>
                <span className="text-[#b8956c] text-xl font-medium">{service.price}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-[#8a8a8a] text-sm mt-8">
            *Taxes & gratuities are not included. Prices may vary based on hair length and condition.
          </p>
        </div>
      </section>

      {/* All Services Accordion */}
      <section className="py-16 lg:py-24 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-[#2c2c2c]">
              All Services
            </h2>
          </div>

          <div className="space-y-4">
            {services.map((category) => (
              <ServiceAccordion key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">
            Ready to book?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Schedule your appointment online and let us help you look and feel amazing.
          </p>
          <a
            href={MILANO_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#b8956c] hover:bg-[#a07d5c] text-white px-10 py-4 text-sm font-medium tracking-wider uppercase rounded-sm inline-flex items-center group transition-all duration-300"
          >
            Book Now
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

const ServiceAccordion = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left"
      >
        <div>
          <h3 className="text-xl text-[#2c2c2c] font-medium">{category.category}</h3>
          <p className="text-[#8a8a8a] text-sm mt-1">{category.description}</p>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-[#b8956c] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-[#e8e6e3] pt-6">
            {category.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#faf9f7] rounded-lg"
              >
                <div>
                  <p className="text-[#2c2c2c] font-medium">{item.name}</p>
                  <p className="text-[#8a8a8a] text-sm">{item.duration} min</p>
                </div>
                <span className="text-[#b8956c] font-medium">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
