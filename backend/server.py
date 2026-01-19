from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Luna Hair Salon API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ==================== Models ====================

class ClientInfo(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    notes: Optional[str] = ""


class ServiceItem(BaseModel):
    category: str
    name: str
    price: str
    duration: int


class BookingCreate(BaseModel):
    # Support both single service (legacy) and multiple services
    service_category: Optional[str] = None
    service_name: Optional[str] = None
    service_price: Optional[str] = None
    service_duration: Optional[int] = None
    # New: multiple services
    services: Optional[List[ServiceItem]] = None
    total_duration: Optional[int] = None
    total_price_min: Optional[str] = None
    date: str
    time: str
    stylist_id: int
    stylist_name: str
    client: ClientInfo


class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    reference: str
    status: str = "confirmed"
    # Support both single and multiple services
    service_category: Optional[str] = None
    service_name: Optional[str] = None
    service_price: Optional[str] = None
    service_duration: Optional[int] = None
    services: Optional[List[dict]] = None
    total_duration: Optional[int] = None
    total_price_min: Optional[str] = None
    date: str
    time: str
    stylist_id: int
    stylist_name: str
    client_first_name: str
    client_last_name: str
    client_email: str
    client_phone: str
    client_notes: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ContactCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    subject: str
    message: str


class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    email: str
    subject: str
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ServiceItem(BaseModel):
    name: str
    price: str
    duration: int


class Service(BaseModel):
    id: int
    category: str
    icon: str
    description: str
    items: List[ServiceItem]


class Stylist(BaseModel):
    id: int
    name: str
    specialty: str


# ==================== Static Data ====================

SERVICES = [
    {
        "id": 1,
        "category": "Haircuts & Styling",
        "icon": "Scissors",
        "description": "Includes trims, full cuts, blowouts, and professional styling for everyday or special occasions.",
        "items": [
            {"name": "HairCut", "price": "$50+", "duration": 45},
            {"name": "BlowDry", "price": "$50+", "duration": 30},
            {"name": "Wash Cut & BlowDry", "price": "$70+", "duration": 60},
            {"name": "Dry Cut", "price": "$40+", "duration": 30},
            {"name": "Fringe/Bang Trim", "price": "$15+", "duration": 15},
            {"name": "Up Do", "price": "$150+", "duration": 90},
            {"name": "Half Up Do/Prom", "price": "$75+", "duration": 60}
        ]
    },
    {
        "id": 2,
        "category": "Color Services",
        "icon": "Palette",
        "description": "Enjoy our range of coloring services, from highlights and balayage to full color and root touch-ups.",
        "items": [
            {"name": "Root Touch-up", "price": "$75+", "duration": 60},
            {"name": "Full Color", "price": "$125+", "duration": 90},
            {"name": "Highlights", "price": "$200+", "duration": 120},
            {"name": "Partial Highlights", "price": "$140+", "duration": 90},
            {"name": "Balayage", "price": "$240+", "duration": 150},
            {"name": "Partial Balayage", "price": "$160+", "duration": 120},
            {"name": "Toner", "price": "$65+", "duration": 30},
            {"name": "Color Correction", "price": "Consultation", "duration": 180},
            {"name": "Lowlights", "price": "$140+", "duration": 90}
        ]
    },
    {
        "id": 3,
        "category": "Hair Treatments",
        "icon": "Sparkles",
        "description": "Deep conditioning, keratin treatments, and scalp care to nourish and repair hair.",
        "items": [
            {"name": "Hair Keratin", "price": "$350+", "duration": 180},
            {"name": "Deep Treatment", "price": "$55+", "duration": 45},
            {"name": "Olaplex Treatment", "price": "$75+", "duration": 45},
            {"name": "Scalp Detox", "price": "$45+", "duration": 30},
            {"name": "Protein Treatment", "price": "$65+", "duration": 45},
            {"name": "Moisture Repair", "price": "$60+", "duration": 45},
            {"name": "Perm", "price": "$150", "duration": 120}
        ]
    },
    {
        "id": 4,
        "category": "Beauty & Add-Ons",
        "icon": "Star",
        "description": "Complete your look with our beauty services including makeup, brows, and lashes.",
        "items": [
            {"name": "Makeup", "price": "$90+", "duration": 60},
            {"name": "Eyebrow Shaping", "price": "$20+", "duration": 15},
            {"name": "Eyelash Extensions", "price": "$100+", "duration": 90},
            {"name": "Full Face Threading", "price": "$50+", "duration": 30},
            {"name": "Hair Extension", "price": "Consultation", "duration": 180},
            {"name": "Free Consultation", "price": "Free", "duration": 30}
        ]
    }
]

STYLISTS = [
    {"id": 1, "name": "Sofia Martinez", "specialty": "Color Specialist"},
    {"id": 2, "name": "Emma Chen", "specialty": "Cut & Style Expert"},
    {"id": 3, "name": "Olivia Brown", "specialty": "Bridal & Updos"},
    {"id": 4, "name": "Any Available", "specialty": "All Services"}
]

TIME_SLOTS = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM"
]


# ==================== Helper Functions ====================

def generate_reference():
    """Generate a unique booking reference like LUNA-ABC123"""
    import time
    timestamp = int(time.time() * 1000)
    base36 = ""
    while timestamp:
        timestamp, remainder = divmod(timestamp, 36)
        base36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[remainder] + base36
    return f"LUNA-{base36[-6:]}"


# ==================== Routes ====================

@api_router.get("/")
async def root():
    return {"message": "Luna Hair Salon API", "status": "running"}


# --- Services Routes ---

@api_router.get("/services", response_model=dict)
async def get_services():
    """Get all services with categories"""
    return {"services": SERVICES}


