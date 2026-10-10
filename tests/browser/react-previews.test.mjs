// Checks the React previews in the built docs in Chromium: the theme stays in
// step between a docs page and its preview frames, and a header's mobile menu
// fits its frame. Run after `vp run build` with `vp run test:browser`; DIST
// picks another build folder.
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
  const { pathname } = new URL(request.url ?? "/", "http://localhost")
  let file = join(root, decodeURIComponent(pathname))
  if (existsSync(file) && statSync(file).isDirectory())
    file = join(file, "index.html")
  if (!file.startsWith(root) || !existsSync(file)) {
    response.writeHead(404)
    response.end()
    return
  }
  response.writeHead(200, {
    "content-type": types[extname(file)] ?? "application/octet-stream",
  })
  createReadStream(file).pipe(response)
})

let browser
let origin
before(async () => {
  await new Promise((done) => server.listen(0, "127.0.0.1", done))
  origin = `http://127.0.0.1:${server.address().port}`
  browser = await chromium.launch()
})
after(async () => {
  await browser?.close()
  server.close()
})

// The loaded preview frames that show a theme toggle.
const toggles = () =>
  Array.from({ length: frames.length }, (_, index) => frames[index]).filter(
    (frame) => frame.document.querySelector("[data-slot=theme-toggle]")
  )
const preview = async (page) => {
  await page.waitForFunction(
    (toggles) => new Function(`return (${toggles})()`)().length > 0,
    toggles.toString()
  )
  return page.frames().find((frame) => frame.url().includes("/preview/react/"))
}
const dark = (frame) =>
  frame.evaluate(() => document.documentElement.classList.contains("dark"))
const aligned = async (page, frame, expected) => {
  await page.waitForFunction(
    ([expected, toggles]) =>
      document.documentElement.classList.contains("dark") === expected &&
      new Function(`return (${toggles})()`)().every(
        (frame) =>
          frame.document.documentElement.classList.contains("dark") === expected
      ),
    [expected, toggles.toString()]
  )
  assert.equal(await dark(page.mainFrame()), expected)
  assert.equal(await dark(frame), expected)
}

