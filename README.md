# Leegality API Testing Assignment

## Project Overview

This project contains automated API tests developed using
Playwright and TypeScript.

The purpose is to validate booking API functionality,
authentication, input validation, and error handling.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- REST API
- Playwright HTML Reporter

## Test Strategy

The test suite covers positive and negative scenarios.

Positive tests verify that valid API requests work as expected.
Negative tests verify how the API handles invalid requests.

The tests validate HTTP status codes and response bodies.
Authentication tests verify access to protected operations.

## Test Coverage

### Booking API

- Create a booking
- Get booking by ID
- Get all bookings
- Update a booking using PUT
- Partially update a booking using PATCH
- Delete a booking
- Verify a deleted booking returns 404

### Authentication

- Verify authentication with valid credentials
- Verify update without authentication
- Verify update with an invalid token

### Negative Testing

- Create booking without firstname
- Create booking with an empty payload
- Create booking with checkout before check-in
- Create booking with malformed date

### Health Check

- Verify API health check

## Test Execution

Install dependencies:

    npm install

Run all tests:

    npx playwright test

Run a specific test file:

    npx playwright test tests/booking.spec.ts

Open the HTML report:

    npx playwright show-report


## Test Execution Summary

Total Tests: 18
Passed: 11
Failed: 7
Execution Time: 32.8 seconds

The failed tests identified API validation issues
related to missing fields, empty payloads, invalid
booking dates, and invalid price values.

These failures are documented in BUGS.md.

## Defects Identified

1. Missing firstname returns 500 instead of 400.
2. Empty payload returns 500 instead of 400.
3. The API accepts a booking where checkout is
   earlier than check-in.
4. The API accepts a malformed date and converts
   it to a different date.

Refer to BUGS.md for reproduction details.

## Scope and Exclusions

### Included

- Booking CRUD operations
- Authentication validation
- Negative and boundary testing
- HTTP status and response body validation
- HTML test reporting

### Excluded

- Load and stress testing
- Security penetration testing
- Extensive performance testing

These areas are outside the current assignment scope.

## Limitations

- Tests depend on API availability.
- The API may contain existing validation defects.
- Booking data is created during test execution.
- The shared test environment may contain data
  created by other users.
- Test results may vary if the shared environment
  changes during execution.

## Reporting

Playwright HTML reporting is configured to show
test execution results and failure details.

Run the following command to open the report:

    npx playwright show-report

## Project Structure

    tests/
      auth.spec.ts
      booking.spec.ts
      deleteBooking.spec.ts
      getAllBooking.spec.ts
      healthCheck.spec.ts
      negativeBooking.spec.ts
      patchBooking.spec.ts

    playwright.config.ts
    tsconfig.json
    package.json
    BUGS.md
    README.md
    .gitignore