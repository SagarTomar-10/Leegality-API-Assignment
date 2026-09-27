import { test, expect } from '@playwright/test';

test('Partially update an existing booking', async ({ request }) => {
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

  // Get authentication token
  const authResponse = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  expect(authResponse.status()).toBe(200);

  const authData = await authResponse.json();
  const token = authData.token;

  expect(token).toBeTruthy();

  // Partially update the booking
  const patchResponse = await request.patch(
    `/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        additionalneeds: 'Dinner'
      }
    }
  );

  console.log('PATCH Status:', patchResponse.status());
  console.log('PATCH Response:', await patchResponse.text());

  expect(patchResponse.status()).toBe(200);

  const updatedBooking = await patchResponse.json();

  expect(updatedBooking.firstname).toBe('Sagar');
  expect(updatedBooking.lastname).toBe('Tomar');
  expect(updatedBooking.additionalneeds).toBe('Dinner');
  expect(updatedBooking.totalprice).toBe(2000);
});