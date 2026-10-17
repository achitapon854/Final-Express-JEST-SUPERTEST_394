import { test, expect } from '@playwright/test';

test('ST-07: Missing Postal Code', async ({ page }) => {
  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);

  await page.locator('[data-test="checkout"]').click();

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  await page.locator('#first-name').fill('Nattapol');
  await page.locator('#last-name').fill('Wanchan');

  // ไม่กรอก Postal Code

  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Postal Code is required');

  await expect(page).toHaveURL(/checkout-step-one\.html/);
});