# --- Stylists Routes ---

@api_router.get("/stylists", response_model=dict)
async def get_stylists():
    """Get available stylists"""
    return {"stylists": STYLISTS}


# --- Time Slots Routes ---

@api_router.get("/timeslots")
async def get_time_slots(date: str, stylist_id: Optional[int] = None):
    """Get available time slots for a specific date"""
    # In a real implementation, we would check existing bookings
    # For now, return all slots as available
    
    # Check existing bookings for this date and stylist
    query = {"date": date}
    if stylist_id and stylist_id != 4:  # 4 is "Any Available"
        query["stylist_id"] = stylist_id
    
    booked_times = []
    async for booking in db.bookings.find(query, {"time": 1}):
        booked_times.append(booking["time"])
    
    available_slots = [slot for slot in TIME_SLOTS if slot not in booked_times]
    
    return {
        "date": date,
        "stylist_id": stylist_id,
        "available_slots": available_slots
    }


# --- Booking Routes ---

@api_router.post("/bookings", response_model=dict, status_code=201)
async def create_booking(booking_data: BookingCreate):
    """Create a new booking appointment with single or multiple services"""
    try:
        reference = generate_reference()
        
        # Handle multiple services
        if booking_data.services and len(booking_data.services) > 0:
            services_list = [s.dict() for s in booking_data.services]
            booking = Booking(
                reference=reference,
                services=services_list,
                total_duration=booking_data.total_duration,
                total_price_min=booking_data.total_price_min,
                date=booking_data.date,
                time=booking_data.time,
                stylist_id=booking_data.stylist_id,
                stylist_name=booking_data.stylist_name,
                client_first_name=booking_data.client.first_name,
                client_last_name=booking_data.client.last_name,
                client_email=booking_data.client.email,
                client_phone=booking_data.client.phone,
                client_notes=booking_data.client.notes or ""
            )
        else:
            # Legacy single service booking
            booking = Booking(
                reference=reference,
                service_category=booking_data.service_category,
                service_name=booking_data.service_name,
                service_price=booking_data.service_price,
                service_duration=booking_data.service_duration,
                date=booking_data.date,
                time=booking_data.time,
                stylist_id=booking_data.stylist_id,
                stylist_name=booking_data.stylist_name,
                client_first_name=booking_data.client.first_name,
                client_last_name=booking_data.client.last_name,
                client_email=booking_data.client.email,
                client_phone=booking_data.client.phone,
                client_notes=booking_data.client.notes or ""
            )
        
        booking_dict = booking.dict()
        booking_dict["created_at"] = datetime.utcnow()
        
        await db.bookings.insert_one(booking_dict)
        
        logger.info(f"Booking created: {reference} for {booking_data.client.email}")
        
        # Return appropriate response based on booking type
        response = {
            "id": booking.id,
            "reference": reference,
            "status": "confirmed",
            "date": booking.date,
            "time": booking.time,
            "stylist_name": booking.stylist_name,
            "client_name": f"{booking.client_first_name} {booking.client_last_name}",
            "client_email": booking.client_email,
            "created_at": booking.created_at.isoformat()
        }
        
        if booking.services:
            response["services"] = booking.services
            response["total_duration"] = booking.total_duration
            response["total_price_min"] = booking.total_price_min
        else:
            response["service_category"] = booking.service_category
            response["service_name"] = booking.service_name
            response["service_price"] = booking.service_price
            response["service_duration"] = booking.service_duration
        
        return response
    except Exception as e:
        logger.error(f"Error creating booking: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create booking")


@api_router.get("/bookings", response_model=dict)
async def get_bookings():
    """Get all bookings (admin use)"""
    bookings = []
    async for booking in db.bookings.find().sort("created_at", -1):
        booking["_id"] = str(booking["_id"])
        if "created_at" in booking and isinstance(booking["created_at"], datetime):
            booking["created_at"] = booking["created_at"].isoformat()
        bookings.append(booking)
    return {"bookings": bookings}


@api_router.get("/bookings/{reference}", response_model=dict)
async def get_booking_by_reference(reference: str):
    """Get booking by reference number"""
    booking = await db.bookings.find_one({"reference": reference})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking["_id"] = str(booking["_id"])
    if "created_at" in booking and isinstance(booking["created_at"], datetime):
        booking["created_at"] = booking["created_at"].isoformat()
    return booking


# --- Contact Routes ---

@api_router.post("/contact", response_model=dict, status_code=201)
async def create_contact(contact_data: ContactCreate):
    """Submit a contact form inquiry"""
    try:
        contact = Contact(
            first_name=contact_data.first_name,
            last_name=contact_data.last_name,
            email=contact_data.email,
            subject=contact_data.subject,
            message=contact_data.message
        )
        
        contact_dict = contact.dict()
        contact_dict["created_at"] = datetime.utcnow()
        
        await db.contact_submissions.insert_one(contact_dict)
        
        logger.info(f"Contact form submitted by {contact_data.email}")
        
        return {
            "id": contact.id,
            "status": "received",
            "message": "Thank you for your message. We'll get back to you soon.",
            "created_at": contact.created_at.isoformat()
        }
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")


@api_router.get("/contact", response_model=dict)
async def get_contact_submissions():
    """Get all contact submissions (admin use)"""
    contacts = []
    async for contact in db.contact_submissions.find().sort("created_at", -1):
        contact["_id"] = str(contact["_id"])
        if "created_at" in contact and isinstance(contact["created_at"], datetime):
            contact["created_at"] = contact["created_at"].isoformat()
        contacts.append(contact)
    return {"contacts": contacts}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
