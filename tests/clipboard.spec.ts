import { expect, test } from "@playwright/test"

test.describe("documentation clipboard controls", () => {
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
