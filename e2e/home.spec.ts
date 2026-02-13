
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Portfolio/i);
});

test('hero section is visible', async ({ page }) => {
    await page.goto('/');

    // Expect the main heading to be visible
    await expect(page.getByRole('heading', { name: /Building digital/i })).toBeVisible();

    // Check if "Contact Me" button is visible
    await expect(page.getByRole('button', { name: /Contact Me/i })).toBeVisible();
});
