# API Bug Report

**Project:** Leegality API Testing Assignment  
**API:** Restful Booker API  
**Tool:** Playwright  
**Language:** TypeScript  
**Total Bugs:** 7  

---

## Bug 1: API Returns 500 When Firstname Is Missing

**Severity:** High  
**Status:** Observed  
**Endpoint:** POST /booking  
**Test Case:** Create booking without firstname  
**Test File:** `tests/negativeBooking.spec.ts`

**Description:**  
The API returns a 500 Internal Server Error when the required firstname field is missing.

**Request Body:**
```json
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
```

**Expected Result:**  
The API should return 400 Bad Request with a validation message.

**Actual Result:**  
HTTP 500 Internal Server Error.

**Impact:**  
Invalid input causes a server error instead of a proper validation response.

---

## Bug 2: API Returns 500 for an Empty Booking Payload

**Severity:** High  
**Status:** Observed  
**Endpoint:** POST /booking  
**Test Case:** Create booking with empty payload  
**Test File:** `tests/negativeBooking.spec.ts`

**Description:**  
The API returns a 500 Internal Server Error when an empty JSON object is submitted.

**Request Body:**
```json
{}
```

**Expected Result:**  
The API should return 400 Bad Request with a validation message.

**Actual Result:**  
HTTP 500 Internal Server Error.

**Impact:**  
The API does not handle an empty request with a proper validation response.

---

## Bug 3: API Accepts Booking with Checkout Before Checkin

**Severity:** Medium  
**Status:** Observed  
**Endpoint:** POST /booking  
**Test Case:** Create booking with checkout before checkin  
**Test File:** `tests/negativeBooking.spec.ts`

**Description:**  
The API accepts a booking request where the checkout date is earlier than the checkin date.

**Request Body:**
```json
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
```

**Expected Result:**  
The API should return 400 Bad Request because the date range is invalid.

**Actual Result:**  
HTTP 200 OK. The API created a booking with the invalid date range.

**Impact:**  
Invalid booking dates are accepted by the API.

---

## Bug 4: API Accepts Malformed Booking Date

**Severity:** Medium  
**Status:** Observed  
**Endpoint:** POST /booking  
**Test Case:** Create booking with malformed date  
**Test File:** `tests/negativeBooking.spec.ts`

**Description:**  
The API accepts a malformed check-in date instead of rejecting it.

**Request Body:**
```json
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
```

**Expected Result:**  
The API should return 400 Bad Request for the malformed date.

**Actual Result:**  
HTTP 200 OK. The API created a booking and converted the check-in date to `2026-05-10`.

**Impact:**  
The API accepts an unexpected date format instead of rejecting it.

---

## Bug 5: API Accepts Negative Booking Price

**Severity:** High  
**Status:** Observed  
**Endpoint:** POST /booking  
**Test Case:** Create booking with negative price  
**Test File:** `tests/boundaryBooking.spec.ts`

**Description:**  
The API accepts a booking request with a negative total price.

**Request Body:**
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
```

**Expected Result:**  
The API should return 400 Bad Request if negative prices are not allowed.

**Actual Result:**  
HTTP 200 OK. The API accepted the booking.

**Impact:**  
The API accepts a negative booking price, which may result in invalid booking data.

---

## Bug 6: API Accepts Zero Booking Price

**Severity:** Medium  
**Status:** Observed  
**Endpoint:** POST /booking  
**Test Case:** Create booking with zero price  
**Test File:** `tests/boundaryBooking.spec.ts`

**Description:**  
The API accepts a booking request with a total price of zero.

**Request Body:**
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
```

**Expected Result:**  
If zero-price bookings are not allowed, the API should return 400 Bad Request.

**Actual Result:**  
HTTP 200 OK. The API accepted the booking.

**Impact:**  
The API accepts a zero price. Whether this is invalid depends on the business requirements.

---

## Bug 7: API Accepts Invalid Price Data Type

**Severity:** Medium  
**Status:** Observed  
**Endpoint:** POST /booking  
**Test Case:** Create booking with wrong price data type  
**Test File:** `tests/boundaryBooking.spec.ts`

**Description:**  
The API accepts a string value instead of a numeric total price.

**Request Body:**
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
```

**Expected Result:**  
The API should return 400 Bad Request for an invalid price data type.

**Actual Result:**  
HTTP 200 OK. The API accepted the booking.

**Impact:**  
The API accepts an unexpected data type, which may cause inconsistent booking data.

---

# Test Execution Summary

| Metric | Result |
|---|---:|
| Total Tests | 18 |
| Passed | 11 |
| Failed | 7 |
| Bugs Documented | 7 |

**Note:** The seven failed tests indicate differences between expected and observed API behavior. The expected validation rules, particularly for zero price and date formats, should be confirmed against the API requirements.