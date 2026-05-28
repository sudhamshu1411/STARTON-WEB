# STARTON Landing Page - API Contracts

## Overview
Backend implementation for STARTON agency landing page contact form functionality.

---

## Current Frontend State

### Mock Data (mock.js)
```javascript
// Mock form submission
mockSubmitConsultation(formData) {
  formData: {
    name: string,
    email: string,
    company: string (optional),
    message: string
  }
  Returns: { success: true, message: 'Consultation request received!' }
}
```

### Frontend Component (Home.jsx)
- Form location: Contact section (#contact)
- Form fields: name, email, company, message
- Validation: name, email, message are required
- Toast notifications on success/error

---

## Backend Implementation Plan

### 1. Database Schema

**Collection: consultations**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, validated),
  company: String (optional),
  message: String (required),
  createdAt: Date (auto-generated),
  status: String (default: 'new') // 'new', 'contacted', 'closed'
}
```

### 2. API Endpoints

#### POST /api/consultations
**Purpose**: Create new consultation request

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "message": "Looking for brand strategy services"
}
```

**Response Success (201)**:
```json
{
  "success": true,
  "message": "Consultation request received! We'll get back to you soon.",
  "data": {
    "id": "consultation_id",
    "createdAt": "2025-01-14T10:00:00Z"
  }
}
```

**Response Error (400)**:
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Invalid email format"
  }
}
```

**Response Error (500)**:
```json
{
  "success": false,
  "message": "Server error. Please try again later."
}
```

#### GET /api/consultations (Optional - for admin)
**Purpose**: Retrieve all consultation requests

**Response Success (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "consultation_id",
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Acme Corp",
      "message": "Looking for brand strategy services",
      "status": "new",
      "createdAt": "2025-01-14T10:00:00Z"
    }
  ],
  "count": 1
}
```

---

## Backend Files to Create/Modify

### 1. Models
**File**: `/app/backend/models/consultation.py`
- Consultation model with validation
- Email format validation
- Required field validation

### 2. Routes
**File**: `/app/backend/routes/consultations.py`
- POST /api/consultations endpoint
- GET /api/consultations endpoint (optional)
- Input validation
- Error handling

### 3. Server Integration
**File**: `/app/backend/server.py`
- Import consultation routes
- Register routes with FastAPI app

---

## Frontend Integration Plan

### Changes Required in Frontend

**File**: `/app/frontend/src/pages/Home.jsx`

**Remove**:
```javascript
import { mockSubmitConsultation } from '../mock';
const result = await mockSubmitConsultation(formData);
```

**Replace with**:
```javascript
import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const result = await axios.post(`${BACKEND_URL}/api/consultations`, formData);
```

**Update error handling**:
- Handle validation errors from backend
- Display specific field errors
- Handle network errors

---

## Validation Rules

### Backend Validation
1. **name**: 
   - Required
   - Min length: 2 characters
   - Max length: 100 characters
   
2. **email**:
   - Required
   - Valid email format
   - Max length: 255 characters
   
3. **company**:
   - Optional
   - Max length: 100 characters
   
4. **message**:
   - Required
   - Min length: 10 characters
   - Max length: 1000 characters

---

## Error Handling Strategy

### Backend
- Input validation errors → 400 Bad Request
- Database errors → 500 Internal Server Error
- Log all errors for debugging

### Frontend
- Display validation errors near form fields
- Show toast for success/general errors
- Disable submit button during submission
- Clear form on success

---

## Testing Checklist

### Backend Tests
- [ ] Valid submission creates database record
- [ ] Invalid email returns 400 error
- [ ] Missing required fields returns 400 error
- [ ] Database connection errors handled gracefully
- [ ] GET endpoint returns all consultations

### Frontend Tests
- [ ] Form submission with valid data succeeds
- [ ] Success toast appears on successful submission
- [ ] Form clears after successful submission
- [ ] Error toast appears on failure
- [ ] Validation errors display properly
- [ ] Submit button disables during submission

### Integration Tests
- [ ] End-to-end form submission works
- [ ] Data persists in MongoDB
- [ ] Theme toggle doesn't affect form functionality
- [ ] Form works on mobile, tablet, desktop

---

## Implementation Steps

1. ✅ Create contracts.md (this file)
2. ⏳ Create consultation model
3. ⏳ Create consultation routes
4. ⏳ Update server.py to include routes
5. ⏳ Test backend endpoints
6. ⏳ Update frontend to use real API
7. ⏳ Remove mock.js import
8. ⏳ Test full integration
9. ⏳ Run backend testing agent
10. ⏳ Final verification

---

## Notes
- Mock data in mock.js will be kept for reference but removed from Home.jsx
- Services, process, and clients data remain as static content (no backend needed)
- Focus on consultation form as primary backend feature
- Consider adding email notifications in future iteration
