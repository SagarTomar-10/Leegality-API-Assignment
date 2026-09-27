import { test, expect } from '@playwright/test';

test('Create a new booking', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      firstname: 'Sagar',
      lastname: 'Tomar',
      totalprice: 1500,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-05',
        checkout: '2026-10-10'
      },
      additionalneeds: 'Breakfast'
    }
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.bookingid).toBeDefined();
  expect(typeof responseBody.bookingid).toBe('number');

  expect(responseBody.booking.firstname).toBe('Sagar');
  expect(responseBody.booking.lastname).toBe('Tomar');
  expect(responseBody.booking.totalprice).toBe(1500);
});


   //Booking by ID

test('Get booking by ID', async ({ request }) => {
  // Create a booking
  const createResponse = await request.post('/booking', {
    data: {
      firstname: 'Sagar',
      lastname: 'Tomar',
      totalprice: 1500,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-05',
        checkout: '2026-10-10'
      },
      additionalneeds: 'Breakfast'
    }
  });

  expect(createResponse.status()).toBe(200);

  const createdBooking = await createResponse.json();
  const bookingId = createdBooking.bookingid;

  // Get booking by ID

  const response = await request.get(`/booking/${bookingId}`);

  expect(response.status()).toBe(200);

  const booking = await response.json();

  expect(booking.firstname).toBe('Sagar');
  expect(booking.lastname).toBe('Tomar');
  expect(booking.totalprice).toBe(1500);
});

//Update an existing booking

test('Update an existing booking', async ({ request }) => {
  // Create authentication token
  const authResponse = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  expect(authResponse.status()).toBe(200);

  const authData = await authResponse.json();
  const token = authData.token;

  // Create booking
  const createResponse = await request.post('/booking', {
    data: {
      firstname: 'Sagar',
      lastname: 'Tomar',
      totalprice: 1500,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-05',
        checkout: '2026-10-10'
      },
      additionalneeds: 'Breakfast'
    }
  });

  expect(createResponse.status()).toBe(200);

  const bookingData = await createResponse.json();
  const bookingId = bookingData.bookingid;

  // Update booking
  const updateResponse = await request.put(
    `/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        firstname: 'Sagar Updated',
        lastname: 'Tomar',
        totalprice: 2000,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-05',
          checkout: '2026-10-10'
        },
        additionalneeds: 'Lunch'
      }
    }
  );

  expect(updateResponse.status()).toBe(200);

  const updatedBooking = await updateResponse.json();

  expect(updatedBooking.firstname).toBe('Sagar Updated');
  expect(updatedBooking.totalprice).toBe(2000);
  expect(updatedBooking.additionalneeds).toBe('Lunch');
});