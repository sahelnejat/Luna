// Luna Hair Salon Mock Data

export const salonInfo = {
  name: "Luna Hair Salon",
  tagline: "Your trusted Destination for expert hair care & beauty",
  address: "50 Rideau Street, Ottawa, Ontario K1N 9J7",
  location: "CF Rideau Centre, Top Floor",
  phone: "+1 (613) 555-0123",
  email: "hello@lunahairsalon.ca",
  hours: {
    weekdays: "9:00 AM - 8:00 PM",
    saturday: "9:00 AM - 6:00 PM",
    sunday: "10:00 AM - 5:00 PM"
  },
  logo: "https://customer-assets.emergentagent.com/job_beautyspot-10/artifacts/x8ire50k_1000129657-removebg-preview.png"
};

export const salonImages = {
  hero: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1920&q=80",
  glamorousHair: "https://images.pexels.com/photos/3448813/pexels-photo-3448813.jpeg?auto=compress&w=800",
  braidedHair: "https://images.unsplash.com/photo-1699640368217-9514aba80e58?w=800&q=80",
  salonInterior: "https://images.unsplash.com/photo-1759134155377-4207d89b39ec?w=800&q=80",
  stylistWorking: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  eyebrowTreatment: "https://images.pexels.com/photos/8558247/pexels-photo-8558247.jpeg?auto=compress&w=800",
  hairTreatment: "https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&w=800",
  elegantBride: "https://images.unsplash.com/photo-1539025137588-9e6395c9396e?w=800&q=80"
};

export const services = [
  {
    id: 1,
    category: "Haircuts & Styling",
    icon: "Scissors",
    description: "Includes trims, full cuts, blowouts, and professional styling for everyday or special occasions.",
    items: [
      { name: "HairCut", price: "$50+", duration: 45 },
      { name: "BlowDry", price: "$50+", duration: 30 },
      { name: "Wash Cut & BlowDry", price: "$70+", duration: 60 },
      { name: "Up Do", price: "$150+", duration: 90 },
      { name: "Half Up Do/Prom", price: "$75+", duration: 60 },
      { name: "Perm", price: "$150", duration: 120 }
    ]
  },
  {
    id: 2,
    category: "Color Services",
    icon: "Palette",
    description: "Enjoy our range of coloring services, from highlights and balayage to full color and root touch-ups.",
    items: [
      { name: "Root Touch-up", price: "$75+", duration: 60 },
      { name: "Full Color", price: "$125+", duration: 90 },
      { name: "Highlights", price: "$200+", duration: 120 },
      { name: "Partial Highlights", price: "$140+", duration: 90 },
      { name: "Balayage", price: "$240+", duration: 150 },
      { name: "Partial Balayage", price: "$160+", duration: 120 },
      { name: "Toner", price: "$65+", duration: 30 }
    ]
  },
  {
    id: 3,
    category: "Hair Treatments",
    icon: "Sparkles",
    description: "Deep conditioning, keratin treatments, and scalp care to nourish and repair hair.",
    items: [
      { name: "Hair Keratin", price: "$350+", duration: 180 },
      { name: "Deep Treatment", price: "$55+", duration: 45 },
      { name: "Hair Extension", price: "Price upon consultation", duration: 180 }
    ]
  },
  {
    id: 4,
    category: "Beauty & Add-Ons",
    icon: "Star",
    description: "Complete your look with our beauty services including makeup, brows, and lashes.",
    items: [
      { name: "Makeup", price: "$90+", duration: 60 },
      { name: "Eyebrow Shaping", price: "$20+", duration: 15 },
      { name: "Eyelash Extensions", price: "$100+", duration: 90 },
      { name: "Full Face Threading", price: "$50+", duration: 30 },
      { name: "Free Consultation", price: "Free", duration: 30 }
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    text: "Luna Hair Salon transformed my hair completely! The balayage is absolutely stunning and the team made me feel so comfortable.",
    rating: 5
  },
  {
    id: 2,
    name: "Emily R.",
    text: "Best salon experience in Ottawa. The attention to detail and luxurious atmosphere make every visit special.",
    rating: 5
  },
  {
    id: 3,
    name: "Jessica L.",
    text: "I've been coming here for over a year now. The stylists truly understand what you want and deliver every time.",
    rating: 5
  }
];

export const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM"
];

export const stylists = [
  { id: 1, name: "Sofia Martinez", specialty: "Color Specialist", image: null },
  { id: 2, name: "Emma Chen", specialty: "Cut & Style Expert", image: null },
  { id: 3, name: "Olivia Brown", specialty: "Bridal & Updos", image: null },
  { id: 4, name: "Any Available", specialty: "All Services", image: null }
];
