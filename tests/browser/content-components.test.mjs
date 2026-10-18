// Run after `vp run build`. Checks the content components in the rendered docs
// across Chromium, Firefox and WebKit, including keyboard and clipboard flows.
import assert from "node:assert/strict"
import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, resolve } from "node:path"
import { after, before, test } from "node:test"
import { chromium, firefox, webkit } from "playwright"

const root = resolve(process.env.DIST ?? "dist")
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
}
const server = createServer((request, response) => {
  let file = join(
    root,
    decodeURIComponent(new URL(request.url, "http://localhost").pathname)
  )
  if (existsSync(file) && statSync(file).isDirectory())
    file = join(file, "index.html")
  if (!file.startsWith(root) || !existsSync(file)) {
    response.writeHead(404).end()
    return
  }
  response.writeHead(200, {
    "content-type": types[extname(file)] ?? "application/octet-stream",
  })
  createReadStream(file).pipe(response)
})
let origin
before(async () => {
  await new Promise((done) => server.listen(0, "127.0.0.1", done))
  origin = `http://127.0.0.1:${server.address().port}`
})
after(() => server.close())

for (const browserType of [chromium, firefox, webkit]) {
  test(`${browserType.name()} content components`, async (t) => {
    const browser = await browserType.launch()
    t.after(() => browser.close())
    const page = await browser.newPage()
    const errors = []
    page.on("pageerror", (error) => errors.push(error.message))

    await t.test(
      "code is escaped, numbered, wrapped and copied by keyboard",
      async () => {
        await page.addInitScript(() => {
          Object.defineProperty(navigator, "clipboard", {
            configurable: true,
            value: {
              writeText: async (value) => {
                window.copiedText = value
              },
            },
          })
        })
        await page.goto(`${origin}/components/code-block/`)
        const content = page.locator('[data-slot="code-block-content"]').first()
        await content.waitFor({ state: "visible" })
        assert.equal(await content.locator("button").count(), 0)
        assert.match(await content.textContent(), /<Button href=/)
        assert.equal(await content.getAttribute("dir"), "ltr")
        await content.focus()
        assert.equal(
          await content.evaluate(
            (element) => document.activeElement === element
          ),
          true
        )
        const copy = page
          .locator('[data-slot="code-block-copy-button"]')
          .first()
        await copy.focus()
        assert.equal(
          await copy.evaluate((element) => document.activeElement === element),
          true
        )
        await page.keyboard.press("Enter")
        await page.waitForFunction(() =>
          document
            .querySelector('[data-slot="code-block-copy-button"]')
            .hasAttribute("data-copied")
        )
        assert.equal(
          await page.evaluate(() => window.copiedText),
          await content.textContent()
        )
        assert.equal(await copy.getAttribute("aria-label"), "Copied")
        await page.waitForFunction(
          () =>
            !document
              .querySelector('[data-slot="code-block-copy-button"]')
              .hasAttribute("data-copied")
        )
        assert.equal(await copy.getAttribute("aria-label"), "Copy")
        const numbered = page
          .locator('[data-slot="code-block-content"][data-numbered]')
          .first()
        assert.equal(
          await numbered.locator('[data-slot="code-block-line"]').count(),
          5
        )
        assert.equal(
          await numbered
            .locator('[data-slot="code-block-line-content"]')
            .nth(2)
            .textContent(),
          "\n"
        )
        assert.equal(
          await page
            .locator('[data-slot="code-block-content"][data-wrap]')
            .evaluate((element) => getComputedStyle(element).whiteSpace),
          "pre-wrap"
        )
        assert.equal(
          await numbered.locator("code").evaluate((element) => {
            const range = document.createRange()
            range.selectNodeContents(element)
            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            const value = selection.toString()
            selection.removeAllRanges()
            return value.replace(/\n$/, "")
          }),
          '{\n  "name": "our-website",\n\n  "private": true\n}'
        )
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
          ),
          true
        )
      }
    )

    await t.test(
      "clipboard failure is announced without a success state",
      async () => {
        await page.evaluate(() => {
          navigator.clipboard.writeText = async () => {
            throw new Error("Denied")
          }
        })
        const copy = page
          .locator('[data-slot="code-block-copy-button"]')
          .first()
        await copy.click()
        await page.waitForFunction(
          () =>
            document.querySelector("[data-copy-status]").textContent ===
            "Could not copy"
        )
        assert.equal(await copy.getAttribute("data-copied"), null)
      }
    )

    await t.test(
      "progress has accurate values, widths and reduced motion",
      async () => {
        await page.emulateMedia({ reducedMotion: "reduce" })
        await page.goto(`${origin}/components/progress/`)
        const progress = page.getByRole("progressbar", {
          name: "Course progress",
          exact: true,
        })
        assert.equal(await progress.getAttribute("value"), "56")
        const percentage = await progress.evaluate(
          (element) =>
            element.parentElement
              .querySelector('[data-slot="progress-indicator"]')
              .getBoundingClientRect().width /
            element.parentElement
              .querySelector('[data-slot="progress-track"]')
              .getBoundingClientRect().width
        )
        assert.ok(Math.abs(percentage - 0.56) < 0.01)
        const indeterminate = page.getByRole("progressbar", {
          name: "Loading article",
        })
        assert.equal(await indeterminate.getAttribute("value"), null)
        assert.equal(
          await indeterminate.evaluate(
            (element) =>
              getComputedStyle(
                element.parentElement.querySelector(
                  '[data-slot="progress-indicator"]'
                )
              ).animationName
          ),
          "none"
        )
        const steps = page.getByRole("progressbar", {
          name: "Lessons completed",
        })
        assert.equal(await steps.getAttribute("max"), "5")
        assert.equal(await steps.getAttribute("value"), "3")
        const rtl = page.getByRole("progressbar", { name: "تقدم الدورة" })
        assert.equal(
          await rtl.evaluate((element) => getComputedStyle(element).direction),
          "rtl"
        )
      }
    )

    await t.test(
      "Collapsible dismissal is opt-in and restores keyboard focus",
      async () => {
        await page.goto(`${origin}/components/collapsible/`)
        const trigger = page.getByRole("button", {
          name: "Browse documentation",
        })
        await trigger.click()
        const navigation = page.getByRole("navigation", {
          name: "Documentation example",
        })
        await navigation
          .getByRole("link", { name: "Installation", exact: true })
          .focus()
        await page.keyboard.press("Escape")
        await page.waitForFunction(
          () =>
            document
              .querySelector(
                '[data-close-on-escape] [data-slot="collapsible-trigger"]'
              )
              .getAttribute("aria-expanded") === "false"
        )
        assert.equal(
          await trigger.evaluate(
            (element) => document.activeElement === element
          ),
          true
        )
        await trigger.click()
        await page
          .getByRole("heading", { name: "Collapsible", exact: true })
          .click()
        assert.equal(await trigger.getAttribute("aria-expanded"), "false")
        const defaultTrigger = page
          .locator(
            '[data-slot="collapsible"]:not([data-close-on-escape]) [data-slot="collapsible-trigger"]'
          )
          .first()
        await defaultTrigger.click()
        assert.equal(await defaultTrigger.getAttribute("aria-expanded"), "true")
        await page.keyboard.press("Escape")
        await page
          .getByRole("heading", { name: "Collapsible", exact: true })
          .click()
        assert.equal(await defaultTrigger.getAttribute("aria-expanded"), "true")
      }
    )

    await t.test(
      "Combobox clear follows selection and restores the trigger and focus",
      async () => {
        await page.goto(`${origin}/components/combobox/`)
        const root = page.locator('[data-slot="combobox"]').filter({
          has: page.locator('[data-slot="combobox-clear"]'),
        })
        const input = root.locator("input")
        const clear = root.getByRole("button", { name: "Clear selection" })
        const trigger = root.locator('[data-slot="combobox-trigger"]')
        await clear.waitFor({ state: "visible" })
        assert.equal(await input.inputValue(), "Next.js")
        assert.equal(await trigger.isVisible(), false)
        await clear.click()
        assert.equal(await input.inputValue(), "")
        assert.equal(await root.getAttribute("data-value"), null)
        assert.equal(await clear.isVisible(), false)
        assert.equal(await trigger.isVisible(), true)
        assert.equal(
          await input.evaluate((element) => document.activeElement === element),
          true
        )
        await page.keyboard.press("ArrowDown")
        await page.keyboard.press("End")
        await page.keyboard.press("Enter")
        assert.equal(await input.inputValue(), "Astro")
        assert.equal(await root.getAttribute("data-value"), "Astro")
        assert.equal(await clear.isVisible(), true)
        assert.equal(await trigger.isVisible(), false)
      }
    )

    await t.test(
      "tabs and selects render what their script shows when it starts",
      async () => {
        // The shown panels of each tabs with panels, and the text of each
        // select trigger.
        const state = () =>
          [...document.querySelectorAll('[data-slot="tabs"]')]
            .map((tabs) =>
              [...tabs.querySelectorAll('[data-slot="tabs-content"]')].filter(
                (panel) => panel.closest('[data-slot="tabs"]') === tabs
              )
            )
            .filter((panels) => panels.length)
            .map((panels) =>
              panels
                .filter((panel) => !panel.hidden)
                .map((panel) => panel.dataset.value)
                .join()
            )
            .concat(
              [
                ...document.querySelectorAll('[data-slot="select-trigger"]'),
              ].map((trigger) => trigger.textContent.trim())
            )
        const noScript = await browser.newPage({ javaScriptEnabled: false })
        t.after(() => noScript.close())
        for (const path of ["/components/tabs/", "/components/select/"]) {
          await noScript.goto(`${origin}${path}`)
          await page.goto(`${origin}${path}`)
          await page.waitForLoadState("networkidle")
          const rendered = await noScript.evaluate(state)
          assert.ok(rendered.every(Boolean), path)
          assert.deepEqual(rendered, await page.evaluate(state), path)
        }
      }
    )

    assert.deepEqual(errors, [])
  })
}
