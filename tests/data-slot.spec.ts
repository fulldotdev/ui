import { expect, test, type Page } from "@playwright/test"

const demo = (page: Page) => page.locator(".live-code-layout").first()

async function open(page: Page, name: string) {
  await page.goto(`/components/${name}/`)
  await expect(
    demo(page).getByRole("tab", { name: "Preview", exact: true })
  ).toHaveAttribute("aria-selected", "true")
  // Astro fires this after client navigation. Repeated initialization must not
  // double-bind controls or lose content that has been moved into a portal.
  await page.evaluate(() => {
    for (let i = 0; i < 3; i++)
      document.dispatchEvent(new Event("astro:page-load"))
  })
}

test.beforeEach(async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error
  })
})

for (const [name, slot] of [
  ["dialog", "dialog"],
  ["sheet", "dialog"],
  ["popover", "popover"],
]) {
  test(`${name}: pointer, keyboard, Escape, outside dismissal and repeated opening`, async ({
    page,
    isMobile,
  }) => {
    await open(page, name)
    const trigger = demo(page).locator(`[data-slot="${slot}-trigger"]`)
    const content = page.locator(`[data-slot="${slot}-content"]:visible`)
    for (let i = 0; i < 3; i++) {
      if (isMobile) await trigger.tap()
      else await trigger.click()
      await expect(content).toBeVisible()
      await page.keyboard.press("Escape")
      await expect(content).toHaveCount(0)
    }
    await trigger.press("Enter")
    await expect(content).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(content).toHaveCount(0)
    await expect(trigger).toBeFocused()
    await trigger.press("Enter")
    await expect(content).toBeVisible()
    if (slot === "dialog") {
      await page.keyboard.press("Shift+Tab")
      await expect
        .poll(() =>
          content.evaluate((el) => el.contains(document.activeElement))
        )
        .toBe(true)
      await page.keyboard.press("Tab")
      await expect
        .poll(() =>
          content.evaluate((el) => el.contains(document.activeElement))
        )
        .toBe(true)
    }
    if (isMobile) await page.touchscreen.tap(2, 2)
    else await page.mouse.click(2, 2)
    await expect(content).toHaveCount(0)
    await expect
      .poll(() => page.evaluate(() => document.documentElement.style.overflow))
      .not.toBe("hidden")
  })
}

test("alert dialog: cancel focus, blocking outside click, confirmation and reopening", async ({
  page,
}) => {
  await open(page, "alert-dialog")
  const trigger = demo(page).getByRole("button", { name: "Show Dialog" })
  await trigger.press("Enter")
  const dialog = page.getByRole("alertdialog")
  await expect(dialog.getByRole("button", { name: "Cancel" })).toBeFocused()
  await page.mouse.click(2, 2)
  await expect(dialog).toBeVisible()
  await dialog.getByRole("button", { name: "Cancel" }).click()
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
  await trigger.press("Enter")
  await dialog.getByRole("button", { name: "Continue" }).click()
  // Data Slot actions intentionally leave async confirmation to the consumer.
  await expect(dialog).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
})

test("accordion: exclusive expansion and keyboard navigation", async ({
  page,
}) => {
  await open(page, "accordion")
  const triggers = demo(page).locator('[data-slot="accordion-trigger"]')
  await triggers.nth(0).click()
  await expect(triggers.nth(0)).toHaveAttribute("aria-expanded", "true")
  await triggers.nth(0).press("ArrowDown")
  await expect(triggers.nth(1)).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(triggers.nth(1)).toHaveAttribute("aria-expanded", "true")
  await expect(triggers.nth(0)).toHaveAttribute("aria-expanded", "false")
})

test("collapsible: repeated pointer and keyboard toggles", async ({ page }) => {
  await open(page, "collapsible")
  const trigger = demo(page).getByRole("button", { name: "Toggle details" })
  const content = demo(page).locator('[data-slot="collapsible-content"]')
  await trigger.click()
  await expect(content).toBeVisible()
  await trigger.press("Space")
  await expect(content).toBeHidden()
  await trigger.press("Enter")
  await expect(content).toBeVisible()
})

