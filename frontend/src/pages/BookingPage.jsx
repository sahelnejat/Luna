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
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { services, timeSlots, stylists, salonInfo } from '../data/mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
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

  // Generate week days
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate booking reference
    const reference = `LUNA-${Date.now().toString(36).toUpperCase()}`;
    setBookingReference(reference);
    
    console.log('Booking submitted:', {
      service: selectedService?.category,
      subService: selectedSubService?.name,
      date: selectedDate,
      time: selectedTime,
      stylist: selectedStylist?.name,
      client: clientInfo,
      reference,
    });
    
    setIsSubmitting(false);
    setBookingConfirmed(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedService && selectedSubService;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return selectedStylist;
      case 4:
        return clientInfo.firstName && clientInfo.lastName && clientInfo.email && clientInfo.phone;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (canProceed()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Progress indicator
  const steps = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Date & Time' },
    { num: 3, label: 'Stylist' },
    { num: 4, label: 'Details' },
    { num: 5, label: 'Confirm' },
  ];

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-[#0d0d0f]">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="py-20">
            <div className="w-24 h-24 rounded-full bg-[#c9a96e]/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-[#c9a96e]" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-light text-[#f7f5f2] mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-[#bbb5ae] text-lg mb-8">
              Thank you for booking with Luna Hair Salon.
            </p>
            
            <div className="glass p-8 rounded-xl mb-8 text-left">
              <div className="text-center mb-6">
                <p className="text-[#bbb5ae] text-sm">Booking Reference</p>
                <p className="text-[#c9a96e] text-2xl font-medium">{bookingReference}</p>
              </div>
              
              <div className="space-y-4 border-t border-[#c9a96e]/10 pt-6">
                <div className="flex justify-between">
                  <span className="text-[#bbb5ae]">Service</span>
                  <span className="text-[#f7f5f2]">{selectedSubService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bbb5ae]">Date</span>
                  <span className="text-[#f7f5f2]">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bbb5ae]">Time</span>
                  <span className="text-[#f7f5f2]">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bbb5ae]">Stylist</span>
                  <span className="text-[#f7f5f2]">{selectedStylist?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bbb5ae]">Duration</span>
                  <span className="text-[#f7f5f2]">{selectedSubService?.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bbb5ae]">Price</span>
                  <span className="text-[#c9a96e] font-medium">{selectedSubService?.price}</span>
                </div>
              </div>
            </div>
            
            <p className="text-[#bbb5ae] text-sm mb-8">
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
    <div className="min-h-screen pt-24 pb-16 bg-[#0d0d0f]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] text-sm uppercase tracking-[0.3em] mb-4">
            Book Online
          </p>
          <h1 className="text-3xl lg:text-5xl font-light text-[#f7f5f2] mb-4">
            Book Your <span className="text-gradient-gold">Appointment</span>
          </h1>
          <p className="text-[#bbb5ae]">
            Easy, fast, and tailored just for you
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
                        ? 'bg-[#c9a96e] text-[#0d0d0f]'
                        : 'bg-[#1a1a1f] text-[#bbb5ae] border border-[#c9a96e]/20'
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className="text-xs text-[#bbb5ae] mt-2 hidden sm:block">{s.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 transition-all duration-300 ${
                      step > s.num ? 'bg-[#c9a96e]' : 'bg-[#1a1a1f]'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="glass p-8 lg:p-12 rounded-2xl">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-light text-[#f7f5f2] mb-6 flex items-center">
                <Scissors className="w-6 h-6 text-[#c9a96e] mr-3" />
                Select Your Service
              </h2>

              <div className="space-y-4 mb-8">
                {services.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => {
                        setSelectedService(category);
                        setSelectedSubService(null);
                      }}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                        selectedService?.id === category.id
                          ? 'bg-[#c9a96e]/20 border-[#c9a96e]'
                          : 'bg-[#0d0d0f] border-[#c9a96e]/10 hover:border-[#c9a96e]/30'
                      } border`}
                    >
                      <h3 className="text-[#f7f5f2] font-medium">{category.category}</h3>
                      <p className="text-[#bbb5ae] text-sm">{category.description}</p>
                    </button>

                    {/* Sub-services */}
                    {selectedService?.id === category.id && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pl-4">
                        {category.items.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedSubService(item)}
                            className={`p-3 rounded-lg text-left transition-all duration-300 ${
                              selectedSubService?.name === item.name
                                ? 'bg-[#c9a96e] text-[#0d0d0f]'
                                : 'bg-[#1a1a1f] hover:bg-[#1a1a1f]/80 text-[#f7f5f2]'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{item.name}</span>
                              <span className={`text-sm ${
                                selectedSubService?.name === item.name ? 'text-[#0d0d0f]' : 'text-[#c9a96e]'
                              }`}>
                                {item.price}
                              </span>
                            </div>
                            <span className={`text-xs ${
                              selectedSubService?.name === item.name ? 'text-[#0d0d0f]/70' : 'text-[#bbb5ae]'
                            }`}>
                              {item.duration} min
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-light text-[#f7f5f2] mb-6 flex items-center">
                <CalendarIcon className="w-6 h-6 text-[#c9a96e] mr-3" />
                Select Date & Time
              </h2>

              {/* Week Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevWeek}
                  disabled={isBefore(addDays(currentWeekStart, -7), startOfWeek(today, { weekStartsOn: 1 }))}
                  className="p-2 rounded-lg bg-[#1a1a1f] text-[#c9a96e] hover:bg-[#c9a96e]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-[#f7f5f2] font-medium">
                  {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
                </span>
                <button
                  onClick={handleNextWeek}
                  className="p-2 rounded-lg bg-[#1a1a1f] text-[#c9a96e] hover:bg-[#c9a96e]/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Date Selection */}
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
                          ? 'bg-[#c9a96e] text-[#0d0d0f]'
                          : isPast
                          ? 'bg-[#1a1a1f]/50 text-[#bbb5ae]/30 cursor-not-allowed'
                          : 'bg-[#1a1a1f] text-[#f7f5f2] hover:bg-[#c9a96e]/20'
                      }`}
                    >
                      <span className="block text-xs mb-1">{format(day, 'EEE')}</span>
                      <span className="block text-lg font-medium">{format(day, 'd')}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="text-[#f7f5f2] font-medium mb-4 flex items-center">
                    <Clock className="w-5 h-5 text-[#c9a96e] mr-2" />
                    Available Times
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg text-sm transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-[#c9a96e] text-[#0d0d0f] font-medium'
                            : 'bg-[#0d0d0f] text-[#f7f5f2] hover:bg-[#c9a96e]/20 border border-[#c9a96e]/10'
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
              <h2 className="text-2xl font-light text-[#f7f5f2] mb-6 flex items-center">
                <User className="w-6 h-6 text-[#c9a96e] mr-3" />
                Choose Your Stylist
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stylists.map((stylist) => (
                  <button
                    key={stylist.id}
                    onClick={() => setSelectedStylist(stylist)}
                    className={`p-6 rounded-xl text-left transition-all duration-300 ${
                      selectedStylist?.id === stylist.id
                        ? 'bg-[#c9a96e]/20 border-[#c9a96e]'
                        : 'bg-[#0d0d0f] border-[#c9a96e]/10 hover:border-[#c9a96e]/30'
                    } border`}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a96e]/30 to-[#1a1a1f] flex items-center justify-center mr-4">
                        <span className="text-2xl text-[#c9a96e]">
                          {stylist.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[#f7f5f2] font-medium">{stylist.name}</h3>
                        <p className="text-[#c9a96e] text-sm">{stylist.specialty}</p>
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
              <h2 className="text-2xl font-light text-[#f7f5f2] mb-6">
                Your Details
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#f7f5f2] text-sm mb-2">
                      First Name <span className="text-[#c9a96e]">*</span>
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={clientInfo.firstName}
                      onChange={handleClientInfoChange}
                      required
                      className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50"
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
                      value={clientInfo.lastName}
                      onChange={handleClientInfoChange}
                      required
                      className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50"
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
                    value={clientInfo.email}
                    onChange={handleClientInfoChange}
                    required
                    className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[#f7f5f2] text-sm mb-2">
                    Phone <span className="text-[#c9a96e]">*</span>
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={clientInfo.phone}
                    onChange={handleClientInfoChange}
                    required
                    className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-[#f7f5f2] text-sm mb-2">
                    Special Requests (Optional)
                  </label>
                  <Textarea
                    name="notes"
                    value={clientInfo.notes}
                    onChange={handleClientInfoChange}
                    rows={4}
                    className="bg-[#0d0d0f] border-[#c9a96e]/20 text-[#f7f5f2] placeholder:text-[#bbb5ae]/50 resize-none"
                    placeholder="Any special requests or notes for your appointment..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-light text-[#f7f5f2] mb-6">
                Review & Confirm
              </h2>

              <div className="space-y-6">
                {/* Booking Summary */}
                <div className="bg-[#0d0d0f] rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-[#c9a96e]/10">
                    <div>
                      <p className="text-[#bbb5ae] text-sm">Service</p>
                      <p className="text-[#f7f5f2] font-medium">{selectedSubService?.name}</p>
                      <p className="text-[#bbb5ae] text-sm">{selectedService?.category}</p>
                    </div>
                    <p className="text-[#c9a96e] font-medium text-lg">{selectedSubService?.price}</p>
                  </div>

                  <div className="flex justify-between pb-4 border-b border-[#c9a96e]/10">
                    <div>
                      <p className="text-[#bbb5ae] text-sm">Date & Time</p>
                      <p className="text-[#f7f5f2]">
                        {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-[#c9a96e]">{selectedTime}</p>
                    </div>
                    <div>
                      <p className="text-[#bbb5ae] text-sm">Duration</p>
                      <p className="text-[#f7f5f2]">{selectedSubService?.duration} min</p>
                    </div>
                  </div>

                  <div className="flex justify-between pb-4 border-b border-[#c9a96e]/10">
                    <div>
                      <p className="text-[#bbb5ae] text-sm">Stylist</p>
                      <p className="text-[#f7f5f2]">{selectedStylist?.name}</p>
                      <p className="text-[#c9a96e] text-sm">{selectedStylist?.specialty}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#bbb5ae] text-sm mb-2">Client Information</p>
                    <p className="text-[#f7f5f2]">
                      {clientInfo.firstName} {clientInfo.lastName}
                    </p>
                    <p className="text-[#bbb5ae] text-sm">{clientInfo.email}</p>
                    <p className="text-[#bbb5ae] text-sm">{clientInfo.phone}</p>
                    {clientInfo.notes && (
                      <p className="text-[#bbb5ae] text-sm mt-2 italic">
                        Note: {clientInfo.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="bg-[#0d0d0f] rounded-xl p-6">
                  <p className="text-[#bbb5ae] text-sm mb-2">Location</p>
                  <p className="text-[#f7f5f2]">{salonInfo.name}</p>
                  <p className="text-[#bbb5ae] text-sm">{salonInfo.address}</p>
                  <p className="text-[#bbb5ae] text-sm">{salonInfo.location}</p>
                </div>

                <p className="text-[#bbb5ae] text-sm text-center">
                  By confirming this booking, you agree to our cancellation policy.
                  Please arrive 10 minutes before your appointment.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#c9a96e]/10">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center text-[#bbb5ae] hover:text-[#f7f5f2] transition-colors ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            {step < 5 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="btn-gold px-8 py-3 text-sm tracking-wider uppercase rounded-sm flex items-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-gold px-8 py-3 text-sm tracking-wider uppercase rounded-sm flex items-center group"
              >
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
    </div>
  );
};

export default BookingPage;
