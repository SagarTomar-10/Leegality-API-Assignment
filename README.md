# Leegality API Testing Assignment

## Project Overview

This project contains automated API tests developed using Playwright and TypeScript.

The purpose is to validate booking API functionality, authentication, input validation, and error handling.

The test suite covers positive, negative, and boundary test scenarios to identify API defects and verify expected behavior.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- REST API
- Playwright HTML Reporter

## Test Strategy

The test suite follows a combination of positive, negative, and boundary testing.

- Positive testing verifies that valid API requests work as expected.
- Negative testing checks how the API handles invalid requests.
- Boundary testing validates edge cases such as negative and zero prices.
- Authentication testing verifies access to protected operations.
- Response validation checks HTTP status codes and response bodies.

Tests use dynamically created booking IDs where applicable to avoid relying on fixed IDs.

## Test Coverage

### 1. Booking API

- Create a booking
- Get booking by ID
- Get all bookings
- Update a booking using PUT
- Partially update a booking using PATCH
- Delete a booking
- Verify a deleted booking returns 404

### 2. Authentication

- Verify authentication with valid credentials
- Verify booking update without authentication
- Verify booking update with an invalid token

### 3. Negative Testing

- Create booking without firstname
- Create booking with an empty payload
- Create booking with checkout before check-in
- Create booking with malformed date

### 4. Boundary Testing

- Create booking with negative price
- Create booking with zero price
- Create booking with invalid price data type
- Get booking with a nonexistent ID

### 5. Health Check

- Verify API health check

## Test Execution

### Prerequisites

- Node.js
- npm
- Git

### Install Dependencies

```bash
npm install
```

### Run All Tests

```bash
npx playwright test
```

### Run a Specific Test File

```bash
npx playwright test tests/booking.spec.ts
```

### Open the HTML Report

```bash
npx playwright show-report
```

## Test Execution Summary

**Latest Test Execution**

| Metric | Result |
|---|---:|
| Total Tests | 18 |
| Passed | 11 |
| Failed | 7 |
| Execution Time | 32.8 seconds |

The failed tests identified API validation issues related to missing fields, empty payloads, invalid booking dates, and invalid price values.

These failures represent observed differences between the expected and actual API behavior. The corresponding defects are documented in `BUGS.md`.

## Defects Identified

The test execution identified the following seven API validation issues:

1. Missing firstname returns 500 instead of 400.
2. Empty payload returns 500 instead of 400.
3. The API accepts a booking where checkout is earlier than check-in.
4. The API accepts a malformed date and converts it to a different date.
5. The API accepts a negative booking price.
6. The API accepts a zero booking price.
7. The API accepts an invalid price data type.

Refer to `BUGS.md` for detailed descriptions, expected and actual results, severity, and reproduction information.

## Scope and Exclusions

### Included

- Booking CRUD operations
- Authentication validation
- Negative testing
- Boundary testing
- HTTP status code validation
- Response body validation
- API health check
- HTML test reporting

### Excluded

- Load and stress testing
- Security penetration testing
- Extensive performance testing

These areas are outside the scope of the current assignment.

## Limitations

- Tests depend on API availability.
- The API may contain existing validation defects.
- Booking data is created during test execution.
- The shared test environment may contain data created by other users.
- Test results may vary if the shared environment changes during execution.
- The current test suite focuses on functional API validation rather than extensive performance or security testing.

## Reporting

Playwright HTML reporting is configured to provide test execution results and failure details.

To generate the report, run:

```bash
npx playwright test
```

To open the report, run:

```bash
npx playwright show-report
```

The generated HTML report is available in the `playwright-report` directory.

A ZIP copy of the report can be shared separately as `playwright-report.zip`.

## Project Structure

```text
Leegality-API-Assignment/
│
├── tests/
│   ├── auth.spec.ts
│   ├── booking.spec.ts
│   ├── boundaryBooking.spec.ts
│   ├── deleteBooking.spec.ts
│   ├── getAllBooking.spec.ts
│   ├── healthCheck.spec.ts
│   ├── negativeBooking.spec.ts
│   └── patchBooking.spec.ts
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── BUGS.md
├── README.md
├── .gitignore
└── playwright-report.zip
```

## Conclusion

This project demonstrates API testing using Playwright and TypeScript, including CRUD operations, authentication, negative scenarios, boundary testing, and HTML reporting.

The test suite also documents observed API validation issues to support further investigation and debugging.