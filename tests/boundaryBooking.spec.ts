import { test, expect } from '@playwright/test';

test.describe('Booking boundary tests', () => {
  test('Create booking with negative price', async ({ request }) => {
    const response = await request.post('/booking', {
      data: {
        firstname: 'Test',
        lastname: 'User',
        totalprice: -100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-05',
          checkout: '2026-10-10',
        },
        additionalneeds: 'Breakfast',
      },
    });

    const body = await response.json();

    try {
      expect(response.status()).toBe(400);
    } finally {
      if (body.bookingid) {
        const auth = await request.post('/auth', {
          data: { username: 'admin', password: 'password123' },
        });
        const { token } = await auth.json();

        await request.delete(`/booking/${body.bookingid}`, {
          headers: { Cookie: `token=${token}` },
        });
      }
    }
  });

  test('Create booking with zero price', async ({ request }) => {
    const response = await request.post('/booking', {
      data: {
        firstname: 'Test',
        lastname: 'User',
        totalprice: 0,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-05',
          checkout: '2026-10-10',
        },
        additionalneeds: 'Breakfast',
      },
    });

    const body = await response.json();

    try {
      expect(response.status()).toBe(400);
    } finally {
      if (body.bookingid) {
        const auth = await request.post('/auth', {
          data: { username: 'admin', password: 'password123' },
        });
        const { token } = await auth.json();

        await request.delete(`/booking/${body.bookingid}`, {
          headers: { Cookie: `token=${token}` },
        });
      }
    }
  });
test('Create booking with wrong price data type', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      firstname: 'Test',
      lastname: 'User',
      totalprice: 'invalid',
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-05',
        checkout: '2026-10-10',
      },
      additionalneeds: 'Breakfast',
    },
  });

  const body = await response.json().catch(() => ({}));

  try {
    expect(response.status()).toBe(400);
  } finally {
    if (response.status() === 200 && body.bookingid) {
      const auth = await request.post('/auth', {
        data: {
          username: 'admin',
          password: 'password123',
        },
      });

      const { token } = await auth.json();

      await request.delete(`/booking/${body.bookingid}`, {
        headers: {
          Cookie: `token=${token}`,
        },
      });
    }
  }
});

  test('Get booking with nonexistent ID', async ({ request }) => {
    const response = await request.get('/booking/999999999');

    expect(response.status()).toBe(404);
  });
});