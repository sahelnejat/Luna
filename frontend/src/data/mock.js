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
  logo: "https://customer-assets.emergentagent.com/job_286d3f4e-f5b2-4ab1-a980-eb21fd9d508c/artifacts/p05j140g_Untitled-1-01.webp"
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
      { name: "Dry Cut", price: "$40+", duration: 30 },
      { name: "Fringe/Bang Trim", price: "$15+", duration: 15 },
      { name: "Up Do", price: "$150+", duration: 90 },
      { name: "Half Up Do/Prom", price: "$75+", duration: 60 }
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
      { name: "Toner", price: "$65+", duration: 30 },
      { name: "Color Correction", price: "Consultation", duration: 180 },
      { name: "Lowlights", price: "$140+", duration: 90 }
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
      { name: "Olaplex Treatment", price: "$75+", duration: 45 },
      { name: "Scalp Detox", price: "$45+", duration: 30 },
      { name: "Protein Treatment", price: "$65+", duration: 45 },
      { name: "Moisture Repair", price: "$60+", duration: 45 },
      { name: "Perm", price: "$150", duration: 120 }
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
      { name: "Hair Extension", price: "Consultation", duration: 180 },
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
