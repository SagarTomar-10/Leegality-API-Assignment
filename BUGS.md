# Bug Report


// Create booking without firstname
## Bug 1: API Returns 500 When Firstname Is Missing

**Severity:** High  
**Status:** Observed

### Description
The API returns a 500 Internal Server Error when a booking
is created without the required firstname field.

### Endpoint
POST /booking

### Request Body
{
  "lastname": "Tomar",
  "totalprice": 2000,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-10-05",
    "checkout": "2026-10-10"
  },
  "additionalneeds": "Lunch"
}

### Expected Result
The API should reject the request with a 400 Bad Request
response because the required firstname field is missing.

### Actual Result
Status Code: 500 Internal Server Error

Response:
Internal Server Error

### Impact
Invalid input causes a server error instead of a
proper validation response.

### Test Case


// Create booking with empty payload
## Bug 2: API Returns 500 for an Empty Booking Payload

**Severity:** High  
**Status:** Observed

### Description
The API returns a 500 Internal Server Error when an empty
JSON object is submitted to create a booking.

### Endpoint
POST /booking

### Request Body
{}

### Expected Result
The API should reject the empty payload with a
400 Bad Request response.

### Actual Result
Status Code: 500 Internal Server Error

Response:
Internal Server Error

### Impact
The API does not return a proper validation response
for an empty request body.

### Test Case


// Create booking with checkout before checkin
## Bug 3: API Accepts Booking with Checkout Before Checkin

**Severity:** Medium  
**Status:** Observed

### Description
The API accepts a booking request in which the checkout
date is earlier than the checkin date.

### Endpoint
POST /booking

### Request Body
{
  "firstname": "Sagar",
  "lastname": "Tomar",
  "totalprice": 2000,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-10-10",
    "checkout": "2026-10-05"
  },
  "additionalneeds": "Lunch"
}

### Expected Result
The API should reject the request because the checkout
date is earlier than the checkin date.

### Actual Result
Status Code: 200 OK

The API created a booking with the invalid date range.

### Impact
Invalid booking dates are accepted by the API.

### Test Case


// Create booking with malformed date

## Bug 4: API Accepts Malformed Booking Date

**Severity:** Medium

**Status:** Observed

### Description

The API accepts a booking request with a malformed check-in
date instead of rejecting it with a validation error.

### Endpoint

POST /booking

### Request Body

{
  "firstname": "Sagar",
  "lastname": "Tomar",
  "totalprice": 2000,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "05-10-2026",
    "checkout": "10-10-2026"
  },
  "additionalneeds": "Lunch"
}

### Expected Result

The API should reject the malformed date with a
400 Bad Request response.

### Actual Result

Status Code: 200 OK

The API created a booking and converted the check-in
date from "05-10-2026" to "2026-05-10".

### Impact

The API accepts a date in an unexpected format and
creates a booking instead of rejecting the invalid input.

### Test Case

---

## Bug 5: API Accepts Negative Booking Price

**Severity:** High  
**Status:** Observed

### Description
The API accepts a booking request with a negative total price instead of rejecting it with a validation error.

### Endpoint
POST /booking

### Request Body
```json
{
  "firstname": "Sagar",
  "lastname": "Tomar",
  "totalprice": -100,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-10-05",
    "checkout": "2026-10-10"
  },
  "additionalneeds": "Lunch"
}


---

## Bug 6: API Accepts Zero Booking Price

**Severity:** Medium  
**Status:** Observed

### Description
The API accepts a booking request with a total price of zero instead of rejecting it.

### Endpoint
POST /booking

### Request Body
```json
{
  "firstname": "Sagar",
  "lastname": "Tomar",
  "totalprice": 0,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-10-05",
    "checkout": "2026-10-10"
  },
  "additionalneeds": "Lunch"
}

---

## Bug 7: API Accepts Invalid Price Data Type

**Severity:** Medium  
**Status:** Observed

### Description
The API accepts a booking request with a string value instead of a numeric total price.

### Endpoint
POST /booking

### Request Body
```json
{
  "firstname": "Sagar",
  "lastname": "Tomar",
  "totalprice": "invalid",
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-10-05",
    "checkout": "2026-10-10"
  },
  "additionalneeds": "Lunch"
}