import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 90000, // 90 segundos por test
  expect: {
      timeout: 30000, // 60 segundos para expect()
  },
  use: {
    actionTimeout: 30000,
    navigationTimeout: 30000,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'], // salida en consola
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // reporte HTML
  ],
  testDir: './tests',
});
