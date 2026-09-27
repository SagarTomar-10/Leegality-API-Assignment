import { test, expect } from '@playwright/test';

test('Delete an existing booking', async ({ request }) => {

  // new booking
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

  //  Get authentication token
  const authResponse = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  expect(authResponse.status()).toBe(200);

  const authData = await authResponse.json();
  const token = authData.token;
    console.log('Auth Response:', authData);
    console.log('Auth Status:', authResponse.status());
    console.log('Token Received:', !!token);

  //  Delete the booking
  const deleteResponse = await request.delete(
    `/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${token}`
      }
    }
  );
  console.log('Delete status:', deleteResponse.status());
  console.log('Delete response:', await deleteResponse.text());

  expect(deleteResponse.status()).toBe(201);

  // Verify booking is deleted
  const getResponse = await request.get(`/booking/${bookingId}`);

  expect(getResponse.status()).toBe(404);

  console.log(`Booking ${bookingId} deleted successfully`);
});