test("the docs and the React previews keep the same theme", async () => {
  const context = await browser.newContext({ colorScheme: "dark" })
  // Count theme writes in the docs and every frame, to catch a feedback loop.
  await context.addInitScript(() => {
    const setItem = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (key === "theme")
        localStorage.setItem.call(
          this,
          "theme-writes",
          String(Number(localStorage.getItem("theme-writes") ?? 0) + 1)
        )
      return setItem.call(this, key, value)
    }
  })
  const page = await context.newPage()
  await page.goto(`${origin}/react/components/theme-toggle/`)
  const writes = () =>
    page.evaluate(() => Number(localStorage.getItem("theme-writes") ?? 0))

  const stored = () => page.evaluate(() => localStorage.getItem("theme"))

  // No choice yet: both follow the system, also when it changes, and the
  // docs save no choice for it.
  let frame = await preview(page)
  await aligned(page, frame, true)
  await page.emulateMedia({ colorScheme: "light" })
  await aligned(page, frame, false)
  await page.emulateMedia({ colorScheme: "dark" })
  await aligned(page, frame, true)
  assert.equal(await stored(), null)

  // Returning to the system, from another window or through the docs'
  // __setTheme, makes both follow the system again, and no explicit theme
  // is stored. next-themes in the preview stores its default, "system", for
  // a removed choice.
  const sibling = await context.newPage()
  await sibling.goto(`${origin}/`)
  const resets = {
    "another window removes the choice": () =>
      sibling.evaluate(() => localStorage.removeItem("theme")),
    'another window sets "system"': () =>
      sibling.evaluate(() => localStorage.setItem("theme", "system")),
    "another window clears the storage": () =>
      sibling.evaluate(() => localStorage.clear()),
    '__setTheme("system")': () =>
      page.evaluate(() => window.__setTheme("system")),
  }
  for (const [reset, run] of Object.entries(resets)) {
    // A documented caller of __setTheme saves a choice.
    await page.evaluate(() => window.__setTheme("light"))
    await aligned(page, frame, false)
    assert.equal(await stored(), "light", reset)
    await run()
    await aligned(page, frame, true)
    await page.emulateMedia({ colorScheme: "light" })
    await aligned(page, frame, false)
    await page.emulateMedia({ colorScheme: "dark" })
    await aligned(page, frame, true)
    assert.ok([null, "system"].includes(await stored()), reset)
  }
  // Clearing session storage keeps the choice. Its storage events only
  // reach the frames of the same tab, so the preview clears it for the docs
  // and the docs clear it for the preview.
  await page.evaluate(() => window.__setTheme("light"))
  await aligned(page, frame, false)
  for (const window of [frame, page]) {
    await window.evaluate(() => {
      sessionStorage.setItem("unrelated", "1")
      sessionStorage.clear()
    })
    await page.waitForTimeout(300)
    await aligned(page, frame, false)
    assert.equal(await stored(), "light")
  }
  await page.evaluate(() => window.__setTheme("dark"))
  await aligned(page, frame, true)
  assert.equal(await stored(), "dark")
  await sibling.close()

  // A toggle in the preview reaches the docs.
  await frame.locator("[data-slot=theme-toggle]").first().click()
  await aligned(page, frame, false)
  assert.equal(
    await page.evaluate(() => localStorage.getItem("theme")),
    "light"
  )

  // A toggle in the docs reaches the preview.
  await page.locator("[data-theme-toggle]").first().click()
  await aligned(page, frame, true)
  assert.equal(await page.evaluate(() => localStorage.getItem("theme")), "dark")

  // The writes settle instead of bouncing between the windows.
  const settled = await writes()
  await page.waitForTimeout(1000)
  assert.equal(await writes(), settled)
  await aligned(page, frame, true)

  // An explicit choice outlasts system changes and a reload.
  await frame.locator("[data-slot=theme-toggle]").first().click()
  await aligned(page, frame, false)
  for (const colorScheme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme })
    await page.waitForTimeout(300)
    await aligned(page, frame, false)
    assert.equal(await stored(), "light", colorScheme)
  }
  await page.reload()
  frame = await preview(page)
  await aligned(page, frame, false)
  assert.equal(await stored(), "light")
  await context.close()
})

test("a header's mobile menu fits its preview frame", async () => {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
  })
  await page.goto(`${origin}/react/blocks/header/`)
  const elements = await page.locator("iframe[data-react-preview]").all()
  assert.equal(elements.length, 5)
  for (const element of elements) {
    await element.scrollIntoViewIfNeeded()
    const frame = await (await element.elementHandle()).contentFrame()
    const name = await element.getAttribute("data-react-preview")
    await frame.getByRole("button", { name: "Open menu" }).click()
    const sheet = frame.locator("[data-slot=sheet-content]")
    await sheet.waitFor()
    await page.waitForTimeout(500)
    // Measured inside the frame: the menu and every link in it are within
    // the frame's viewport, and the menu content is not cut off.
    const box = await sheet.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      return {
        top: rect.top,
        bottom: rect.bottom,
        scroll: element.scrollHeight,
        client: element.clientHeight,
        viewport: innerHeight,
        links: [...element.querySelectorAll("a")].map((link) => ({
          label: link.textContent,
          bottom: link.getBoundingClientRect().bottom,
        })),
      }
    })
    const details = `${name}: ${JSON.stringify(box)}`
    assert.ok(box.top >= 0 && box.bottom <= box.viewport, details)
    assert.ok(box.scroll <= box.client, `menu content clipped in ${details}`)
    assert.ok(box.links.length > 0, details)
    for (const link of box.links)
      assert.ok(link.bottom <= box.viewport, details)
  }
  await page.close()
})
