import { argosScreenshot } from "@argos-ci/playwright"
import { expect, test } from "@playwright/test"

const pages = [
  "/",
  "/docs/installation",
  "/components/button",
  "/components/card",
  "/components/input",
  "/components/dialog",
  "/components/tabs",
  "/components/accordion",
  "/components/table",
  "/components/select",
]

for (const path of pages) {
  test(path, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await argosScreenshot(page, path === "/" ? "home" : path.slice(1))
  })
}
