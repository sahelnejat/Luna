import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format, addDays, startOfWeek, isSameDay, isBefore } from 'date-fns';
import axios from 'axios';
import {
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X,
  ShoppingBag,
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { services, timeSlots, stylists, salonInfo } from '../data/mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [clientInfo, setClientInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const totals = useMemo(() => {
    let totalDuration = 0;
    let minPrice = 0;
    
    selectedServices.forEach(service => {
      totalDuration += service.duration;
      const priceMatch = service.price.match(/\$(\d+)/);
      if (priceMatch) {
        minPrice += parseInt(priceMatch[1]);
      }
    });
    
    return { totalDuration, minPrice };
  }, [selectedServices]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleClientInfoChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const handlePrevWeek = () => {
    const newStart = addDays(currentWeekStart, -7);
    if (!isBefore(newStart, startOfWeek(today, { weekStartsOn: 1 }))) {
      setCurrentWeekStart(newStart);
    }
  };

  const addService = (category, service) => {
    const serviceWithCategory = {
      ...service,
      category: category.category,
      id: `${category.id}-${service.name}`,
    };
    
    const exists = selectedServices.find(s => s.id === serviceWithCategory.id);
    if (!exists) {
      setSelectedServices([...selectedServices, serviceWithCategory]);
    }
  };

  const removeService = (serviceId) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const isServiceSelected = (categoryId, serviceName) => {
    return selectedServices.some(s => s.id === `${categoryId}-${serviceName}`);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        services: selectedServices.map(s => ({
          category: s.category,
          name: s.name,
          price: s.price,
          duration: s.duration,
        })),
        total_duration: totals.totalDuration,
        total_price_min: `$${totals.minPrice}+`,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        stylist_id: selectedStylist?.id,
        stylist_name: selectedStylist?.name,
        client: {
          first_name: clientInfo.firstName,
          last_name: clientInfo.lastName,
          email: clientInfo.email,
          phone: clientInfo.phone,
          notes: clientInfo.notes
        }
      };

      const response = await axios.post(`${API}/bookings`, bookingData);
      
      setBookingReference(response.data.reference);
      setBookingConfirmed(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedServices.length > 0;
      case 2: return selectedDate && selectedTime;
      case 3: return selectedStylist;
      case 4: return clientInfo.firstName && clientInfo.lastName && clientInfo.email && clientInfo.phone;
      default: return false;
    }
  };

  const nextStep = () => { if (canProceed()) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const steps = [
    { num: 1, label: 'Services' },
    { num: 2, label: 'Date & Time' },
    { num: 3, label: 'Stylist' },
    { num: 4, label: 'Details' },
    { num: 5, label: 'Confirm' },
  ];

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen pt-32 lg:pt-40 pb-16 bg-[#faf9f7]">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="py-16">
            <div className="w-24 h-24 rounded-full bg-[#b8956c]/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-[#b8956c]" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-light text-[#2c2c2c] mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-[#5a5a5a] text-lg mb-8">
              Thank you for booking with Luna Hair Salon.
            </p>
            
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8 text-left">
              <div className="text-center mb-6 pb-6 border-b border-[#e8e6e3]">
                <p className="text-[#8a8a8a] text-sm">Booking Reference</p>
                <p className="text-[#b8956c] text-2xl font-medium">{bookingReference}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[#8a8a8a] text-sm">Services</span>
                  <div className="mt-2 space-y-2">
                    {selectedServices.map((service, index) => (
                      <div key={index} className="flex justify-between text-[#2c2c2c]">
                        <span>{service.name}</span>
                        <span className="text-[#b8956c]">{service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#e8e6e3]">
                  <span className="text-[#8a8a8a]">Date</span>
                  <span className="text-[#2c2c2c]">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a8a8a]">Time</span>
                  <span className="text-[#2c2c2c]">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a8a8a]">Stylist</span>
                  <span className="text-[#2c2c2c]">{selectedStylist?.name}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#e8e6e3]">
                  <span className="text-[#8a8a8a]">Estimated Total</span>
                  <span className="text-[#b8956c] font-semibold text-lg">${totals.minPrice}+</span>
                </div>
              </div>
            </div>
            
            <p className="text-[#8a8a8a] text-sm mb-8">
              A confirmation email has been sent to {clientInfo.email}
            </p>
            
            <Link
              to="/"
              className="btn-gold px-8 py-4 text-sm tracking-wider uppercase rounded-sm inline-flex items-center group"
            >
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 lg:pt-40 pb-16 bg-[#faf9f7]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#b8956c] text-sm uppercase tracking-[0.3em] mb-4">
            Book Online
          </p>
          <h1 className="text-3xl lg:text-5xl font-light text-[#2c2c2c] mb-4">
            Book Your Appointment
          </h1>
          <p className="text-[#5a5a5a]">
            Select one or more services for your visit
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((s, index) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step >= s.num
                        ? 'bg-[#b8956c] text-white'
                        : 'bg-white text-[#8a8a8a] border border-[#e8e6e3]'
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className="text-xs text-[#8a8a8a] mt-2 hidden sm:block">{s.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-2 transition-all duration-300 ${step > s.num ? 'bg-[#b8956c]' : 'bg-[#e8e6e3]'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm">
              {/* Step 1: Select Services */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-light text-[#2c2c2c] mb-2 flex items-center">
                    <Scissors className="w-6 h-6 text-[#b8956c] mr-3" />
                    Select Your Services
                  </h2>
                  <p className="text-[#8a8a8a] text-sm mb-6">
                    You can add multiple services to your appointment
                  </p>

                  <div className="space-y-4">
                    {services.map((category) => (
                      <div key={category.id} className="border border-[#e8e6e3] rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                          className="w-full p-4 flex items-center justify-between text-left bg-[#faf9f7] hover:bg-[#f5f4f2] transition-colors"
                        >
                          <div>
                            <h3 className="text-[#2c2c2c] font-medium">{category.category}</h3>
                            <p className="text-[#8a8a8a] text-sm">{category.description}</p>
                          </div>
                          <ChevronRight className={`w-5 h-5 text-[#b8956c] transition-transform duration-300 ${expandedCategory === category.id ? 'rotate-90' : ''}`} />
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCategory === category.id ? 'max-h-[1000px]' : 'max-h-0'}`}>
                          <div className="p-4 pt-0 space-y-2">
                            {category.items.map((service, index) => {
                              const isSelected = isServiceSelected(category.id, service.name);
                              return (
                                <div
                                  key={index}
                                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                                    isSelected
                                      ? 'bg-[#b8956c]/10 border border-[#b8956c]/30'
                                      : 'bg-white border border-[#e8e6e3] hover:border-[#b8956c]/30'
                                  }`}
                                >
                                  <div className="flex-1">
                                    <p className={`font-medium ${isSelected ? 'text-[#b8956c]' : 'text-[#2c2c2c]'}`}>
                                      {service.name}
                                    </p>
                                    <p className="text-[#8a8a8a] text-sm">
                                      {service.duration} min • {service.price}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => isSelected ? removeService(`${category.id}-${service.name}`) : addService(category, service)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                      isSelected
                                        ? 'bg-[#b8956c] text-white'
                                        : 'bg-[#faf9f7] text-[#b8956c] hover:bg-[#b8956c]/10'
                                    }`}
                                  >
                                    {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-light text-[#2c2c2c] mb-6 flex items-center">
                    <CalendarIcon className="w-6 h-6 text-[#b8956c] mr-3" />
                    Select Date & Time
                  </h2>

                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={handlePrevWeek}
                      disabled={isBefore(addDays(currentWeekStart, -7), startOfWeek(today, { weekStartsOn: 1 }))}
                      className="p-2 rounded-lg bg-[#faf9f7] text-[#b8956c] hover:bg-[#b8956c]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-[#2c2c2c] font-medium">
                      {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
                    </span>
                    <button onClick={handleNextWeek} className="p-2 rounded-lg bg-[#faf9f7] text-[#b8956c] hover:bg-[#b8956c]/10 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-8">
                    {weekDays.map((day) => {
                      const isPast = isBefore(day, today);
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      
                      return (
                        <button
                          key={day.toString()}
                          onClick={() => !isPast && setSelectedDate(day)}
                          disabled={isPast}
                          className={`p-3 rounded-lg text-center transition-all duration-300 ${
                            isSelected
                              ? 'bg-[#b8956c] text-white'
                              : isPast
                              ? 'bg-[#faf9f7] text-[#e8e6e3] cursor-not-allowed'
                              : 'bg-[#faf9f7] text-[#2c2c2c] hover:bg-[#b8956c]/10'
                          }`}
                        >
                          <span className="block text-xs mb-1">{format(day, 'EEE')}</span>
                          <span className="block text-lg font-medium">{format(day, 'd')}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedDate && (
                    <div>
                      <h3 className="text-[#2c2c2c] font-medium mb-4 flex items-center">
                        <Clock className="w-5 h-5 text-[#b8956c] mr-2" />
                        Available Times
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg text-sm transition-all duration-300 ${
                              selectedTime === time
                                ? 'bg-[#b8956c] text-white font-medium'
                                : 'bg-[#faf9f7] text-[#2c2c2c] hover:bg-[#b8956c]/10'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Select Stylist */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-light text-[#2c2c2c] mb-6 flex items-center">
                    <User className="w-6 h-6 text-[#b8956c] mr-3" />
                    Choose Your Stylist
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stylists.map((stylist) => (
                      <button
                        key={stylist.id}
                        onClick={() => setSelectedStylist(stylist)}
                        className={`p-6 rounded-xl text-left transition-all duration-300 ${
                          selectedStylist?.id === stylist.id
                            ? 'bg-[#b8956c]/10 border-2 border-[#b8956c]'
                            : 'bg-[#faf9f7] border-2 border-transparent hover:border-[#b8956c]/30'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b8956c]/20 to-[#faf9f7] flex items-center justify-center mr-4">
                            <span className="text-2xl text-[#b8956c]">{stylist.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="text-[#2c2c2c] font-medium">{stylist.name}</h3>
                            <p className="text-[#b8956c] text-sm">{stylist.specialty}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Client Details */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-light text-[#2c2c2c] mb-6">Your Details</h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#2c2c2c] text-sm font-medium mb-2">
                          First Name <span className="text-[#b8956c]">*</span>
                        </label>
                        <Input
                          type="text"
                          name="firstName"
                          value={clientInfo.firstName}
                          onChange={handleClientInfoChange}
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
                          value={clientInfo.lastName}
                          onChange={handleClientInfoChange}
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
                      <Input type="email" name="email" value={clientInfo.email} onChange={handleClientInfoChange} required className="bg-[#faf9f7] border-[#e8e6e3] text-[#2c2c2c] placeholder:text-[#8a8a8a]" placeholder="your@email.com" />
                    </div>

                    <div>
                      <label className="block text-[#2c2c2c] text-sm font-medium mb-2">
                        Phone <span className="text-[#b8956c]">*</span>
                      </label>
                      <Input type="tel" name="phone" value={clientInfo.phone} onChange={handleClientInfoChange} required className="bg-[#faf9f7] border-[#e8e6e3] text-[#2c2c2c] placeholder:text-[#8a8a8a]" placeholder="+1 (555) 000-0000" />
                    </div>

                    <div>
                      <label className="block text-[#2c2c2c] text-sm font-medium mb-2">Special Requests (Optional)</label>
                      <Textarea name="notes" value={clientInfo.notes} onChange={handleClientInfoChange} rows={4} className="bg-[#faf9f7] border-[#e8e6e3] text-[#2c2c2c] placeholder:text-[#8a8a8a] resize-none" placeholder="Any special requests or notes..." />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {step === 5 && (
                <div>
                  <h2 className="text-2xl font-light text-[#2c2c2c] mb-6">Review & Confirm</h2>

                  <div className="space-y-6">
                    <div className="bg-[#faf9f7] rounded-xl p-6 space-y-4">
                      <div className="pb-4 border-b border-[#e8e6e3]">
                        <p className="text-[#8a8a8a] text-sm mb-2">Services</p>
                        <div className="space-y-2">
                          {selectedServices.map((service, index) => (
                            <div key={index} className="flex justify-between">
                              <div>
                                <p className="text-[#2c2c2c] font-medium">{service.name}</p>
                                <p className="text-[#8a8a8a] text-sm">{service.category} • {service.duration} min</p>
                              </div>
                              <span className="text-[#b8956c]">{service.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pb-4 border-b border-[#e8e6e3]">
                        <div>
                          <p className="text-[#8a8a8a] text-sm">Date & Time</p>
                          <p className="text-[#2c2c2c]">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                          <p className="text-[#b8956c]">{selectedTime}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#8a8a8a] text-sm">Total Duration</p>
                          <p className="text-[#2c2c2c]">{totals.totalDuration} min</p>
                        </div>
                      </div>

                      <div className="pb-4 border-b border-[#e8e6e3]">
                        <p className="text-[#8a8a8a] text-sm">Stylist</p>
                        <p className="text-[#2c2c2c]">{selectedStylist?.name}</p>
                        <p className="text-[#b8956c] text-sm">{selectedStylist?.specialty}</p>
                      </div>

                      <div>
                        <p className="text-[#8a8a8a] text-sm mb-2">Client Information</p>
                        <p className="text-[#2c2c2c]">{clientInfo.firstName} {clientInfo.lastName}</p>
                        <p className="text-[#8a8a8a] text-sm">{clientInfo.email}</p>
                        <p className="text-[#8a8a8a] text-sm">{clientInfo.phone}</p>
                      </div>
                    </div>

                    <p className="text-[#8a8a8a] text-sm text-center">
                      By confirming this booking, you agree to our cancellation policy. Please arrive 10 minutes before your appointment.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e8e6e3]">
                <button onClick={prevStep} disabled={step === 1} className={`flex items-center text-[#8a8a8a] hover:text-[#2c2c2c] transition-colors ${step === 1 ? 'invisible' : ''}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>

                {step < 5 ? (
                  <Button onClick={nextStep} disabled={!canProceed()} className="btn-gold px-8 py-3 text-sm tracking-wider uppercase rounded-sm flex items-center group disabled:opacity-50 disabled:cursor-not-allowed">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="btn-gold px-8 py-3 text-sm tracking-wider uppercase rounded-sm flex items-center group">
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Confirming...
                      </span>
                    ) : (
                      <>
                        Confirm Booking
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-36">
              <div className="flex items-center mb-4">
                <ShoppingBag className="w-5 h-5 text-[#b8956c] mr-2" />
                <h3 className="text-[#2c2c2c] font-medium">Your Selection</h3>
                <span className="ml-auto bg-[#b8956c] text-white text-xs font-bold px-2 py-1 rounded-full">{selectedServices.length}</span>
              </div>

              {selectedServices.length === 0 ? (
                <p className="text-[#8a8a8a] text-sm py-4 text-center">No services selected yet</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                    {selectedServices.map((service, index) => (
                      <div key={index} className="flex items-start justify-between p-3 bg-[#faf9f7] rounded-lg group">
                        <div className="flex-1 min-w-0">
                          <p className="text-[#2c2c2c] text-sm font-medium truncate">{service.name}</p>
                          <p className="text-[#8a8a8a] text-xs">{service.duration} min • {service.price}</p>
                        </div>
                        <button onClick={() => removeService(service.id)} className="ml-2 p-1 text-[#8a8a8a] hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#e8e6e3] pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8a8a8a]">Total Duration</span>
                      <span className="text-[#2c2c2c]">{totals.totalDuration} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8a8a8a]">Estimated Total</span>
                      <span className="text-[#b8956c] font-semibold text-lg">${totals.minPrice}+</span>
                    </div>
                  </div>
                </>
              )}

              {step >= 2 && selectedDate && (
                <div className="border-t border-[#e8e6e3] pt-4 mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="w-4 h-4 text-[#b8956c] mr-2" />
                    <span className="text-[#8a8a8a]">{format(selectedDate, 'MMM d, yyyy')}</span>
                  </div>
                  {selectedTime && (
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 text-[#b8956c] mr-2" />
                      <span className="text-[#8a8a8a]">{selectedTime}</span>
                    </div>
                  )}
                  {selectedStylist && (
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 text-[#b8956c] mr-2" />
                      <span className="text-[#8a8a8a]">{selectedStylist.name}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
