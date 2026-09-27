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

test("drawer: focus, dismissal, repeated opening and nested Escape", async ({
  page,
}) => {
  await open(page, "drawer")
  const trigger = demo(page).getByRole("button", { name: "Open drawer" })
  const drawer = demo(page).locator('[data-slot="drawer"]')
  const popup = page.getByRole("dialog", { name: "Edit profile" })

  for (let i = 0; i < 2; i++) {
    await trigger.press("Enter")
    await expect(popup).toBeVisible()
    await expect(popup).toBeFocused()
    await page.keyboard.press("Escape")
    await expect(popup).toBeHidden()
    await expect(trigger).toBeFocused()
  }

  await trigger.click()
  await expect(drawer).toHaveAttribute("data-state", "open")
  await page.mouse.click(2, 2)
  await expect(popup).toBeHidden()

  const outer = page.locator("#nested-drawer-example")
  const outerPopup = page.getByRole("dialog", {
    name: "Project settings",
    exact: true,
  })
  const nestedPopup = page.getByRole("dialog", {
    name: "Advanced settings",
    exact: true,
  })
  await outer
    .getByRole("button", { name: "Open project settings", exact: true })
    .click()
  await expect(outerPopup).toBeVisible()
  await page
    .getByRole("button", { name: "Open advanced settings", exact: true })
    .click()
  await expect(nestedPopup).toBeVisible()
  await expect(
    page.locator('[data-slot="drawer-popup"][data-nested-drawer-open]')
  ).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(nestedPopup).toBeHidden()
  await expect(outerPopup).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(outerPopup).toBeHidden()
})

test("toast: events, actions, dismissal, paused timers and navigation", async ({
  page,
}) => {
  await open(page, "toast")
  const root = page.locator("#example-toaster")
  const items = page.locator('[data-slot="toast-item"]')

  await root.evaluate((element) => {
    element.addEventListener("toast:change", (event) => {
      const detail = (event as CustomEvent).detail
      element.setAttribute(
        "data-test-changes",
        [
          element.getAttribute("data-test-changes"),
          `${detail.action}:${detail.id}`,
        ]
          .filter(Boolean)
          .join(",")
      )
    })
    element.addEventListener("toast:action", (event) => {
      const detail = (event as CustomEvent).detail
      element.setAttribute("data-test-action", `${detail.id}:${detail.value}`)
    })
  })

  await demo(page).getByRole("button", { name: "Show toast" }).click()
  await expect(items).toHaveCount(1)
  const basic = items.first()
  await expect(basic).toHaveAttribute("data-type", "success")
  await expect(basic).toContainText("Event created")
  await expect(basic).toContainText("Sunday, December 3 at 9:00 AM")
  await basic.getByRole("button", { name: "Close notification" }).click()
  await expect(items).toHaveCount(0)
  await expect(root).toHaveAttribute(
    "data-test-changes",
    /show:toast-1,dismiss:toast-1/
  )

  await demo(page).getByRole("button", { name: "Toast with action" }).click()
  const actionToast = items.filter({ hasText: "You can undo this action." })
  await actionToast.getByRole("button", { name: "Undo" }).click()
  await expect(root).toHaveAttribute("data-test-action", /:undo-event$/)
  await expect(actionToast).toHaveCount(0)

  await root.evaluate((element) =>
    element.dispatchEvent(
      new CustomEvent("toast:show", {
        detail: { id: "paused-toast", title: "Paused", duration: 200 },
      })
    )
  )
  const viewport = page.locator('[data-slot="toast-viewport"]')
  await viewport.evaluate((element) =>
    element.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }))
  )
  const pausedToast = items.filter({ hasText: "Paused" })
  await expect(pausedToast).toBeVisible()
  await page.waitForTimeout(300)
  await expect(pausedToast).toBeVisible()
  await viewport.evaluate((element) =>
    element.dispatchEvent(new PointerEvent("pointerleave", { bubbles: true }))
  )
  await expect(pausedToast).toHaveCount(0)

  const pagination = page.getByRole("navigation", {
    name: "Document pagination",
  })
  await page.addStyleTag({
    content: "@view-transition { navigation: none; }",
  })
  await pagination.locator('a[href="/components/toc/"]').click()
  await expect(page).toHaveURL(/\/components\/toc\/$/)
  await page.addStyleTag({
    content: "@view-transition { navigation: none; }",
  })
  await page
    .getByRole("navigation", { name: "Document pagination" })
    .locator('a[href="/components/toast/"]')
    .click()
  await expect(page).toHaveURL(/\/components\/toast\/$/)
  await expect(
    demo(page).getByRole("button", { name: "Show toast" })
  ).toBeVisible()
  await demo(page).getByRole("button", { name: "Show toast" }).click()
  await expect(page.locator('[data-slot="toast-item"]')).toHaveCount(1)
})

