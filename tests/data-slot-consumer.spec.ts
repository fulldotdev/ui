import { expect, test } from "@playwright/test"

test.use({ baseURL: "http://127.0.0.1:4176" })

test.beforeEach(async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error
  })
  await page.goto("/")
  await expect(
    page.getByRole("button", { name: "Consumer dialog", exact: true })
  ).toHaveAttribute("aria-expanded", "false")
})

test("consumer: live Astro swaps release modal stack and scroll lock", async ({
  page,
}) => {
  // Survives client navigation, but would be lost on a full page load.
  await page.evaluate(() => {
    ;(window as Window & { navigationProbe?: boolean }).navigationProbe = true
  })
  for (let i = 0; i < 3; i++) {
    await page.getByRole("button", { name: "Initialize again" }).click()
    const trigger = page.getByRole("button", {
      name: "Consumer dialog",
      exact: true,
    })
    await trigger.click()
    const content = page.getByRole("dialog", {
      name: "Consumer dialog",
      exact: true,
    })
    await expect(content).toHaveAttribute("data-stack-index", "0")
    await expect
      .poll(() => page.evaluate(() => document.documentElement.style.overflow))
      .toBe("hidden")
    await content.getByRole("link", { name: "Navigate while open" }).click()
    await expect(page).toHaveURL(i % 2 === 0 ? /\/next\/$/ : /:4176\/$/)
    await expect(content).toBeHidden()
    await expect
      .poll(() => page.evaluate(() => document.documentElement.style.overflow))
      .toBe("")
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (window as Window & { navigationProbe?: boolean }).navigationProbe
        )
      )
      .toBe(true)
  }
})

test("consumer: nested Select Escape leaves its parent dialog open", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Consumer dialog", exact: true })
    .press("Enter")
  const dialog = page.getByRole("dialog", {
    name: "Consumer dialog",
    exact: true,
  })
  await expect(
    dialog.getByRole("button", { name: "Close", exact: true })
  ).toBeFocused()
  await dialog.getByRole("combobox").press("ArrowDown")
  await expect(
    page.getByRole("option", { name: "One", exact: true })
  ).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(
    page.locator('[data-slot="select-content"]:visible')
  ).toHaveCount(0)
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole("combobox")).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
})

test("consumer: CommandItem href navigates from the keyboard", async ({
  page,
}) => {
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Initialize again" }).click()
  const input = page.getByPlaceholder("Navigate by command")
  await input.fill("next")
  await input.press("ArrowDown")
  await input.press("Enter")
  await expect(page).toHaveURL(/\/next\/$/)
})

test("consumer: lazy retained roots initialize nested Combobox and Hover Card", async ({
  page,
  browserName,
}) => {
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Initialize again" }).click()
  await expect(
    page.locator('[data-slot="navigation-menu-content"]')
  ).toHaveCount(0)
  await page
    .getByRole("button", { name: "Lazy nested controls" })
    .press("Enter")
  const input = page.getByPlaceholder("Nested framework")
  await input.fill("Astro")
  await input.press("ArrowDown")
  await input.press("Enter")
  await expect(input).toHaveValue("Astro")
  // The combobox toggle is excluded from the tab order.
  const tab = browserName === "webkit" ? "Alt+Tab" : "Tab"
  await page.keyboard.press(tab)
  await expect(
    page.getByRole("button", { name: "Nested preview" })
  ).toBeFocused()
  await expect(
    page.getByText("Retained hover card", { exact: true })
  ).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(
    page.getByText("Retained hover card", { exact: true })
  ).toHaveCount(0)
  await expect(
    page.locator('[data-slot="navigation-menu-content"]')
  ).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(
    page.locator('[data-slot="navigation-menu-content"]')
  ).toHaveCount(0)
})

test("consumer: native required validation, submit, reset and persistent control", async ({
  page,
}) => {
  const form = page.locator("#choices")
  await form.getByRole("button", { name: "Submit choices" }).click()
  await expect(form.getByRole("combobox")).toBeFocused()
  await expect(page.locator("#result")).toBeEmpty()
  await form.getByRole("combobox").press("ArrowDown")
  await page.getByRole("option", { name: "Banana", exact: true }).click()
  await expect(form.getByRole("combobox")).toContainText("Banana")
  await form.getByRole("button", { name: "Submit choices" }).click()
  await expect(page.locator("#result")).toContainText('"fruit":"banana"')
  await form.getByRole("button", { name: "Reset choices" }).click()
  await expect(form.getByRole("combobox")).toContainText("Required fruit")
  await expect(form.getByRole("switch", { name: "Updates" })).toBeChecked()
  await page.getByRole("switch", { name: "Persisted preference" }).click()
  await page.getByRole("link", { name: "Navigate", exact: true }).click()
  await expect(page).toHaveURL(/\/next\/$/)
  await expect(
    page.getByRole("switch", { name: "Persisted preference" })
  ).toBeChecked()
  await page
    .getByRole("switch", { name: "Persisted preference" })
    .press("Space")
  await expect(
    page.getByRole("switch", { name: "Persisted preference" })
  ).not.toBeChecked()
})

test("consumer: lazy Tooltip and controlled Hover Card keep their mounting contracts", async ({
  page,
  browserName,
}) => {
  const tooltip = page.getByRole("button", {
    name: "Lazy tooltip",
    exact: true,
  })
  const message = page.getByText("Retained tooltip", { exact: true })
  await expect(message).toHaveCount(0)
  await tooltip.focus()
  await expect(message).toBeVisible()
  await page.evaluate(() =>
    document.dispatchEvent(new Event("astro:page-load"))
  )
  await page.keyboard.press("Escape")
  await expect(message).toHaveCount(0)
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab")
  await expect(
    page.getByRole("button", { name: "Controlled preview" })
  ).toBeFocused()
  await expect(
    page.getByText("Controlled content", { exact: true })
  ).toBeHidden()
})
