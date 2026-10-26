import assert from "node:assert/strict"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { after, before, test } from "node:test"
import { build, preview } from "astro"
import tailwindcss from "@tailwindcss/vite"
import { chromium, firefox, webkit } from "playwright"

const src = resolve("src")
const root = resolve("node_modules/.cache/responsive-menu-site")
const page = (router = false) => `---
import { ClientRouter } from "astro:transitions"
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "${src}/components/ui/sheet"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "${src}/components/ui/dialog"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "${src}/components/ui/navigation-menu"
import { SidebarProvider, Sidebar, SidebarTrigger } from "${src}/components/ui/sidebar"
---
<html lang="en"><head><title>Responsive menus</title>${router ? "<ClientRouter />" : ""}
<style>body{min-height:150vh} [data-slot="dialog-content"]{background:white;padding:20px}</style>
</head><body>
<Sheet><SheetTrigger>Menu</SheetTrigger><SheetContent><SheetTitle>Mobile navigation</SheetTitle><a href="#target">Inside sheet</a></SheetContent></Sheet>
<NavigationMenu><NavigationMenuList><NavigationMenuItem value="products"><NavigationMenuTrigger>Products</NavigationMenuTrigger><NavigationMenuContent><a href="#target">Product one</a></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>
<Dialog><DialogTrigger>Search</DialogTrigger><DialogContent><DialogTitle>Search dialog</DialogTitle></DialogContent></Dialog>
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
  writeFileSync(join(root, "src/pages/router-one.astro"), page(true))
  writeFileSync(join(root, "src/pages/router-two.astro"), page(true))
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
        const trigger = page.getByRole("button", { name: "Menu", exact: true })
        assert.equal(
          await navigation.isVisible(),
          false,
          `header ${number} ${fold}: mobile navigation`
        )
        assert.equal(await trigger.isVisible(), true)
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
        await trigger.waitFor({ state: "visible" })
        await trigger.focus()
        assert.equal(
          await trigger.evaluate(
            (element) => element === document.activeElement
          ),
          true,
          `header ${number} ${fold}: keyboard trigger focus`
        )
        await trigger.press("Enter")
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

  test(`${type.name()} applies a site's page-load command after ClientRouter navigation`, async (t) => {
    const browser = await type.launch()
    t.after(() => browser.close())
    const page = await browser.newPage({
      viewport: { width: 390, height: 900 },
    })
    // Registered before any component script, as a site's own listener is.
    await page.addInitScript(() => {
      document.addEventListener("astro:page-load", () => {
        if (!window.__openSheet) return
        window.__openSheet = false
        document
          .querySelector('[data-slot="dialog"]')
          .dispatchEvent(
            new CustomEvent("dialog:set", { detail: { open: true } })
          )
      })
    })
    await page.goto(origin + "/router-one/")
    await page.evaluate(() => {
      window.__openSheet = true
      document.querySelector('a[href="/router-two/"]').click()
    })
    await page.waitForURL("**/router-two/")
    await page.getByRole("dialog", { name: "Mobile navigation" }).waitFor()
  })
}