test("tabs: nested demo tabs retain independent keyboard selection", async ({
  page,
}) => {
  await open(page, "tabs")
  const account = demo(page).getByRole("tab", { name: "Account", exact: true })
  const password = demo(page).getByRole("tab", {
    name: "Password",
    exact: true,
  })
  await account.press("ArrowRight")
  await expect(password).toHaveAttribute("aria-selected", "true")
  await expect(
    demo(page).getByRole("tab", { name: "Preview", exact: true })
  ).toHaveAttribute("aria-selected", "true")
  await password.press("Home")
  await expect(account).toHaveAttribute("aria-selected", "true")
})

test("select: lazy content, keyboard selection, typeahead and disabled controls", async ({
  page,
}) => {
  await open(page, "select")
  const root = demo(page).locator('[data-slot="select"]')
  await expect(root.locator('[data-slot="select-item"]')).toHaveCount(0)
  const trigger = root.getByRole("combobox")
  await trigger.press("ArrowDown")
  await page.keyboard.press("b")
  await page.keyboard.press("Enter")
  await expect(trigger).toContainText("Banana")
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.getByRole("option", { name: "Apple", exact: true }).click()
  await expect(trigger).toContainText("Apple")
  await expect(
    page.getByRole("combobox").filter({ hasText: "Unavailable" })
  ).toBeDisabled()
})

test("combobox: filtering, keyboard selection, clear and empty state", async ({
  page,
}) => {
  await open(page, "combobox")
  const input = demo(page).getByRole("combobox")
  await input.fill("Astro")
  await expect(
    page.getByRole("option", { name: "Astro", exact: true })
  ).toBeVisible()
  await input.press("ArrowDown")
  await input.press("Enter")
  await expect(input).toHaveValue("Astro")
  await input.fill("zzzzzzzzzz")
  await expect(
    page.locator('[data-slot="combobox-empty"]:visible')
  ).toBeVisible()
  await input.press("Escape")
  await expect(
    demo(page).locator('[data-slot="combobox-content"]')
  ).toBeHidden()
})

test("dropdown menu: keyboard navigation and selection dismissal", async ({
  page,
}) => {
  await open(page, "dropdown-menu")
  const trigger = demo(page).getByRole("button", { name: "Open menu" })
  await trigger.press("ArrowDown")
  await expect(page.getByRole("menu")).toBeFocused()
  await page.keyboard.press("ArrowDown")
  await expect(
    page.getByRole("menuitem", { name: /Profile/ }).first()
  ).toBeFocused()
  await page.keyboard.press("ArrowDown")
  await expect(
    page.getByRole("menuitem", { name: /Billing/ }).first()
  ).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(page.getByRole("menu")).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.keyboard.press("Escape")
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
})

