
import { test, expect } from '@playwright/test';

test('ST-05: Sort Product ราคา Low to High', async ({ page }) => {
  // Login
  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  // Select Price Low to High
  await page.locator('.product_sort_container').selectOption('lohi');

  // Get prices
  const prices = await page.locator('.inventory_item_price').allTextContents();

  // Convert price to number
  const priceNumbers = prices.map((price) =>
    Number(price.replace('$', ''))
  );

  // Verify prices are ascending
  const sortedPrices = [...priceNumbers].sort((a, b) => a - b);

  expect(priceNumbers).toEqual(sortedPrices);
});
