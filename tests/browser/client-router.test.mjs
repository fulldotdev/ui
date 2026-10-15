// Checks that ThemeProvider keeps the theme across Astro <ClientRouter />
// navigation in Chromium, Firefox and WebKit: no flash, and no theme saved
// that the visitor did not choose. Builds its own two-page site, so it needs
// no docs build. Run with `vp node --test tests/browser/client-router.test.mjs`.
import assert from "node:assert/strict"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { after, before, test } from "node:test"
import { build, preview } from "astro"
import { chromium, firefox, webkit } from "playwright"

const src = resolve("src")
const root = resolve("node_modules/.cache/client-router-site")
const page = (title, next) => `---
import { ClientRouter } from "astro:transitions"
import { ThemeProvider, ThemeToggle } from "${src}/components/ui/theme-toggle"
---

<html lang="en" transition:animate="fade">
  <head>
    <title>${title}</title>
    <ThemeProvider />
    <ClientRouter />
  </head>
  <body>
    <h1>${title}</h1>
    <a href="${next}">Next</a>
    <ThemeToggle />
  </body>
</html>
`

let server
let origin
before(async () => {
  rmSync(root, { recursive: true, force: true })
  mkdirSync(join(root, "src/pages"), { recursive: true })
  writeFileSync(join(root, "src/pages/index.astro"), page("One", "/two/"))
  writeFileSync(join(root, "src/pages/two.astro"), page("Two", "/"))
  const config = {
    root,
    configFile: false,
    logLevel: "error",
    vite: { resolve: { alias: { "@": src } } },
  }
  await build(config)
  server = await preview({ ...config, server: { port: 0 } })
  origin = `http://localhost:${server.port}`
})
after(async () => {
  await server?.stop()
  rmSync(root, { recursive: true, force: true })
})

// Navigates with the ClientRouter and reports whether the page showed the
// light theme at any moment of the swap.
const navigate = async (page, go) => {
  await page.evaluate(() => {
    window.__loaded = false
    window.__lightDuringSwap = false
    const loaded = () => (window.__loaded = true)
    document.addEventListener("astro:page-load", loaded, { once: true })
    new MutationObserver(() => {
      if (!document.documentElement.classList.contains("dark"))
        window.__lightDuringSwap = true
    }).observe(document.documentElement, { attributes: true })
  })
  await go()
  await page.waitForFunction(() => window.__loaded)
  return page.evaluate(() => window.__lightDuringSwap)
}
const state = (page) =>
  page.evaluate(() => ({
    dark: document.documentElement.classList.contains("dark"),
    stored: localStorage.getItem("theme"),
    toggle: document.querySelector("[data-theme-toggle]")?.dataset.state,
  }))

for (const browserType of [chromium, firefox, webkit]) {
  test(`${browserType.name()} keeps the theme across ClientRouter navigation`, async (t) => {
    const browser = await browserType.launch()
    t.after(() => browser.close())

    await t.test("system dark without a choice", async () => {
      const context = await browser.newContext({ colorScheme: "dark" })
      const page = await context.newPage()
      await page.goto(`${origin}/`)
      const flashed = await navigate(page, () => page.click("a"))
      assert.equal(flashed, false)
      assert.deepEqual(await state(page), {
        dark: true,
        stored: null,
        toggle: "on",
      })
      await context.close()
    })

    await t.test("a dark choice on a light system, also back", async () => {
      const context = await browser.newContext({ colorScheme: "light" })
      const page = await context.newPage()
      await page.goto(`${origin}/`)
      await page.click("[data-theme-toggle]")
      assert.equal(await navigate(page, () => page.click("a")), false)
      assert.equal(await navigate(page, () => page.goBack()), false)
      assert.deepEqual(await state(page), {
        dark: true,
        stored: "dark",
        toggle: "on",
      })
      await context.close()
    })

    await t.test("a light choice on a dark system", async () => {
      const context = await browser.newContext({ colorScheme: "dark" })
      const page = await context.newPage()
      await page.goto(`${origin}/`)
      await page.click("[data-theme-toggle]")
      await navigate(page, () => page.click("a"))
      assert.deepEqual(await state(page), {
        dark: false,
        stored: "light",
        toggle: "off",
      })
      await context.close()
    })

    await t.test("a newer choice during the fallback fade", async () => {
      const context = await browser.newContext({ colorScheme: "dark" })
      await context.addInitScript(() => {
        document.startViewTransition = undefined
      })
      const page = await context.newPage()
      await page.goto(`${origin}/`)
      await page.evaluate(() => {
        document.addEventListener(
          "astro:before-swap",
          () => setTimeout(() => window.__setTheme("light"), 20),
          { once: true }
        )
      })
      await navigate(page, () => page.click("a"))
      assert.deepEqual(await state(page), {
        dark: false,
        stored: "light",
        toggle: "off",
      })
      await context.close()
    })
  })
}
