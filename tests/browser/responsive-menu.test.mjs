import assert from "node:assert/strict"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { after, before, test } from "node:test"
import { build, preview } from "astro"
import { chromium, firefox, webkit } from "playwright"

const src = resolve("src")
const root = resolve("node_modules/.cache/responsive-menu-site")
const page = (dialog, router = false) => `---
import { ClientRouter } from "astro:transitions"
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "${src}/components/ui/sheet"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "${src}/components/ui/dialog"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "${src}/components/ui/navigation-menu"
---
<html lang="en"><head><title>Responsive menus</title>${router ? "<ClientRouter />" : ""}
<style>body{min-height:150vh} [data-slot="dialog"][data-media]{display:none} @media(width < 64rem){[data-slot="dialog"][data-media]{display:block} nav{display:none}} [data-slot="dialog-content"]{background:white;padding:20px}</style>
</head><body>
<Sheet media="(width < 64rem)"><SheetTrigger>Menu</SheetTrigger><SheetContent><SheetTitle>Mobile navigation</SheetTitle><a href="#target">Inside sheet</a></SheetContent></Sheet>
<NavigationMenu media="(min-width:64rem)"><NavigationMenuList><NavigationMenuItem value="products"><NavigationMenuTrigger>Products</NavigationMenuTrigger><NavigationMenuContent><a href="#target">Product one</a></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>
${dialog ? "<Dialog><DialogTrigger>Search</DialogTrigger><DialogContent><DialogTitle>Search dialog</DialogTitle></DialogContent></Dialog>" : ""}
<a href="/router-two/">Next page</a><div id="target">Destination</div></body></html>`
let server
let origin
before(async () => {
  rmSync(root, { recursive: true, force: true })
  mkdirSync(join(root, "src/pages"), { recursive: true })
  writeFileSync(join(root, "src/pages/index.astro"), page(true))
  writeFileSync(join(root, "src/pages/pending.astro"), page(false))
  writeFileSync(join(root, "src/pages/router-one.astro"), page(true, true))
  writeFileSync(join(root, "src/pages/router-two.astro"), page(true, true))
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

for (const type of [chromium, firefox, webkit]) {
  test(`${type.name()} disposes and recreates after ClientRouter navigation`, async (t) => {
    const browser = await type.launch()
    t.after(() => browser.close())
    const page = await browser.newPage({
      viewport: { width: 390, height: 900 },
    })
    await page.goto(origin + "/router-one/")
    await page.getByRole("button", { name: "Menu", exact: true }).click()
    await page.getByRole("dialog", { name: "Mobile navigation" }).waitFor()
    await page.evaluate(() => {
      window.__menuSwap = false
      document.addEventListener(
        "astro:page-load",
        () => {
          window.__menuSwap = true
        },
        { once: true }
      )
      document.querySelector('a[href="/router-two/"]').click()
    })
    await page.waitForFunction(() => window.__menuSwap)
    assert.equal(await page.evaluate(() => document.body.style.overflow), "")
    await page.getByRole("button", { name: "Menu", exact: true }).click()
    await page.getByRole("dialog", { name: "Mobile navigation" }).waitFor()
    await page.keyboard.press("Escape")
    await page.getByRole("button", { name: "Search", exact: true }).click()
    await page.getByRole("dialog", { name: "Search dialog" }).waitFor()
  })

  test(`${type.name()} responsive controllers and portal cleanup`, async (t) => {
    const browser = await type.launch()
    t.after(() => browser.close())
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    })
    const errors = []
    page.on("pageerror", (e) => errors.push(e.message))
    await page.goto(origin)
    const sheet = page.locator('[data-slot="dialog"][data-media]')
    assert.equal(await sheet.getAttribute("data-state"), null)
    await page.getByRole("button", { name: "Search", exact: true }).click()
    await page
      .getByRole("dialog", { name: "Search dialog" })
      .waitFor({ state: "visible" })
    await page.keyboard.press("Escape")
    await page.setViewportSize({ width: 390, height: 900 })
    await page.getByRole("button", { name: "Menu", exact: true }).click()
    await page
      .getByRole("dialog", { name: "Mobile navigation" })
      .waitFor({ state: "visible" })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page
      .getByRole("dialog", { name: "Mobile navigation" })
      .waitFor({ state: "hidden" })
    assert.equal(await page.evaluate(() => document.body.style.overflow), "")
    await page.getByRole("button", { name: "Products", exact: true }).click()
    await page
      .getByRole("link", { name: "Product one" })
      .waitFor({ state: "visible" })
    await page.setViewportSize({ width: 390, height: 900 })
    await page
      .getByRole("link", { name: "Product one" })
      .waitFor({ state: "hidden" })
    await page.getByRole("button", { name: "Menu", exact: true }).click()
    await page
      .getByRole("dialog", { name: "Mobile navigation" })
      .waitFor({ state: "visible" })
    await page.keyboard.press("Escape")
    await page
      .getByRole("dialog", { name: "Mobile navigation" })
      .waitFor({ state: "hidden" })
    assert.deepEqual(errors, [])
  })

  for (const cancel of [false, true])
    test(`${type.name()} first click during import, exit=${cancel}`, async (t) => {
      const browser = await type.launch()
      t.after(() => browser.close())
      const page = await browser.newPage({
        viewport: { width: 390, height: 900 },
      })
      let release
      const delayed = new Promise((resolve) => {
        release = resolve
      })
      let intercepted
      const started = new Promise((resolve) => {
        intercepted = resolve
      })
      await page.route("**/*.js", async (route) => {
        const response = await route.fetch()
        const body = await response.text()
        if (body.includes("Dialog requires dialog-content slot")) {
          intercepted()
          await delayed
        }
        await route.fulfill({ response, body })
      })
      await page.goto(origin + "/pending/", { waitUntil: "domcontentloaded" })
      await started
      await page.getByRole("button", { name: "Menu", exact: true }).click()
      if (cancel) await page.setViewportSize({ width: 1440, height: 900 })
      release()
      if (cancel) {
        await page.waitForLoadState("networkidle")
        assert.equal(
          await page
            .locator('[data-slot="dialog-content"]:not([hidden])')
            .count(),
          0
        )
        await page.setViewportSize({ width: 390, height: 900 })
        await page.getByRole("button", { name: "Menu", exact: true }).click()
      }
      await page
        .getByRole("dialog", { name: "Mobile navigation" })
        .waitFor({ state: "visible" })
    })
}
