import assert from "node:assert/strict"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { after, before, test } from "node:test"
import { build, preview } from "astro"
import tailwindcss from "@tailwindcss/vite"
import { chromium, firefox, webkit } from "playwright"

const src = resolve("src")
const root = resolve("node_modules/.cache/responsive-menu-site")
const page = (dialog, router = false) => `---
import { ClientRouter } from "astro:transitions"
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "${src}/components/ui/sheet"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "${src}/components/ui/dialog"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "${src}/components/ui/navigation-menu"
import { SidebarProvider, Sidebar, SidebarTrigger } from "${src}/components/ui/sidebar"
---
<html lang="en"><head><title>Responsive menus</title>${router ? "<ClientRouter />" : ""}
<style>body{min-height:150vh} [data-slot="dialog"][data-media]{display:none} @media(width < 64rem){[data-slot="dialog"][data-media]{display:block} nav{display:none}} [data-slot="dialog-content"]{background:white;padding:20px}</style>
</head><body>
<Sheet media="(width < 64rem)"><SheetTrigger>Menu</SheetTrigger><SheetContent><SheetTitle>Mobile navigation</SheetTitle><a href="#target">Inside sheet</a></SheetContent></Sheet>
<NavigationMenu media="(min-width:64rem)"><NavigationMenuList><NavigationMenuItem value="products"><NavigationMenuTrigger>Products</NavigationMenuTrigger><NavigationMenuContent><a href="#target">Product one</a></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>
${dialog ? "<Dialog><DialogTrigger>Search</DialogTrigger><DialogContent><DialogTitle>Search dialog</DialogTitle></DialogContent></Dialog>" : ""}
<SidebarProvider><Sidebar><a href="#target">Sidebar link</a></Sidebar><SidebarTrigger /></SidebarProvider>
<a href="/router-two/">Next page</a><div id="target">Destination</div></body></html>`
const headerPage = (number, fold) => `---
import Header from "${src}/components/blocks/header-${number}.astro"
import "../header.css"
---
<html lang="en"><head><title>Header ${number} ${fold}</title></head><body>
<Header fold="${fold}" logo={{label:"Example",href:"/"}} navigation={[{label:"Products",href:"#products",links:[{label:"Product one",href:"#target"}]},{label:"About",href:"#about"}]} buttons={[{label:"Contact",href:"#contact"}]} navigationLabel="Primary" menu={{label:"Menu",title:"Mobile navigation",description:"All pages",closeLabel:"Close menu"}} />
<main id="target">Destination</main></body></html>`
let server
let origin
before(async () => {
  rmSync(root, { recursive: true, force: true })
  mkdirSync(join(root, "src/pages"), { recursive: true })
  writeFileSync(join(root, "src/pages/index.astro"), page(true))
  writeFileSync(join(root, "src/pages/pending.astro"), page(false))
  writeFileSync(join(root, "src/pages/router-one.astro"), page(true, true))
  writeFileSync(join(root, "src/pages/router-two.astro"), page(true, true))
  writeFileSync(
    join(root, "src/header.css"),
    `@import "tailwindcss"; @source "${src}/components"; body {min-height:150vh} button {min-width:32px;min-height:32px} [data-slot="dialog-content"] {position:fixed;top:0;right:0;background:white;padding:24px}`
  )
  for (let number = 1; number <= 5; number++)
    for (const fold of ["lg", "xl"])
      writeFileSync(
        join(root, `src/pages/header-${number}-${fold}.astro`),
        headerPage(number, fold)
      )
  const config = {
    root,
    configFile: false,
    logLevel: "error",
    vite: { plugins: [tailwindcss()], resolve: { alias: { "@": src } } },
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
  test(`${type.name()} actual headers use the selected fold for visibility and lifecycle`, async (t) => {
    const browser = await type.launch()
    t.after(() => browser.close())
    const page = await browser.newPage()
    const errors = []
    page.on("pageerror", (error) => errors.push(error.message))
    for (let number = 1; number <= 5; number++)
      for (const fold of ["lg", "xl"]) {
        const boundary = fold === "lg" ? 1024 : 1280
        await page.setViewportSize({ width: boundary - 1, height: 900 })
        await page.goto(`${origin}/header-${number}-${fold}/`)
        const navigation = page.locator('[data-slot="navigation-menu"]')
        const sheet = page.locator('[data-slot="dialog"][data-media]')
        const trigger = page.getByRole("button", { name: "Menu", exact: true })
        assert.equal(
          await navigation.isVisible(),
          false,
          `header ${number} ${fold}: mobile navigation`
        )
        assert.equal(await trigger.isVisible(), true)
        assert.equal(
          await sheet.getAttribute("data-media"),
          `(width < ${fold === "lg" ? 64 : 80}rem)`
        )
        await trigger.click()
        await page
          .getByRole("dialog", { name: "Mobile navigation", exact: true })
          .waitFor()
        await page.setViewportSize({ width: boundary, height: 900 })
        await page
          .getByRole("dialog", { name: "Mobile navigation", exact: true })
          .waitFor({ state: "hidden" })
        assert.equal(await trigger.isVisible(), false)
        assert.equal(await navigation.isVisible(), true)
        assert.equal(
          await page.evaluate(() => document.body.style.overflow),
          ""
        )
        if (number >= 4) {
          await navigation
            .getByRole("button", { name: "Products", exact: true })
            .click()
          await page
            .getByRole("link", { name: "Product one", exact: true })
            .waitFor()
        }
        await page.setViewportSize({ width: boundary - 1, height: 900 })
        if (number >= 4)
          await page
            .getByRole("link", { name: "Product one", exact: true })
            .waitFor({ state: "hidden" })
        assert.equal(await navigation.isVisible(), false)
        await trigger.click()
        await page
          .getByRole("dialog", { name: "Mobile navigation", exact: true })
          .waitFor()
        await page.keyboard.press("Escape")
        await page
          .getByRole("dialog", { name: "Mobile navigation", exact: true })
          .waitFor({ state: "hidden" })
      }
    assert.deepEqual(errors, [])
  })

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
      await page.evaluate(() => {
        window.__menuClicks = []
        document.addEventListener("click", (event) => {
          if (event.target.closest('[data-slot="dialog-trigger"]'))
            window.__menuClicks.push(event.isTrusted)
        })
      })
      await page.getByRole("button", { name: "Menu", exact: true }).click()
      assert.deepEqual(await page.evaluate(() => window.__menuClicks), [true])
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
      assert.ok((await page.evaluate(() => window.__menuClicks)).every(Boolean))
    })

  for (const action of ["open", "latest-close", "exit", "swap"])
    test(`${type.name()} pending programmatic navigation request: ${action}`, async (t) => {
      const browser = await type.launch()
      t.after(() => browser.close())
      const page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
      })
      let release
      const pending = new Promise((done) => {
        release = done
      })
      let intercepted
      const started = new Promise((done) => {
        intercepted = done
      })
      await page.route("**/*.js", async (route) => {
        const response = await route.fetch()
        const body = await response.text()
        if (body.includes("NavigationMenu requires")) {
          intercepted()
          await pending
        }
        await route.fulfill({ response, body })
      })
      await page.goto(origin + "/pending/", { waitUntil: "domcontentloaded" })
      await started
      await page.evaluate((close) => {
        document.addEventListener(
          "astro:page-load",
          () => {
            const root = document.querySelector('[data-slot="navigation-menu"]')
            root.dispatchEvent(
              new CustomEvent("navigation-menu:set", {
                detail: { value: "products" },
              })
            )
            if (close)
              root.dispatchEvent(
                new CustomEvent("navigation-menu:set", {
                  detail: { value: null },
                })
              )
          },
          { once: true }
        )
        document.dispatchEvent(new Event("astro:page-load"))
      }, action === "latest-close")
      if (action === "exit")
        await page.setViewportSize({ width: 390, height: 900 })
      if (action === "swap")
        await page.evaluate(() =>
          document.dispatchEvent(new Event("astro:before-swap"))
        )
      release()
      const link = page.getByRole("link", { name: "Product one", exact: true })
      if (action === "open") await link.waitFor()
      else {
        await page.waitForLoadState("networkidle")
        if (action === "exit")
          await page.setViewportSize({ width: 1440, height: 900 })
        if (action === "swap")
          await page.evaluate(() =>
            document.dispatchEvent(new Event("astro:page-load"))
          )
        await page.waitForLoadState("networkidle")
        assert.equal(await link.isVisible(), false)
        await page
          .getByRole("button", { name: "Products", exact: true })
          .click()
        await link.waitFor()
      }
    })

  for (const action of ["sidebar", "page-load", "exit"])
    test(`${type.name()} pending programmatic dialog request: ${action}`, async (t) => {
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
      if (action === "sidebar")
        await page
          .getByRole("button", { name: "Toggle Sidebar", exact: true })
          .click()
      else
        await page.evaluate(() => {
          document.addEventListener(
            "astro:page-load",
            () => {
              document
                .querySelector('[data-slot="dialog"][data-media]')
                .dispatchEvent(
                  new CustomEvent("dialog:set", { detail: { open: true } })
                )
            },
            { once: true }
          )
          document.dispatchEvent(new Event("astro:page-load"))
        })
      if (action === "exit")
        await page.setViewportSize({ width: 1440, height: 900 })
      release()
      if (action === "exit") {
        await page.waitForLoadState("networkidle")
        await page.setViewportSize({ width: 390, height: 900 })
        await page.waitForLoadState("networkidle")
        assert.equal(
          await page.getByRole("dialog", { name: "Mobile navigation" }).count(),
          0
        )
      } else {
        const name = action === "sidebar" ? "Sidebar" : "Mobile navigation"
        await page.getByRole("dialog", { name, exact: true }).waitFor()
        await page.keyboard.press("Escape")
        if (action === "sidebar")
          assert.equal(
            await page
              .locator('[data-slot="sidebar-wrapper"]')
              .getAttribute("data-open-mobile"),
            "false"
          )
      }
    })
}