test("navigation menu: lazy links, keyboard opening and focus restoration", async ({
  page,
}) => {
  await open(page, "navigation-menu")
  const trigger = demo(page).getByRole("button", { name: "Getting started" })
  await expect(
    demo(page).locator('[data-slot="navigation-menu-content"]')
  ).toHaveCount(0)
  await trigger.press("Enter")
  const content = page.locator('[data-slot="navigation-menu-content"]:visible')
  await expect(content).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(content).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

for (const name of ["tooltip", "hover-card"]) {
  test(`${name}: lazy content, keyboard focus and Escape`, async ({
    page,
    browserName,
  }) => {
    await open(page, name)
    const trigger = demo(page).locator(`[data-slot="${name}-trigger"]`)
    await expect(
      demo(page).locator(`[data-slot="${name}-content"]`)
    ).toHaveCount(0)
    await trigger.focus()
    await page.keyboard.press(
      browserName === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab"
    )
    await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab")
    const content = page.locator(`[data-slot="${name}-content"]:visible`)
    await expect(content).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(content).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })
}

test("radio group: keyboard selection and roving focus", async ({ page }) => {
  await open(page, "radio-group")
  const radios = demo(page).getByRole("radio")
  await radios.nth(0).press("ArrowDown")
  await expect(radios.nth(1)).toBeChecked()
  await expect(radios.nth(1)).toBeFocused()
  await expect(radios.nth(0)).not.toBeChecked()
})

test("slider: keyboard bounds and pointer value changes", async ({ page }) => {
  await open(page, "slider")
  const slider = demo(page).getByRole("slider")
  await slider.press("ArrowRight")
  await expect(slider).toHaveAttribute("aria-valuenow", "34")
  await slider.press("End")
  await expect(slider).toHaveAttribute("aria-valuenow", "100")
  await slider.press("Home")
  await expect(slider).toHaveAttribute("aria-valuenow", "0")
  await demo(page).locator('[data-slot="slider-track"]').click()
  await expect(slider).not.toHaveAttribute("aria-valuenow", "0")
})

test("switch: click and Space toggle once after repeated initialization", async ({
  page,
}) => {
  await open(page, "switch")
  const control = demo(page).getByRole("switch")
  await control.click()
  await expect(control).toBeChecked()
  await control.press("Space")
  await expect(control).not.toBeChecked()
})

test("toggle: pointer and keyboard pressed state", async ({ page }) => {
  await open(page, "toggle")
  const toggle = demo(page).getByRole("button", { name: "Toggle bold" })
  await toggle.click()
  await expect(toggle).toHaveAttribute("aria-pressed", "true")
  await toggle.press("Space")
  await expect(toggle).toHaveAttribute("aria-pressed", "false")
})

test("command: new trigger slot, nested command filtering and dismissal", async ({
  page,
}) => {
  await open(page, "command")
  await expect(page.getByPlaceholder("Search shortcuts...")).not.toBeFocused()
  await page
    .getByRole("button", { name: "Quick actions", exact: true })
    .press("Enter")
  const dialog = page.getByRole("dialog", {
    name: "Quick actions",
    exact: true,
  })
  await expect(dialog).toBeVisible()
  const input = dialog.getByRole("combobox")
  await expect(input).toBeFocused()
  await input.fill("zzzzzzzz")
  await expect(dialog.getByRole("option")).toHaveCount(0)
  await input.fill("Settings")
  await expect(
    dialog.getByRole("option", { name: "Settings", exact: true })
  ).toBeVisible()
  await input.press("Escape")
  await expect(dialog).toBeHidden()
})

test("sidebar: mobile nested search, focus restoration and navigation reinitialization", async ({
  page,
  isMobile,
}) => {
  await open(page, "dialog")
  for (let i = 0; i < 2; i++) {
    if (isMobile)
      await page
        .getByRole("button", { name: "Toggle Sidebar", exact: true })
        .click()
    const search = page
      .getByRole("button", { name: /Search/ })
      .filter({ visible: true })
      .first()
    await search.press("Enter")
    const dialog = page.getByRole("dialog", { name: "Search", exact: true })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole("combobox")).toBeFocused()
    await dialog.getByRole("combobox").fill("zzzzzzzzzzzz")
    await expect(dialog.getByRole("option")).toHaveCount(0)
    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
    await expect(search).toBeFocused()
    if (isMobile) {
      await expect(
        page.getByRole("dialog", { name: "Sidebar", exact: true })
      ).toBeVisible()
      await page.keyboard.press("Escape")
      await expect(
        page.getByRole("dialog", { name: "Sidebar", exact: true })
      ).toBeHidden()
    }
    await page.goto("/components/select/")
    await page.goBack()
    await expect(
      demo(page).getByRole("button", { name: "Edit Profile" })
    ).toBeVisible()
  }
})
