#!/usr/bin/env python3
"""
Luna Hair Salon Backend API Test Suite
Tests all backend endpoints for functionality and data integrity
"""

import requests
import json
import sys
from datetime import datetime
import os

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return "http://localhost:8001"
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_URL = f"{BASE_URL}/api"

print(f"Testing Luna Hair Salon API at: {API_URL}")
print("=" * 60)

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def log_test(test_name, success, message="", response_data=None):
    """Log test results"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status} {test_name}")
    if message:
        print(f"    {message}")
    if response_data and not success:
        print(f"    Response: {response_data}")
    
    if success:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1
        test_results["errors"].append(f"{test_name}: {message}")
    print()

def test_health_check():
    """Test GET /api/ - Health check endpoint"""
    try:
        response = requests.get(f"{API_URL}/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "running":
                log_test("Health Check", True, "API is running")
                return True
            else:
                log_test("Health Check", False, f"Unexpected status: {data.get('status')}", data)
        else:
            log_test("Health Check", False, f"HTTP {response.status_code}", response.text)
    except Exception as e:
        log_test("Health Check", False, f"Connection error: {str(e)}")
    return False

def test_get_services():
    """Test GET /api/services - Should return service categories"""
    try:
        response = requests.get(f"{API_URL}/services", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            services = data.get("services", [])
            
            if isinstance(services, list) and len(services) > 0:
                # Check if services have expected structure
                first_service = services[0]
                required_fields = ["id", "category", "icon", "description", "items"]
                
                if all(field in first_service for field in required_fields):
                    log_test("Get Services", True, f"Found {len(services)} service categories")
                    return True, services
                else:
                    log_test("Get Services", False, "Services missing required fields", first_service)
            else:
                log_test("Get Services", False, "No services returned or invalid format", data)
        else:
            log_test("Get Services", False, f"HTTP {response.status_code}", response.text)
    except Exception as e:
        log_test("Get Services", False, f"Request error: {str(e)}")
    return False, None

def test_get_stylists():
    """Test GET /api/stylists - Should return stylists array"""
    try:
        response = requests.get(f"{API_URL}/stylists", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            stylists = data.get("stylists", [])
            
            if isinstance(stylists, list) and len(stylists) > 0:
                # Check if stylists have expected structure
                first_stylist = stylists[0]
                required_fields = ["id", "name", "specialty"]
                
                if all(field in first_stylist for field in required_fields):
                    log_test("Get Stylists", True, f"Found {len(stylists)} stylists")
                    return True, stylists
                else:
                    log_test("Get Stylists", False, "Stylists missing required fields", first_stylist)
            else:
                log_test("Get Stylists", False, "No stylists returned or invalid format", data)
        else:
            log_test("Get Stylists", False, f"HTTP {response.status_code}", response.text)
    except Exception as e:
        log_test("Get Stylists", False, f"Request error: {str(e)}")
    return False, None

def test_get_timeslots():
    """Test GET /api/timeslots?date=2025-01-25 - Should return available time slots"""
    try:
        test_date = "2025-01-25"
        response = requests.get(f"{API_URL}/timeslots?date={test_date}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if "available_slots" in data and "date" in data:
                available_slots = data["available_slots"]
                if isinstance(available_slots, list):
                    log_test("Get Timeslots", True, f"Found {len(available_slots)} available slots for {test_date}")
                    return True, available_slots
                else:
                    log_test("Get Timeslots", False, "Available slots not a list", data)
            else:
                log_test("Get Timeslots", False, "Missing required fields in response", data)
        else:
            log_test("Get Timeslots", False, f"HTTP {response.status_code}", response.text)
    except Exception as e:
        log_test("Get Timeslots", False, f"Request error: {str(e)}")
    return False, None

def test_create_booking():
    """Test POST /api/bookings - Create a new booking"""
    booking_data = {
        "service_category": "Color Services",
        "service_name": "Balayage",
        "service_price": "$240+",
        "service_duration": 150,
        "date": "2025-01-26",
        "time": "2:00 PM",
        "stylist_id": 2,
        "stylist_name": "Emma Chen",
        "client": {
            "first_name": "Test",
            "last_name": "User",
            "email": "test@example.com",
            "phone": "+1 555-999-8888",
            "notes": "Automated test booking"
        }
    }
    
    try:
        response = requests.post(
            f"{API_URL}/bookings",
            json=booking_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 201:
            data = response.json()
            
            # Check if booking has reference number
            if "reference" in data and data["reference"].startswith("LUNA-"):
                log_test("Create Booking", True, f"Booking created with reference: {data['reference']}")
                return True, data["reference"]
            else:
                log_test("Create Booking", False, "Missing or invalid reference number", data)
        else:
            log_test("Create Booking", False, f"HTTP {response.status_code}", response.text)
    except Exception as e:
        log_test("Create Booking", False, f"Request error: {str(e)}")
    return False, None

def test_get_bookings():
    """Test GET /api/bookings - Should return list of bookings"""
    try:
        response = requests.get(f"{API_URL}/bookings", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            bookings = data.get("bookings", [])
            
            if isinstance(bookings, list):
                log_test("Get Bookings", True, f"Retrieved {len(bookings)} bookings")
                return True, bookings
            else:
                log_test("Get Bookings", False, "Bookings not returned as list", data)
        else:
            log_test("Get Bookings", False, f"HTTP {response.status_code}", response.text)
    except Exception as e:
        log_test("Get Bookings", False, f"Request error: {str(e)}")
    return False, None

def test_create_contact():
    """Test POST /api/contact - Create contact submission"""
    contact_data = {
        "first_name": "Test",
        "last_name": "Contact",
        "email": "contact@example.com",
        "subject": "Service Inquiry",
        "message": "Testing the contact form"
    }
    
    try:
        response = requests.post(
            f"{API_URL}/contact",
            json=contact_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 201:
            data = response.json()
            
            if data.get("status") == "received":
                log_test("Create Contact", True, "Contact submission created successfully")
                return True, data.get("id")
            else:
                log_test("Create Contact", False, f"Unexpected status: {data.get('status')}", data)
        else:
            log_test("Create Contact", False, f"HTTP {response.status_code}", response.text)
    except Exception as e:
        log_test("Create Contact", False, f"Request error: {str(e)}")
    return False, None

def test_get_contacts():
    """Test GET /api/contact - Should return list of contact submissions"""
    try:
        response = requests.get(f"{API_URL}/contact", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            contacts = data.get("contacts", [])
            
            if isinstance(contacts, list):
                log_test("Get Contacts", True, f"Retrieved {len(contacts)} contact submissions")
                return True, contacts
            else:
                log_test("Get Contacts", False, "Contacts not returned as list", data)
        else:
            log_test("Get Contacts", False, f"HTTP {response.status_code}", response.text)
    except Exception as e:
        log_test("Get Contacts", False, f"Request error: {str(e)}")
    return False, None

def run_all_tests():
    """Run all backend API tests"""
    print("Starting Luna Hair Salon Backend API Tests")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print("=" * 60)
    
    # Test 1: Health Check
    health_ok = test_health_check()
    
    if not health_ok:
        print("❌ CRITICAL: Health check failed. Cannot proceed with other tests.")
        return False
    
    # Test 2: Get Services
    services_ok, services = test_get_services()
    
    # Test 3: Get Stylists
    stylists_ok, stylists = test_get_stylists()
    
    # Test 4: Get Timeslots
    timeslots_ok, timeslots = test_get_timeslots()
    
    # Test 5: Create Booking
    booking_ok, booking_ref = test_create_booking()
    
    # Test 6: Get Bookings
    get_bookings_ok, bookings = test_get_bookings()
    
    # Test 7: Create Contact
    contact_ok, contact_id = test_create_contact()
    
    # Test 8: Get Contacts
    get_contacts_ok, contacts = test_get_contacts()
    
    # Summary
    print("=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    print(f"✅ Passed: {test_results['passed']}")
    print(f"❌ Failed: {test_results['failed']}")
    print(f"📊 Total: {test_results['passed'] + test_results['failed']}")
    
    if test_results['failed'] > 0:
        print("\n❌ FAILED TESTS:")
        for error in test_results['errors']:
            print(f"  - {error}")
    
    success_rate = (test_results['passed'] / (test_results['passed'] + test_results['failed'])) * 100
    print(f"\n📈 Success Rate: {success_rate:.1f}%")
    
    if success_rate == 100:
        print("\n🎉 ALL TESTS PASSED! Luna Hair Salon API is working correctly.")
        return True
    else:
        print(f"\n⚠️  {test_results['failed']} tests failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)