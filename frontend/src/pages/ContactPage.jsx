import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { salonInfo } from '../data/mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
    
    try {
      const contactData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      const response = await axios.post(`${API}/contact`, contactData);
      
      console.log('Contact form submitted:', response.data);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to submit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 lg:pt-40">
      <Helmet>
        <title>Contact Us | Luna Hair Salon Ottawa - Book Your Appointment</title>
        <meta name="description" content="Contact Luna Hair Salon in Ottawa. Visit us at CF Rideau Centre, call +1 613-693-4821, or email contact@lunahair.ca. Open 7 days a week." />
      </Helmet>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2c2c2c] mb-6">
            Contact Us
          </h1>
          <p className="text-[#5a5a5a] text-lg max-w-2xl mx-auto">
            For any inquiries please feel free to reach out. We look forward to hearing from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-light text-[#2c2c2c] mb-8">
                Send us a message
              </h2>

              {isSubmitted ? (
                <div className="bg-[#faf9f7] p-8 rounded-xl text-center">
                  <CheckCircle className="w-16 h-16 text-[#b8956c] mx-auto mb-4" />
                  <h3 className="text-xl text-[#2c2c2c] mb-2">Thank you!</h3>
                  <p className="text-[#5a5a5a]">
                    Your message has been sent. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#2c2c2c] text-sm font-medium mb-2">
                        First Name <span className="text-[#b8956c]">*</span>
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="bg-[#faf9f7] border-[#e8e6e3] text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-[#2c2c2c] text-sm font-medium mb-2">
                        Last Name <span className="text-[#b8956c]">*</span>
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-[#faf9f7] border-[#e8e6e3] text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#2c2c2c] text-sm font-medium mb-2">
                      Email <span className="text-[#b8956c]">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-[#faf9f7] border-[#e8e6e3] text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2c2c2c] text-sm font-medium mb-2">
                      Subject <span className="text-[#b8956c]">*</span>
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-[#faf9f7] border-[#e8e6e3] text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2c2c2c] text-sm font-medium mb-2">
                      Message <span className="text-[#b8956c]">*</span>
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-[#faf9f7] border-[#e8e6e3] text-[#2c2c2c] placeholder:text-[#8a8a8a] resize-none"
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
              <h2 className="text-2xl lg:text-3xl font-light text-[#2c2c2c] mb-8">
                Visit our salon
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start p-6 bg-[#faf9f7] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[#b8956c]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#b8956c]" />
                  </div>
                  <div>
                    <h4 className="text-[#2c2c2c] font-medium mb-1">Address</h4>
                    <p className="text-[#5a5a5a]">{salonInfo.address}</p>
                    <p className="text-[#5a5a5a]">{salonInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start p-6 bg-[#faf9f7] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[#b8956c]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#b8956c]" />
                  </div>
                  <div>
                    <h4 className="text-[#2c2c2c] font-medium mb-1">Phone</h4>
                    <a
                      href={`tel:${salonInfo.phone}`}
                      className="text-[#5a5a5a] hover:text-[#b8956c] transition-colors"
                    >
                      {salonInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-6 bg-[#faf9f7] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[#b8956c]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#b8956c]" />
                  </div>
                  <div>
                    <h4 className="text-[#2c2c2c] font-medium mb-1">Email</h4>
                    <a
                      href={`mailto:${salonInfo.email}`}
                      className="text-[#5a5a5a] hover:text-[#b8956c] transition-colors"
                    >
                      {salonInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-6 bg-[#faf9f7] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[#b8956c]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#b8956c]" />
                  </div>
                  <div>
                    <h4 className="text-[#2c2c2c] font-medium mb-1">Hours</h4>
                    <p className="text-[#5a5a5a]">Mon-Fri: {salonInfo.hours.weekdays}</p>
                    <p className="text-[#5a5a5a]">Saturday: {salonInfo.hours.saturday}</p>
                    <p className="text-[#5a5a5a]">Sunday: {salonInfo.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
