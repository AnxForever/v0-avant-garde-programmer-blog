import { test, expect } from "@playwright/test"

test.describe("Contact Form", () => {
  test("should submit contact form successfully", async ({ page }) => {
    await page.goto("/contact")

    // Fill out form
    await page.fill('input[name="name"]', "Test User")
    await page.fill('input[name="email"]', "test@example.com")
    await page.fill('textarea[name="message"]', "This is an automated test message.")

    // Submit
    await page.click('button[type="submit"]')

    // Check for loading state
    await expect(page.locator("text=TRANSMITTING...")).toBeVisible()

    // Check for success state
    await expect(page.locator("text=SIGNAL RECEIVED")).toBeVisible()
  })

  test("should validate required fields", async ({ page }) => {
    await page.goto("/contact")

    // Try to submit empty form
    await page.click('button[type="submit"]')

    // Check for HTML5 validation or custom error messages
    // Note: Since we use standard required attributes, browser validation triggers.
    // We can check if the input is invalid.
    const nameInput = page.locator('input[name="name"]')
    const emailInput = page.locator('input[name="email"]')

    // In Playwright, we can check validity
    const isNameValid = await nameInput.evaluate((e: HTMLInputElement) => e.checkValidity())
    expect(isNameValid).toBe(false)
  })
})
