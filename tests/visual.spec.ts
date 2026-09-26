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

test("command palette open", async ({ page }) => {
  await page.goto("/components/command/")
  if ((page.viewportSize()?.width ?? 1440) < 768) {
    await page
      .getByRole("button", { name: "Toggle Sidebar", exact: true })
      .click()
    await expect(
      page.getByRole("dialog", { name: "Sidebar", exact: true })
    ).toBeVisible()
  }
  await page
    .getByRole("button", { name: /Search/ })
    .filter({ visible: true })
    .first()
    .click()
  const dialog = page.getByRole("dialog", { name: "Search", exact: true })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole("combobox")).toBeFocused()
  await argosScreenshot(page, "command-palette-open", { fullPage: false })
})
