# API Documentation

## Users

### GET /api/users
Returns all users.
Status Codes: 200, 500

### GET /api/users/:id
Returns a user by ID.
Status Codes: 200, 404, 500

### POST /api/users
Creates a new user.

Example Request:
{
  "name": "Pratyush Baral",
  "email": "pratyushbaral@email.com",
  "password": "123456",
  "role": "student"
}

Example Response:
{
  "message": "User created",
  "user_id": 1
}

Status Codes: 201, 400, 500

### DELETE /api/users/:id
Deletes a user.
Status Codes: 200, 404, 500

---

## Appointments

### GET /api/appointments
Returns all appointments.

### POST /api/appointments
Creates an appointment.

Example Request:
{
  "student_id": 1,
  "counselor_id": 2,
  "appointment_date": "2026-03-01",
  "appointment_time": "10:00:00",
  "status": "Scheduled"
}

Status Codes: 201, 400, 500

## Authentication

This API uses JWT authentication.

Users log in using email and password and receive a token.

Authorization header:
Bearer <token>

Logout is handled client-side by deleting the token.

## Protected Routes

GET /api/users → requires authentication  
GET /api/users/:id → requires authentication  
POST /api/appointments → requires authentication  
DELETE /api/appointments/:id → requires authentication  
DELETE /api/users/:id → requires authentication  
