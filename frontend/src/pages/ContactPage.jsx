import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { salonInfo } from '../data/mock';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Contact form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-[#0d0d0f] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#c9a96e]/5 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4 animate-fade-in">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#f7f5f2] mb-6 animate-fade-in-up">
              Contact <span className="text-gradient-gold">Us</span>
            </h1>
            <p className="text-[#bbb5ae] text-lg max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              For any inquiries please feel free to reach out here.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24 bg-[#1a1a1f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-light text-[#f7f5f2] mb-8">
                Send us a message
              </h2>

              {isSubmitted ? (
                <div className="glass p-8 rounded-xl text-center">
                  <CheckCircle className="w-16 h-16 text-[#c9a96e] mx-auto mb-4" />
                  <h3 className="text-xl text-[#f7f5f2] mb-2">Thank you!</h3>
                  <p className="text-[#bbb5ae]">
                    Your message has been sent. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#f7f5f2] text-sm mb-2">
                        First Name <span className="text-[#c9a96e]">*</span>
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50 focus:border-[#c9a96e]"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-[#f7f5f2] text-sm mb-2">
                        Last Name <span className="text-[#c9a96e]">*</span>
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50 focus:border-[#c9a96e]"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#f7f5f2] text-sm mb-2">
                      Email <span className="text-[#c9a96e]">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50 focus:border-[#c9a96e]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[#f7f5f2] text-sm mb-2">
                      Subject <span className="text-[#c9a96e]">*</span>
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50 focus:border-[#c9a96e]"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-[#f7f5f2] text-sm mb-2">
                      Message <span className="text-[#c9a96e]">*</span>
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50 focus:border-[#c9a96e] resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full py-4 text-sm tracking-wider uppercase rounded-sm flex items-center justify-center group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Submit
                        <Send className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-light text-[#f7f5f2] mb-8">
                Visit our salon
              </h2>

              <div className="space-y-8 mb-12">
                <div className="glass p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#c9a96e]" />
                    </div>
                    <div>
                      <h4 className="text-[#f7f5f2] font-medium mb-1">Address</h4>
                      <p className="text-[#bbb5ae]">{salonInfo.address}</p>
                      <p className="text-[#bbb5ae]">{salonInfo.location}</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#c9a96e]" />
                    </div>
                    <div>
                      <h4 className="text-[#f7f5f2] font-medium mb-1">Phone</h4>
                      <a
                        href={`tel:${salonInfo.phone}`}
                        className="text-[#bbb5ae] hover:text-[#c9a96e] transition-colors"
                      >
                        {salonInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#c9a96e]" />
                    </div>
                    <div>
                      <h4 className="text-[#f7f5f2] font-medium mb-1">Email</h4>
                      <a
                        href={`mailto:${salonInfo.email}`}
                        className="text-[#bbb5ae] hover:text-[#c9a96e] transition-colors"
                      >
                        {salonInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#c9a96e]" />
                    </div>
                    <div>
                      <h4 className="text-[#f7f5f2] font-medium mb-1">Hours</h4>
                      <p className="text-[#bbb5ae]">Mon-Fri: {salonInfo.hours.weekdays}</p>
                      <p className="text-[#bbb5ae]">Saturday: {salonInfo.hours.saturday}</p>
                      <p className="text-[#bbb5ae]">Sunday: {salonInfo.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-[300px] rounded-xl overflow-hidden bg-[#0d0d0f] border border-[#c9a96e]/10">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
