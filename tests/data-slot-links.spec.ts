import { expect, test } from "@playwright/test"

test.describe("consumer dropdown links", () => {
  test.use({ baseURL: "http://127.0.0.1:4176" })

  test("native buttons keep form-safe defaults and links navigate by keyboard", async ({
    page,
  }) => {
    await page.goto("/")
    await page
      .getByRole("button", { name: "Consumer links" })
      .press("ArrowDown")
    await page.keyboard.press("ArrowDown")

    const button = page.getByRole("menuitem", { name: "Button action" })
    await expect(button).toBeFocused()
    await expect(button).toHaveJSProperty("tagName", "BUTTON")
    await expect(button).toHaveAttribute("type", "button")

    await page.keyboard.press("ArrowDown")
    const link = page.getByRole("menuitem", { name: "Next consumer page" })
    await expect(link).toBeFocused()
    await expect(link).toHaveJSProperty("tagName", "A")
    await expect(link).toHaveAttribute("href", "/next/")

    await page.evaluate(() => {
      ;(window as Window & { selections?: number }).selections = 0
      document.addEventListener("dropdown-menu:select", () => {
        const state = window as Window & { selections: number }
        state.selections++
      })
    })
    await link.press("Enter")
    await expect(page).toHaveURL(/\/next\/$/)
    expect(
      await page.evaluate(
        () => (window as Window & { selections?: number }).selections
      )
    ).toBe(1)
  })
})

test.describe("documentation clipboard controls", () => {
  test.use({ baseURL: "http://127.0.0.1:4174" })

  test("code blocks initialize once and show success only after copying", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (value: string) => {
            const state = window as Window & {
              copiedText?: string
              copyCalls?: number
            }
            state.copiedText = value
            state.copyCalls = (state.copyCalls ?? 0) + 1
          },
        },
      })
    })
    await page.goto("/components/button/")

    const preCount = await page
      .locator("[data-slot='typography'] > .docs-code-block > pre")
      .count()
    await page.evaluate(() => {
      for (let index = 0; index < 3; index += 1)
        document.dispatchEvent(new Event("astro:page-load"))
    })
    await expect(page.locator(".docs-code-block")).toHaveCount(preCount)

    const installButton = page
      .locator("[id^='live-code-copy-install-']")
      .first()
    await installButton.click()
    await expect(installButton.locator("[data-copy-icon]")).toHaveClass(
      /hidden/
    )
    await expect(installButton.locator("[data-check-icon]")).not.toHaveClass(
      /hidden/
    )

    const button = page.locator(".docs-code-copy").first()
    await button.click()
    await expect(button.locator("[data-copy-icon]")).toHaveClass(/hidden/)
    await expect(button.locator("[data-check-icon]")).not.toHaveClass(/hidden/)
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as Window & { copyCalls?: number }).copyCalls
        )
      )
      .toBe(2)
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as Window & { copiedText?: string }).copiedText
        )
      )
      .not.toBe("")
  })

  test("failed clipboard writes leave the retry state unchanged", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async () => {
            throw new Error("Clipboard unavailable")
          },
        },
      })
    })
    await page.goto("/components/button/")

    const installButton = page
      .locator("[id^='live-code-copy-install-']")
      .first()
    await installButton.click()
    await expect(installButton.locator("[data-copy-icon]")).not.toHaveClass(
      /hidden/
    )
    await expect(installButton.locator("[data-check-icon]")).toHaveClass(
      /hidden/
    )

    const button = page.locator(".docs-code-copy").first()
    await button.click()
    await expect(button.locator("[data-copy-icon]")).not.toHaveClass(/hidden/)
    await expect(button.locator("[data-check-icon]")).toHaveClass(/hidden/)
  })
})

test("consumer controls do not submit a surrounding form", async ({ page }) => {
  await page.goto("http://127.0.0.1:4176/")
  const trigger = page.getByRole("button", {
    name: "Consumer dialog",
    exact: true,
  })
  await trigger.evaluate((button) => {
    const root = button.closest('[data-slot="dialog"]')!
    const form = document.createElement("form")
    form.id = "control-form"
    form.dataset.submissions = "0"
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      form.dataset.submissions = String(Number(form.dataset.submissions) + 1)
    })
    root.before(form)
    form.append(root)
  })
  await trigger.press("Enter")
  await expect(
    page.getByRole("dialog", { name: "Consumer dialog", exact: true })
  ).toBeVisible()
  await expect(page.locator("#control-form")).toHaveAttribute(
    "data-submissions",
    "0"
  )
  await page.keyboard.press("Escape")
})
