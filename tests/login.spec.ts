import { test, expect } from '@playwright/test';

test('Login with generic user', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  await page.fill('input[name="email"]', process.env.TEST_USER_EMAIL!);
  await page.fill('input[name="password"]', process.env.TEST_USER_PASSWORD!);
  await page.click('button[type="submit"]');

  await expect(page.locator('text=Dashboard')).toBeVisible();
});
