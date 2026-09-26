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
  await page.evaluate(() => {
    ;(window as Window & { navigationProbe?: boolean }).navigationProbe = true
  })
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Initialize again" }).click()
  const input = page.getByPlaceholder("Navigate by command")
  await input.fill("next")
  await input.press("ArrowDown")
  await input.press("Enter")
  await expect(page).toHaveURL(/\/next\/$/)
  expect(
    await page.evaluate(
      () => (window as Window & { navigationProbe?: boolean }).navigationProbe
    )
  ).toBe(true)
})

for (const activation of ["pointer", "keyboard"] as const) {
  test(`consumer: CommandItem target preserves native ${activation} navigation`, async ({
    page,
  }) => {
    const input = page.getByPlaceholder("Navigate by command")
    await input.fill("new tab")
    const popupPromise = page.waitForEvent("popup")
    if (activation === "pointer") {
      await page
        .getByRole("option", { name: "Open consumer in new tab" })
        .click()
    } else {
      await input.press("Enter")
    }
    const popup = await popupPromise
    await expect(popup).toHaveURL(/\/next\/$/)
    await expect(page).toHaveURL(/:4176\/$/)
    await popup.close()
  })
}

test("consumer: persisted lazy panels retain nested control state after swaps", async ({
  page,
}) => {
  const trigger = page.getByRole("button", { name: "Lazy nested controls" })
  await trigger.press("Enter")
  const input = page.getByPlaceholder("Nested framework")
  await input.fill("Vue")
  await input.press("ArrowDown")
  await input.press("Enter")
  await expect(input).toHaveValue("Vue")
  await trigger.press("Escape")
  await expect(
    page.locator('[data-slot="navigation-menu-content"]')
  ).toHaveCount(0)
  await page.getByRole("link", { name: "Navigate", exact: true }).click()
  await expect(page).toHaveURL(/\/next\/$/)
  await expect(page.locator("#page-location")).toHaveText("/next/")
  await trigger.press("Enter")
  await expect(input).toHaveValue("Vue")
  await input.fill("Astro")
  await input.press("ArrowDown")
  await input.press("Enter")
  await expect(input).toHaveValue("Astro")
})

test("consumer: persisted dialog portals retain nested state and modal behavior", async ({
  page,
}) => {
  const trigger = page.getByRole("button", {
    name: "Persisted dialog",
    exact: true,
  })
  await trigger.click()
  const dialog = page.getByRole("dialog", {
    name: "Persisted dialog",
    exact: true,
  })
  const preference = page.getByRole("switch", {
    name: "Preference in persisted portal",
  })
  await preference.click()
  const select = dialog.getByRole("combobox")
  await select.click()
  await page.getByRole("option", { name: "Second persistent option" }).click()
  await expect(select).toContainText("Second persistent option")
  await dialog
    .getByRole("link", { name: "Navigate with persisted dialog" })
    .click()
  await expect(page).toHaveURL(/\/next\/$/)
  await expect(page.locator("#page-location")).toHaveText("/next/")
  await expect(dialog).toBeHidden()
  await trigger.click()
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAttribute("data-stack-index", "0")
  await expect(preference).toBeChecked()
  await expect(select).toContainText("Second persistent option")
  await expect
    .poll(() => page.evaluate(() => document.documentElement.style.overflow))
    .toBe("hidden")
  await select.press("ArrowDown")
  await expect(
    page.getByRole("option", { name: "Second persistent option" })
  ).toHaveAttribute("aria-selected", "true")
  await page.keyboard.press("Escape")
  await expect(
    page.locator('[data-slot="select-content"]:visible')
  ).toHaveCount(0)
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.style.overflow))
    .toBe("")
  await trigger.click()
  await expect(dialog).toBeVisible()
  await expect(preference).toBeChecked()
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await page.getByRole("link", { name: "Navigate", exact: true }).click()
  await expect(page).toHaveURL(/:4176\/$/)
  await trigger.click()
  await expect(dialog).toBeVisible()
  await expect(preference).toBeChecked()
  await expect(select).toContainText("Second persistent option")
})

test("consumer: sibling modal portals remain clickable in either open order", async ({
  page,
}) => {
  for (const names of [
    ["Consumer dialog", "Persisted dialog"],
    ["Persisted dialog", "Consumer dialog"],
  ]) {
    for (const name of names) {
      await page
        .getByRole("button", { name, exact: true, includeHidden: true })
        .evaluate((trigger) => {
          trigger
            .closest('[data-slot="dialog"]')!
            .dispatchEvent(
              new CustomEvent("dialog:set", { detail: { open: true } })
            )
        })
    }
    const top = page.getByRole("dialog", { name: names[1], exact: true })
    await expect(top).toBeVisible()
    await top.getByRole("button", { name: "Close", exact: true }).click()
    await expect(top).toBeHidden()
    const remaining = page.getByRole("dialog", { name: names[0], exact: true })
    await remaining.getByRole("button", { name: "Close", exact: true }).click()
    await expect(remaining).toBeHidden()
  }
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
