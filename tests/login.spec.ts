/* import { test, expect } from '@playwright/test';

test('Login with Kinde Auth', async ({ page }) => {
  // 1️⃣ Ir a la app
  await page.goto(process.env.BASE_URL!);

  console.log('URL actual:', page.url());
  // 2️⃣ Hacer click en el botón de login del header
  await page.click('text=Sign In'); // ajusta el selector según tu header

  console.log('URL actual:', page.url());
  // 3️⃣ Esperar que la URL cambie a Kinde Auth
  await page.waitForURL(/kinde\.com/);

  console.log('URL actual:', page.url());
  // 4️⃣ Rellenar email y password en Kinde
  await page.fill('#sign_up_sign_in_credentials_p_email', process.env.TEST_USER_EMAIL!);
  //await page.fill('input[name="p_email"]', process.env.TEST_USER_EMAIL!);
  console.log('URL actual:', page.url());
  await page.click('text=Continue');
  console.log('URL actual:', page.url());
  await page.waitForURL(/kinde\.com/);
  // Esperar a que aparezca password o Google
  if (await page.locator('#verify_password_p_password').isVisible()) {
    // Flujo de password
    await page.fill('#verify_password_p_password', process.env.TEST_USER_PASSWORD!);
    await page.click('button[type="submit"]');
  } else if (page.url().includes('accounts.google.com')) {
    throw new Error('La cuenta está vinculada a Google. Usa una cuenta de prueba con password.');
  }

  // 5️⃣ Hacer click en submit en Kinde
  await page.click('button[type="submit"]');

  // 6️⃣ Esperar redirección de vuelta a la app
  await page.waitForURL(`${process.env.BASE_URL}/*`);

  // 7️⃣ Comprobar que el login fue exitoso
  await expect(page.locator('text=Dashboard')).toBeVisible();
});
 */

import { test, expect } from '@playwright/test';

test('Login with Kinde Auth', async ({ page }) => {
  // 1️⃣ Ir a la app
  await page.goto(process.env.BASE_URL!);

  // 2️⃣ Click en Sign In
  await page.click('text=Sign In');

  // 3️⃣ Esperar que cargue Kinde (pantalla de email)
  await page.waitForURL(/kinde\.com/);

  // 4️⃣ Llenar email
  await page.fill('#sign_up_sign_in_credentials_p_email', process.env.TEST_USER_EMAIL!);

  // 5️⃣ Click en Continue y esperar cambio de página
  
  
  //await  page.click('button[type="submit"]:has-text("Continue")'),
  await page.click('button[data-kinde-button="true"][data-kinde-button-variant="primary"]');

  await  page.waitForURL(/kinde\.com/); // espera que la URL tenga verify_password (o algo único del paso de contraseña)

  await page.screenshot({ 
    path: `screenshots/email_step_${Date.now()}.png`, 
    fullPage: true 
  });
    
  // 6️⃣ Llenar contraseña
  await page.fill('#verify_password_p_password', process.env.TEST_USER_PASSWORD!);

  // 7️⃣ Click en Continue (segunda pantalla) y esperar redirección a tu app
  await  page.waitForURL(/kinde\.com/);
  await  page.click('button[type="submit"]:has-text("Continue")');
  

  // 8️⃣ Verificar login
  await expect(page.locator('text=Dashboard')).toBeVisible();
  await page.screenshot({ 
    path: `screenshots/email_step_${Date.now()}.png`, 
    fullPage: true 
  });
});
