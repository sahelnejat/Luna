# Luna Hair Salon - Product Requirements Document

## Original Problem Statement
Create a luxurious website for "Luna Hair Salon" located in Ottawa at CF Rideau Centre. The website should showcase the salon's services, enable customers to book appointments, and reflect a premium, modern aesthetic.

## User Personas
- **Primary**: Women 25-55 seeking premium hair services in Ottawa
- **Secondary**: Brides and event attendees needing styling services
- **Tertiary**: Walk-in customers looking for salon information

## Core Requirements
1. ✅ Professional salon website with pages: Home, About, Services, Contact
2. ✅ Responsive design (mobile, tablet, desktop)
3. ✅ Booking system integration (external Milano POS link)
4. ✅ Contact form with backend storage
5. ✅ Mixed dark/light theme (dark header, light body)
6. ✅ Hero section with image slideshow
7. ✅ Split navigation with centered logo

## Current Architecture

### Frontend (React)
- **Framework**: React with React Router
- **Styling**: TailwindCSS with custom gold accent (#b8956c)
- **Components**: Shadcn UI (modified)
- **Pages**: HomePage, AboutPage, ServicesPage, ContactPage

### Backend (FastAPI)
- **Framework**: FastAPI with Python
- **Database**: MongoDB (Motor async driver)
- **Active Endpoints**: `/api/contact`, `/api/` (health check)

### External Integration
- **Milano POS**: External booking via `https://milanoweb.milanocloud.com:1443/index.html?store=lunasalon`

## What's Been Implemented

### December 2024
- Initial full-stack website build
- Home, About, Services, Contact pages
- Custom booking system (multi-service selection, cart, pricing)
- Contact form with MongoDB storage
- Professional salon images integration
- Mobile slide-in drawer navigation

### January 2025
- **Complete theme redesign**: Mixed dark/light theme
- **New header layout**: Dark header, centered logo, split navigation
- **Hero slideshow**: Auto-transitioning images (4-second intervals)
- **External booking**: All "Book Now" buttons link to Milano POS
- **Removed internal booking page**: /booking route removed from App.js

## Technical Details

### Key Files
- `/app/frontend/src/pages/HomePage.jsx` - Hero slideshow, mixed theme sections
- `/app/frontend/src/components/layout/Header.jsx` - Dark header, centered logo
- `/app/frontend/src/components/layout/Footer.jsx` - Dark footer
- `/app/frontend/src/data/mock.js` - Salon data, images, services
- `/app/backend/server.py` - FastAPI endpoints

### Color Scheme
- Primary Dark: #1a1a1a
- Gold Accent: #b8956c
- Light Background: #faf9f7, #ffffff
- Text Dark: #2c2c2c
- Text Muted: #5a5a5a

## Prioritized Backlog

### P1 (Cleanup)
- [ ] Remove orphaned booking endpoints from backend (`/api/bookings`, `/api/services`, `/api/stylists`, `/api/timeslots`)
- [ ] Delete unused `BookingPage.jsx`
- [ ] Update or remove outdated `contracts.md`

### P2 (Enhancements)
- [ ] Email notifications for contact form submissions
- [ ] Admin dashboard for managing contact inquiries
- [ ] Google Analytics integration
- [ ] SEO optimization (meta tags, structured data)

### P3 (Future Features)
- [ ] Gallery page with portfolio images
- [ ] Team/stylists page
- [ ] Blog or promotions section
- [ ] Newsletter signup integration

## Notes
- The custom booking system code still exists in backend but is not used
- Milano POS is the current booking solution (external link, not API integration)
- All images sourced from Unsplash/Pexels
