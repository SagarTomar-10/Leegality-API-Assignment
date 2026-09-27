import { test, expect } from '@playwright/test';

test('Verify authentication with valid credentials', async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data).toHaveProperty('token');
  expect(data.token).toBeTruthy();

  console.log('Authentication successful');
});

test('Verify booking update without authentication', async ({ request }) => {
  // Create a booking
  const bookingResponse = await request.post('/booking', {
    data: {
      firstname: 'Sagar',
      lastname: 'Tomar',
      totalprice: 2000,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-05',
        checkout: '2026-10-10'
      },
      additionalneeds: 'Lunch'
    }
  });

  expect(bookingResponse.status()).toBe(200);

  const bookingData = await bookingResponse.json();
  const bookingId = bookingData.bookingid;

  // Update without authentication

  const response = await request.patch(`/booking/${bookingId}`, {
    data: {
      additionalneeds: 'Dinner'
    }
  });

  console.log('Unauthenticated update status:', response.status());

  expect(response.status()).toBe(403);
});

 // Create a booking

test('Verify booking update with invalid token', async ({ request }) => {
  const bookingResponse = await request.post('/booking', {
    data: {
      firstname: 'Sagar',
      lastname: 'Tomar',
      totalprice: 2000,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-05',
        checkout: '2026-10-10'
      },
      additionalneeds: 'Lunch'
    }
  });

  expect(bookingResponse.status()).toBe(200);

  const bookingData = await bookingResponse.json();
  const bookingId = bookingData.bookingid;

  // Update with invalid token
  
  const response = await request.patch(`/booking/${bookingId}`, {
    headers: {
      Cookie: 'token=invalidtoken123'
    },
    data: {
      additionalneeds: 'Dinner'
    }
  });

  console.log('Invalid token status:', response.status());

  expect(response.status()).toBe(403);
});