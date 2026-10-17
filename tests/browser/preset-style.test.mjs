// Run after `vp run build`. The docs hold every class string once, in Vega,
// and switch it in place to the style of the visitor's preset
// (src/lib/styles.ts). Checks that a stored style reaches the previews and the
// docs, that switching in place gives the page a fresh load gives, and that
// switching back restores Vega.
import assert from "node:assert/strict"
import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, resolve } from "node:path"
import { after, before, test } from "node:test"
import { chromium } from "playwright"

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

const path = "/components/button/"

// The classes of every element, in document order. The switcher's check marks
// follow the stored preset, not the style.
const snapshot = (page) =>
  page.evaluate(() =>
    [...document.body.querySelectorAll("*:not(script, [data-preset-check])")]
      .filter((element) => !element.closest("pre"))
      .map((element) => [...element.classList].sort().join(" "))
  )

// Lyra buttons are square, Vega buttons are rounded.
const radius = (page, selector) =>
  page
    .locator(selector)
    .first()
    .evaluate((element) => getComputedStyle(element).borderTopLeftRadius)
const preview = "[data-value=preview] [data-slot=button]"
const sidebar = "[data-docs-sidebar] [data-slot=button]"

test("the docs follow the preset's style, also when it changes", async (t) => {
  const browser = await chromium.launch()
  t.after(() => browser.close())
  const open = async (preset) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    })
    t.after(() => context.close())
    if (preset)
      await context.addInitScript((value) => {
        localStorage.setItem("fulldev-ui-preset", JSON.stringify(value))
      }, preset)
    const page = await context.newPage()
    const errors = []
    page.on("pageerror", (error) => errors.push(error.message))
    await page.goto(origin + path, { waitUntil: "load" })
    return { page, errors }
  }

  const { page, errors } = await open()
  assert.notEqual(await radius(page, preview), "0px")
  const vega = await snapshot(page)

  // The docs default preset in Lyra.
  const [fulldev] = await page
    .locator("[data-docs-switcher]")
    .evaluate((element) => JSON.parse(element.dataset.presets))
  const stored = await open({
    ...fulldev.preset,
    config: { ...fulldev.preset.config, style: "lyra" },
  })
  assert.equal(await radius(stored.page, preview), "0px")
  assert.equal(await radius(stored.page, sidebar), "0px")
  const fresh = await snapshot(stored.page)
  assert.notDeepEqual(vega, fresh)

  await page.evaluate(() => window.applySiteStyle("lyra"))
  assert.deepEqual(await snapshot(page), fresh)
  await page.evaluate(() => window.applySiteStyle("vega"))
  assert.deepEqual(await snapshot(page), vega)
  assert.deepEqual([...stored.errors, ...errors], [])
})