test("toggle group: single, multiple, keyboard and disabled states", async ({
  page,
}) => {
  await open(page, "toggle-group")
  const previews = page.locator(".live-code-layout")
  const single = previews.nth(0).locator('[data-slot="toggle-group"]')
  const left = single.getByRole("button", { name: "Align left" })
  const center = single.getByRole("button", { name: "Align center" })
  const right = single.getByRole("button", { name: "Align right" })

  await expect(center).toHaveAttribute("aria-pressed", "true")
  await left.click()
  await expect(left).toHaveAttribute("aria-pressed", "true")
  await expect(center).toHaveAttribute("aria-pressed", "false")
  await left.press("ArrowRight")
  await expect(center).toBeFocused()
  await center.press("End")
  await expect(right).toBeFocused()
  await right.press("Space")
  await expect(right).toHaveAttribute("aria-pressed", "true")
  await expect(left).toHaveAttribute("aria-pressed", "false")

  const multiple = previews.nth(1).locator('[data-slot="toggle-group"]')
  const bold = multiple.getByRole("button", { name: "Bold" })
  const italic = multiple.getByRole("button", { name: "Italic" })
  const underline = multiple.getByRole("button", { name: "Underline" })
  await expect(bold).toHaveAttribute("aria-pressed", "true")
  await expect(italic).toHaveAttribute("aria-pressed", "true")
  await underline.click()
  await expect(underline).toHaveAttribute("aria-pressed", "true")
  await expect(bold).toHaveAttribute("aria-pressed", "true")
  await bold.press("Space")
  await expect(bold).toHaveAttribute("aria-pressed", "false")

  const disabled = previews.nth(4).locator('[data-slot="toggle-group"]')
  await expect(disabled.nth(0).getByRole("button").first()).toBeDisabled()
  await expect(disabled.nth(1).getByRole("button").nth(2)).toBeDisabled()
})

test("resizable: pointer, keyboard bounds and collapsible panel", async ({
  page,
}) => {
  await open(page, "resizable")
  const previews = page.locator(".live-code-layout")
  const handle = previews
    .nth(0)
    .getByRole("separator", { name: "Resize sidebar and content" })

  await expect(handle).toHaveAttribute("aria-valuenow", "35")
  await handle.press("ArrowRight")
  await expect(handle).toHaveAttribute("aria-valuenow", "45")
  await handle.press("Home")
  await expect(handle).toHaveAttribute("aria-valuenow", "20")
  await handle.press("End")
  await expect(handle).toHaveAttribute("aria-valuenow", "70")

  const box = await handle.boundingBox()
  if (!box) throw new Error("Resizable handle has no layout box")
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await page.mouse.move(box.x - 80, box.y + box.height / 2, { steps: 4 })
  await page.mouse.up()
  await expect(handle).not.toHaveAttribute("aria-valuenow", "70")

  const verticalHandle = previews.nth(1).getByRole("separator", {
    name: "Resize header and body",
  })
  await expect(verticalHandle).toHaveAttribute("aria-valuenow", "35")
  await verticalHandle.press("ArrowDown")
  await expect(verticalHandle).toHaveAttribute("aria-valuenow", "45")

  const collapsibleDemo = previews.nth(2)
  const collapsibleHandle = collapsibleDemo.getByRole("separator", {
    name: "Resize or collapse sidebar",
  })
  const panel = collapsibleDemo.locator('[data-slot="resizable-panel"]').first()
  await collapsibleHandle.press("Enter")
  await expect(panel).toHaveAttribute("data-collapsed", "")
  await expect(collapsibleHandle).toHaveAttribute("aria-valuenow", "0")
  await collapsibleHandle.press("Enter")
  await expect(panel).toHaveAttribute("data-expanded", "")
  await expect(collapsibleHandle).toHaveAttribute("aria-valuenow", "30")

  const nestedDemo = previews.nth(3)
  const outerHandle = nestedDemo.getByRole("separator", {
    name: "Resize navigation and workspace",
  })
  const innerHandle = nestedDemo.getByRole("separator", {
    name: "Resize editor and console",
  })
  await expect(outerHandle).toHaveAttribute("aria-valuenow", "35")
  await expect(innerHandle).toHaveAttribute("aria-valuenow", "60")
  await innerHandle.press("ArrowDown")
  await expect(innerHandle).toHaveAttribute("aria-valuenow", "70")
  await expect(outerHandle).toHaveAttribute("aria-valuenow", "35")
})

