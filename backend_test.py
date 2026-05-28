#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for STARTON Landing Page
Tests all consultation endpoints with various scenarios
"""

import requests
import json
import os
from datetime import datetime
import time

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
    return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    exit(1)

API_URL = f"{BASE_URL}/api"
print(f"Testing API at: {API_URL}")

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
    
    def add_pass(self, test_name):
        self.passed += 1
        print(f"✅ PASS: {test_name}")
    
    def add_fail(self, test_name, error):
        self.failed += 1
        self.errors.append(f"{test_name}: {error}")
        print(f"❌ FAIL: {test_name} - {error}")
    
    def summary(self):
        total = self.passed + self.failed
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY: {self.passed}/{total} tests passed")
        if self.errors:
            print(f"\nFAILED TESTS:")
            for error in self.errors:
                print(f"  - {error}")
        print(f"{'='*60}")

results = TestResults()

def test_api_connection():
    """Test basic API connectivity"""
    try:
        response = requests.get(f"{API_URL}/", timeout=10)
        if response.status_code == 200:
            results.add_pass("API Connection")
            return True
        else:
            results.add_fail("API Connection", f"Status {response.status_code}")
            return False
    except Exception as e:
        results.add_fail("API Connection", str(e))
        return False

def test_valid_consultation_full():
    """Test valid consultation with all fields"""
    try:
        data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "company": "Tech Corp",
            "message": "I need help with digital transformation strategy for my company."
        }
        
        response = requests.post(f"{API_URL}/consultations", json=data, timeout=10)
        
        if response.status_code == 201:
            resp_data = response.json()
            if (resp_data.get("success") and 
                resp_data.get("data", {}).get("id") and 
                resp_data.get("data", {}).get("createdAt")):
                results.add_pass("Valid Consultation (All Fields)")
                return resp_data["data"]["id"]
            else:
                results.add_fail("Valid Consultation (All Fields)", "Invalid response format")
        else:
            results.add_fail("Valid Consultation (All Fields)", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("Valid Consultation (All Fields)", str(e))
    return None

def test_valid_consultation_no_company():
    """Test valid consultation without company field"""
    try:
        data = {
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "message": "Looking for marketing strategy consultation for my startup."
        }
        
        response = requests.post(f"{API_URL}/consultations", json=data, timeout=10)
        
        if response.status_code == 201:
            resp_data = response.json()
            if resp_data.get("success"):
                results.add_pass("Valid Consultation (No Company)")
                return resp_data["data"]["id"]
            else:
                results.add_fail("Valid Consultation (No Company)", "Invalid response format")
        else:
            results.add_fail("Valid Consultation (No Company)", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("Valid Consultation (No Company)", str(e))
    return None

def test_invalid_email():
    """Test consultation with invalid email format"""
    try:
        data = {
            "name": "Test User",
            "email": "invalid-email",
            "message": "This should fail due to invalid email format."
        }
        
        response = requests.post(f"{API_URL}/consultations", json=data, timeout=10)
        
        if response.status_code == 422:  # FastAPI validation error
            results.add_pass("Invalid Email Validation")
        elif response.status_code == 400:  # Custom validation error
            results.add_pass("Invalid Email Validation")
        else:
            results.add_fail("Invalid Email Validation", f"Expected 400/422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Invalid Email Validation", str(e))

def test_missing_required_fields():
    """Test consultation with missing required fields"""
    test_cases = [
        ({"email": "test@example.com", "message": "Missing name"}, "Missing Name"),
        ({"name": "Test User", "message": "Missing email"}, "Missing Email"),
        ({"name": "Test User", "email": "test@example.com"}, "Missing Message"),
        ({}, "Missing All Fields")
    ]
    
    for data, test_name in test_cases:
        try:
            response = requests.post(f"{API_URL}/consultations", json=data, timeout=10)
            
            if response.status_code in [400, 422]:
                results.add_pass(f"Validation - {test_name}")
            else:
                results.add_fail(f"Validation - {test_name}", f"Expected 400/422, got {response.status_code}")
        except Exception as e:
            results.add_fail(f"Validation - {test_name}", str(e))

def test_empty_strings():
    """Test consultation with empty string values"""
    test_cases = [
        ({"name": "", "email": "test@example.com", "message": "Valid message"}, "Empty Name"),
        ({"name": "Test User", "email": "test@example.com", "message": ""}, "Empty Message"),
        ({"name": "   ", "email": "test@example.com", "message": "Valid message"}, "Whitespace Name"),
        ({"name": "Test User", "email": "test@example.com", "message": "   "}, "Whitespace Message")
    ]
    
    for data, test_name in test_cases:
        try:
            response = requests.post(f"{API_URL}/consultations", json=data, timeout=10)
            
            if response.status_code in [400, 422]:
                results.add_pass(f"Empty String - {test_name}")
            else:
                results.add_fail(f"Empty String - {test_name}", f"Expected 400/422, got {response.status_code}")
        except Exception as e:
            results.add_fail(f"Empty String - {test_name}", str(e))

def test_message_length_validation():
    """Test message length validation"""
    try:
        # Test very short message (less than 10 chars)
        data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Short"
        }
        
        response = requests.post(f"{API_URL}/consultations", json=data, timeout=10)
        
        if response.status_code in [400, 422]:
            results.add_pass("Short Message Validation")
        else:
            results.add_fail("Short Message Validation", f"Expected 400/422, got {response.status_code}")
            
        # Test very long message (over 1000 chars)
        long_message = "A" * 1001
        data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": long_message
        }
        
        response = requests.post(f"{API_URL}/consultations", json=data, timeout=10)
        
        if response.status_code in [400, 422]:
            results.add_pass("Long Message Validation")
        else:
            results.add_fail("Long Message Validation", f"Expected 400/422, got {response.status_code}")
            
    except Exception as e:
        results.add_fail("Message Length Validation", str(e))

def test_name_length_validation():
    """Test name length validation"""
    try:
        # Test very long name (over 100 chars)
        long_name = "A" * 101
        data = {
            "name": long_name,
            "email": "test@example.com",
            "message": "This is a valid message for testing name length validation."
        }
        
        response = requests.post(f"{API_URL}/consultations", json=data, timeout=10)
        
        if response.status_code in [400, 422]:
            results.add_pass("Long Name Validation")
        else:
            results.add_fail("Long Name Validation", f"Expected 400/422, got {response.status_code}")
            
    except Exception as e:
        results.add_fail("Name Length Validation", str(e))

def test_special_characters():
    """Test consultation with special characters"""
    try:
        data = {
            "name": "José María O'Connor-Smith",
            "email": "jose.maria@example.com",
            "company": "Müller & Associates Ltd.",
            "message": "Hello! I'm interested in your services. Can you help with SEO & digital marketing? Thanks! 🚀"
        }
        
        response = requests.post(f"{API_URL}/consultations", json=data, timeout=10)
        
        if response.status_code == 201:
            results.add_pass("Special Characters Support")
        else:
            results.add_fail("Special Characters Support", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("Special Characters Support", str(e))

def test_get_consultations():
    """Test GET consultations endpoint"""
    try:
        response = requests.get(f"{API_URL}/consultations", timeout=10)
        
        if response.status_code == 200:
            resp_data = response.json()
            if (resp_data.get("success") and 
                "data" in resp_data and 
                "count" in resp_data and 
                "total" in resp_data):
                results.add_pass("GET Consultations")
                return resp_data
            else:
                results.add_fail("GET Consultations", "Invalid response format")
        else:
            results.add_fail("GET Consultations", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("GET Consultations", str(e))
    return None

def test_get_consultations_pagination():
    """Test GET consultations with pagination"""
    try:
        # Test with skip and limit parameters
        response = requests.get(f"{API_URL}/consultations?skip=0&limit=5", timeout=10)
        
        if response.status_code == 200:
            resp_data = response.json()
            if resp_data.get("success") and len(resp_data.get("data", [])) <= 5:
                results.add_pass("GET Consultations Pagination")
            else:
                results.add_fail("GET Consultations Pagination", "Pagination not working correctly")
        else:
            results.add_fail("GET Consultations Pagination", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("GET Consultations Pagination", str(e))

def test_consultation_data_integrity():
    """Test that consultation data is saved correctly"""
    try:
        # Create a consultation with specific data
        test_data = {
            "name": "Data Integrity Test",
            "email": "integrity@test.com",
            "company": "Test Company",
            "message": "This is a test message for data integrity verification."
        }
        
        # Create consultation
        create_response = requests.post(f"{API_URL}/consultations", json=test_data, timeout=10)
        
        if create_response.status_code != 201:
            results.add_fail("Data Integrity", f"Failed to create test consultation: {create_response.status_code}")
            return
        
        consultation_id = create_response.json()["data"]["id"]
        
        # Wait a moment for data to be saved
        time.sleep(1)
        
        # Retrieve consultations
        get_response = requests.get(f"{API_URL}/consultations", timeout=10)
        
        if get_response.status_code != 200:
            results.add_fail("Data Integrity", f"Failed to retrieve consultations: {get_response.status_code}")
            return
        
        consultations = get_response.json()["data"]
        
        # Find our consultation
        found_consultation = None
        for consultation in consultations:
            if consultation.get("id") == consultation_id:
                found_consultation = consultation
                break
        
        if found_consultation:
            # Verify data integrity
            if (found_consultation["name"] == test_data["name"] and
                found_consultation["email"] == test_data["email"] and
                found_consultation["company"] == test_data["company"] and
                found_consultation["message"] == test_data["message"] and
                found_consultation["status"] == "new" and
                "createdAt" in found_consultation):
                results.add_pass("Data Integrity")
            else:
                results.add_fail("Data Integrity", "Saved data doesn't match input data")
        else:
            results.add_fail("Data Integrity", "Created consultation not found in GET response")
            
    except Exception as e:
        results.add_fail("Data Integrity", str(e))

def test_consultation_sorting():
    """Test that consultations are sorted by createdAt (newest first)"""
    try:
        # Create two consultations with a small delay
        data1 = {
            "name": "First Consultation",
            "email": "first@test.com",
            "message": "This is the first consultation for sorting test."
        }
        
        data2 = {
            "name": "Second Consultation", 
            "email": "second@test.com",
            "message": "This is the second consultation for sorting test."
        }
        
        # Create first consultation
        response1 = requests.post(f"{API_URL}/consultations", json=data1, timeout=10)
        if response1.status_code != 201:
            results.add_fail("Consultation Sorting", "Failed to create first test consultation")
            return
        
        time.sleep(2)  # Wait to ensure different timestamps
        
        # Create second consultation
        response2 = requests.post(f"{API_URL}/consultations", json=data2, timeout=10)
        if response2.status_code != 201:
            results.add_fail("Consultation Sorting", "Failed to create second test consultation")
            return
        
        # Get consultations
        get_response = requests.get(f"{API_URL}/consultations", timeout=10)
        if get_response.status_code != 200:
            results.add_fail("Consultation Sorting", "Failed to retrieve consultations")
            return
        
        consultations = get_response.json()["data"]
        
        if len(consultations) >= 2:
            # Check if the most recent consultation is first
            first_consultation = consultations[0]
            if first_consultation["name"] == "Second Consultation":
                results.add_pass("Consultation Sorting")
            else:
                results.add_fail("Consultation Sorting", "Consultations not sorted by newest first")
        else:
            results.add_fail("Consultation Sorting", "Not enough consultations to test sorting")
            
    except Exception as e:
        results.add_fail("Consultation Sorting", str(e))

def run_all_tests():
    """Run all backend API tests"""
    print("Starting STARTON Backend API Tests...")
    print(f"Testing against: {API_URL}")
    print("="*60)
    
    # Test basic connectivity first
    if not test_api_connection():
        print("❌ API is not accessible. Stopping tests.")
        return results
    
    # Test valid submissions
    print("\n📝 Testing Valid Submissions...")
    test_valid_consultation_full()
    test_valid_consultation_no_company()
    
    # Test validation
    print("\n🔍 Testing Validation...")
    test_invalid_email()
    test_missing_required_fields()
    test_empty_strings()
    test_message_length_validation()
    test_name_length_validation()
    
    # Test special characters
    print("\n🌐 Testing Special Characters...")
    test_special_characters()
    
    # Test data retrieval
    print("\n📊 Testing Data Retrieval...")
    test_get_consultations()
    test_get_consultations_pagination()
    
    # Test data integrity
    print("\n🔒 Testing Data Integrity...")
    test_consultation_data_integrity()
    test_consultation_sorting()
    
    return results

if __name__ == "__main__":
    test_results = run_all_tests()
    test_results.summary()
    
    # Exit with error code if any tests failed
    if test_results.failed > 0:
        exit(1)
    else:
        print("\n🎉 All tests passed!")
        exit(0)