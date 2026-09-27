import { test, expect } from '@playwright/test';

test('Create booking without firstname', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
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

  console.log('Missing firstname Status:', response.status());
  console.log('Response:', await response.text());

  expect(response.status()).toBe(400);
});

test('Create booking with empty payload', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {}
  });

  console.log('Empty payload Status:', response.status());
  console.log('Response:', await response.text());

  expect(response.status()).toBe(400);
});

test('Create booking with checkout before checkin', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      firstname: 'Sagar',
      lastname: 'Tomar',
      totalprice: 2000,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-10',
        checkout: '2026-10-05'
      },
      additionalneeds: 'Lunch'
    }
  });

  console.log('Invalid dates Status:', response.status());
  const body = await response.json().catch(() => null);
  console.log('Response:', body);

  if (body?.bookingid) {
    const authResponse = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    if (authResponse.ok()) {
      const authBody = await authResponse.json();
      await request.delete(`/booking/${body.bookingid}`, {
        headers: {
          Cookie: `token=${authBody.token}`
        }
      });
    }
  }

  expect(response.status()).toBe(400);
});

test('Create booking with malformed date', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      firstname: 'Sagar',
      lastname: 'Tomar',
      totalprice: 2000,
      depositpaid: true,
      bookingdates: {
        checkin: '05-10-2026',
        checkout: '10-10-2026'
      },
      additionalneeds: 'Lunch'
    }
  });

  console.log('Malformed date Status:', response.status());
  const body = await response.json().catch(() => null);
  console.log('Response:', body);

  if (body?.bookingid) {
    const authResponse = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    if (authResponse.ok()) {
      const authBody = await authResponse.json();
      await request.delete(`/booking/${body.bookingid}`, {
        headers: {
          Cookie: `token=${authBody.token}`
        }
      });
    }
  }

  expect(response.status()).toBe(400);
});