test("carousel: controls, full-slide state and keyboard navigation", async ({
  page,
}) => {
  await open(page, "carousel")
  const root = demo(page).locator('[data-slot="carousel"]')
  const content = root.locator('[data-slot="carousel-content"]')
  const items = root.locator('[data-slot="carousel-item"]')
  const previous = root.getByRole("button", { name: "Previous slide" })
  const next = root.getByRole("button", { name: "Next slide" })

  await expect(root).toHaveAttribute("data-index", "0")
  await expect(previous).toBeDisabled()
  await expect(items.nth(0)).toHaveAttribute("data-state", "active")
  await expect(items.nth(1)).toHaveAttribute("aria-hidden", "true")
  await expect(items.nth(1)).toHaveAttribute("inert", "")
  const contentBox = await content.boundingBox()
  const itemBox = await items.nth(0).boundingBox()
  if (!contentBox || !itemBox) throw new Error("Carousel has no layout box")
  expect(Math.abs(contentBox.width - itemBox.width)).toBeLessThanOrEqual(1)

  await page.mouse.move(
    contentBox.x + contentBox.width * 0.75,
    contentBox.y + contentBox.height / 2
  )
  await page.mouse.down()
  await page.mouse.move(
    contentBox.x + contentBox.width * 0.15,
    contentBox.y + contentBox.height / 2,
    { steps: 6 }
  )
  await page.mouse.up()
  await expect(root).toHaveAttribute("data-index", "1")

  await previous.click()
  await expect(root).toHaveAttribute("data-index", "0")
  await next.click()
  await expect(root).toHaveAttribute("data-index", "1")
  await expect(items.nth(1)).toHaveAttribute("data-state", "active")
  await previous.click()
  await expect(root).toHaveAttribute("data-index", "0")

  await next.focus()
  await next.press("ArrowRight")
  await expect(root).toHaveAttribute("data-index", "1")
  await next.press("End")
  await expect(root).toHaveAttribute("data-index", "2")
  await expect(next).toBeDisabled()
  await previous.press("Home")
  await expect(root).toHaveAttribute("data-index", "0")

  const loopRoot = page
    .locator(".live-code-layout")
    .nth(1)
    .locator('[data-slot="carousel"]')
  const loopItems = loopRoot.locator('[data-slot="carousel-item"]')
  const loopPrevious = loopRoot.getByRole("button", { name: "Previous slide" })
  const loopNext = loopRoot.getByRole("button", { name: "Next slide" })
  await expect(loopRoot).toHaveAttribute("data-index", "1")
  await expect(loopItems.nth(1)).toHaveAttribute("data-state", "active")
  await loopPrevious.click()
  await expect(loopRoot).toHaveAttribute("data-index", "0")
  await loopPrevious.click()
  await expect(loopRoot).toHaveAttribute("data-index", "2")
  await loopNext.click()
  await expect(loopRoot).toHaveAttribute("data-index", "0")

  const verticalRoot = page
    .locator(".live-code-layout")
    .nth(2)
    .locator('[data-slot="carousel"]')
  const verticalContent = verticalRoot.locator('[data-slot="carousel-content"]')
  const verticalItems = verticalRoot.locator('[data-slot="carousel-item"]')
  const verticalNext = verticalRoot.getByRole("button", {
    name: "Next slide",
  })
  const verticalPrevious = verticalRoot.getByRole("button", {
    name: "Previous slide",
  })
  await verticalContent.scrollIntoViewIfNeeded()
  const verticalContentBox = await verticalContent.boundingBox()
  const verticalItemBox = await verticalItems.nth(0).boundingBox()
  if (!verticalContentBox || !verticalItemBox)
    throw new Error("Vertical carousel has no layout box")
  expect(
    Math.abs(verticalContentBox.height - verticalItemBox.height)
  ).toBeLessThanOrEqual(1)
  await verticalNext.click()
  await expect(verticalRoot).toHaveAttribute("data-index", "1")
  await verticalPrevious.click()
  await expect(verticalRoot).toHaveAttribute("data-index", "0")
  await expect
    .poll(() => verticalContent.evaluate((element) => element.scrollTop))
    .toBeLessThan(verticalContentBox.height * 0.2)
  await verticalNext.focus()
  await verticalNext.press("ArrowDown")
  await expect(verticalRoot).toHaveAttribute("data-index", "1")
  await expect
    .poll(() => verticalContent.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(verticalContentBox.height * 0.8)
  const verticalDragBox = await verticalContent.boundingBox()
  if (!verticalDragBox) throw new Error("Vertical carousel moved out of view")
  await page.mouse.move(
    verticalDragBox.x + verticalDragBox.width / 2,
    verticalDragBox.y + verticalDragBox.height * 0.75
  )
  await page.mouse.down()
  await page.mouse.move(
    verticalDragBox.x + verticalDragBox.width / 2,
    verticalDragBox.y + verticalDragBox.height * 0.15,
    { steps: 6 }
  )
  await page.mouse.up()
  await expect(verticalRoot).toHaveAttribute("data-index", "2")
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
