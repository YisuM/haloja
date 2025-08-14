import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
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
