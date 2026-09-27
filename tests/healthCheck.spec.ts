import { test, expect } from '@playwright/test';

test('Verify API health check', async ({ request }) => {
    const response = await request.get('/ping');

    expect(response.status()).toBe(201);
});