# Luna Hair Salon - API Contracts

## Overview
This document outlines the API contracts for the Luna Hair Salon website backend integration.

## Current Mock Data Location
- `/app/frontend/src/data/mock.js`

---

## 1. Booking System API

### POST /api/bookings
Create a new booking appointment.

**Request Body:**
```json
{
  "service_category": "string",
  "service_name": "string",
  "service_price": "string",
  "service_duration": "number (minutes)",
  "date": "string (ISO date)",
  "time": "string (e.g., '10:00 AM')",
  "stylist_id": "number",
  "stylist_name": "string",
  "client": {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "notes": "string (optional)"
  }
}
```

**Response (201 Created):**
```json
{
  "id": "string (UUID)",
  "reference": "string (e.g., 'LUNA-ABC123')",
  "status": "confirmed",
  "service_category": "string",
  "service_name": "string",
  "service_price": "string",
  "service_duration": "number",
  "date": "string",
  "time": "string",
  "stylist_name": "string",
  "client_name": "string",
  "client_email": "string",
  "created_at": "string (ISO datetime)"
}
```

### GET /api/bookings
Get all bookings (admin use).

**Response (200 OK):**
```json
{
  "bookings": [
    {
      "id": "string",
      "reference": "string",
      "status": "string",
      ...
    }
  ]
}
```

### GET /api/bookings/{reference}
Get booking by reference number.

**Response (200 OK):**
```json
{
  "id": "string",
  "reference": "string",
  ...
}
```

---

## 2. Contact Form API

### POST /api/contact
Submit a contact form inquiry.

**Request Body:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response (201 Created):**
```json
{
  "id": "string",
  "status": "received",
  "message": "Thank you for your message. We'll get back to you soon.",
  "created_at": "string"
}
```

### GET /api/contact
Get all contact submissions (admin use).

---

## 3. Services API

### GET /api/services
Get all services with categories.

**Response (200 OK):**
```json
{
  "services": [
    {
      "id": "number",
      "category": "string",
      "icon": "string",
      "description": "string",
      "items": [
        {
          "name": "string",
          "price": "string",
          "duration": "number"
        }
      ]
    }
  ]
}
```

---

## 4. Stylists API

### GET /api/stylists
Get available stylists.

**Response (200 OK):**
```json
{
  "stylists": [
    {
      "id": "number",
      "name": "string",
      "specialty": "string"
    }
  ]
}
```

---

## 5. Time Slots API

### GET /api/timeslots?date={date}&stylist_id={id}
Get available time slots for a specific date and stylist.

**Query Parameters:**
- `date`: ISO date string (required)
- `stylist_id`: Stylist ID (optional)

**Response (200 OK):**
```json
{
  "date": "string",
  "available_slots": ["9:00 AM", "9:30 AM", ...]
}
```

---

## MongoDB Collections

### bookings
```json
{
  "_id": "ObjectId",
  "id": "string (UUID)",
  "reference": "string",
  "status": "string (confirmed/cancelled/completed)",
  "service_category": "string",
  "service_name": "string",
  "service_price": "string",
  "service_duration": "number",
  "date": "Date",
  "time": "string",
  "stylist_id": "number",
  "stylist_name": "string",
  "client_first_name": "string",
  "client_last_name": "string",
  "client_email": "string",
  "client_phone": "string",
  "client_notes": "string",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### contact_submissions
```json
{
  "_id": "ObjectId",
  "id": "string (UUID)",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "status": "string (new/read/replied)",
  "created_at": "Date"
}
```

---

## Frontend Integration Points

### BookingPage.jsx
- Replace `handleSubmit` mock API call with actual POST to `/api/bookings`
- Update booking confirmation to use returned reference

### ContactPage.jsx
- Replace `handleSubmit` mock API call with actual POST to `/api/contact`

---

## Notes
- All dates should be stored in UTC
- Booking references follow pattern: LUNA-{timestamp_base36}
- Email notifications can be added as a future enhancement
