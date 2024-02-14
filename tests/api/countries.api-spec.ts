import test, { expect } from "@playwright/test";

test('should retrieve countries', async ({ request }) => {
    const response = await request.get('/v3.1/all');

    expect(response.status()).toBe(200);
});
