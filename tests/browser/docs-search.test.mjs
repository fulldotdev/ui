// Run after `vp run build`. The docs search renders its results from page data
// and a CommandItem template (src/components/docs-search.astro), so a change
// to CommandItem's markup can empty or mislabel the results without failing
// the build.
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

test("the docs search lists every page and opens a result", async (t) => {
  const browser = await chromium.launch()
  t.after(() => browser.close())
  const page = await browser.newPage()
  const errors = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto(`${origin}/docs/theming/`)

  const items = await page
    .locator("[data-search-dialog] [data-slot=command-item]")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        text: element.firstChild.textContent,
        label: element.dataset.label,
        href: element.getAttribute("href"),
        shortcut: element.querySelector("[data-slot=command-shortcut]")
          .textContent,
      }))
    )
  assert.ok(items.length > 50)
  for (const item of items) {
    assert.equal(item.text, item.label)
    assert.equal(item.shortcut, item.href)
  }
  assert.ok(items.some((item) => item.href === "/components/accordion/"))

  await page.getByRole("button", { name: "Search documentation" }).click()
  await page.locator("[data-slot=command-input]:visible").fill("accordion")
  // Before navigating: Chromium can abort the site's cross-document view
  // transition with a page error on any link.
  assert.deepEqual(errors, [])
  await page.keyboard.press("Enter")
  await page.waitForURL(`${origin}/components/accordion/`)
})

for (const type of [chromium, firefox, webkit])
  test(`${type.name()} search shortcut survives a pending dialog import`, async (t) => {
    const browser = await type.launch()
    t.after(() => browser.close())
    const page = await browser.newPage()
    const delay = await delayDialog(page)
    await page.goto(`${origin}/docs/theming/`, {
      waitUntil: "domcontentloaded",
    })
    await delay.started
    await page.keyboard.press(
      await page.evaluate(() =>
        /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent)
          ? "Meta+k"
          : "Control+k"
      )
    )
    delay.release()
    await page.locator("[data-slot=command-input]:visible").waitFor()
    assert.equal(
      await page
        .locator("[data-slot=command-input]:visible")
        .evaluate((input) => document.activeElement === input),
      true
    )
  })

for (const type of [chromium, webkit])
  test(`${type.name()} original search tap holds keyboard focus while loading`, async (t) => {
    const browser = await type.launch()
    t.after(() => browser.close())
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    })
    const delay = await delayDialog(page)
    await page.goto(`${origin}/docs/theming/`, {
      waitUntil: "domcontentloaded",
    })
    await delay.started
    await page.evaluate(() => {
      window.__searchGestures = []
      document.addEventListener("click", (event) => {
        if (
          event.target.closest(
            "[data-search-dialog] [data-slot=dialog-trigger]"
          )
        )
          window.__searchGestures.push({
            trusted: event.isTrusted,
            holder: document.activeElement?.matches(
              'input[aria-hidden="true"]'
            ),
          })
      })
    })
    await page.getByRole("button", { name: "Search documentation" }).tap()
    assert.deepEqual(await page.evaluate(() => window.__searchGestures), [
      { trusted: true, holder: true },
    ])
    delay.release()
    const input = page.locator("[data-slot=command-input]:visible")
    await input.waitFor()
    await page.waitForFunction(() =>
      document.activeElement?.matches("[data-slot=command-input]")
    )
    assert.deepEqual(await page.evaluate(() => window.__searchGestures), [
      { trusted: true, holder: true },
    ])
  })

async function delayDialog(page) {
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
    if (body.includes("Dialog requires dialog-content slot")) {
      intercepted()
      await pending
    }
    await route.fulfill({ response, body })
  })
  return { started, release }
}
