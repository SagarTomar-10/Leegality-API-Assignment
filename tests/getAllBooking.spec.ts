import { test, expect } from '@playwright/test';

test('Get all bookings', async ({ request }) => {
  const response = await request.get('/booking');

  expect(response.status()).toBe(200);

  const bookings = await response.json();

  expect(Array.isArray(bookings)).toBe(true);

  for (const booking of bookings) {
    expect(booking).toHaveProperty('bookingid');
    expect(typeof booking.bookingid).toBe('number');
  }

  console.log('Total bookings:', bookings.length);
  console.log('Response:', bookings);
});