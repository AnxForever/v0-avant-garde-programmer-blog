import { test, expect } from "@playwright/test"

test.describe("Navigation Flow", () => {
  test("should navigate to all main pages", async ({ page }) => {
    await page.goto("/")

    // Check Home
    await expect(page).toHaveTitle(/Avant-Garde/i)

    // Navigate to Work
    await page.click("text=作品") // Work
    await expect(page).toHaveURL(/.*\/work/)
    await expect(page.locator("h1")).toContainText("SELECTED WORKS")

    // Navigate to About
    await page.click("text=关于") // About
    await expect(page).toHaveURL(/.*\/about/)

    // Navigate to Blog
    await page.click("text=博客") // Blog
    await expect(page).toHaveURL(/.*\/blog/)

    // Navigate to Lab
    await page.click("text=实验室") // Lab
    await expect(page).toHaveURL(/.*\/lab/)

    // Navigate to Contact
    await page.click("text=联系") // Contact
    await expect(page).toHaveURL(/.*\/contact/)
  })

  test("should open and use command palette", async ({ page }) => {
    await page.goto("/")

    // Press Cmd+K (or Ctrl+K)
    await page.keyboard.press("Meta+K")

    // Check if palette is visible
    const palette = page.locator("[cmdk-dialog]")
    await expect(palette).toBeVisible()

    // Search for "Lab"
    await page.keyboard.type("Lab")

    // Select first result
    await page.keyboard.press("Enter")

    // Should navigate to Lab
    await expect(page).toHaveURL(/.*\/lab/)
  })
})
