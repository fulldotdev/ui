// Run after astro build. Protect the framework switcher and real Liquid previews.
import assert from "node:assert/strict"
import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, resolve } from "node:path"
import { after, before, test } from "node:test"
import { chromium, firefox, webkit } from "playwright"

const root = resolve(process.env.DIST ?? "dist")
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
}
const server = createServer((request, response) => {
  const { pathname } = new URL(request.url, "http://localhost")
  let file = join(root, decodeURIComponent(pathname))
  if (existsSync(file) && statSync(file).isDirectory())
    file = join(file, "index.html")
  if (!file.startsWith(root) || !existsSync(file))
    return response.writeHead(404).end()
  response.writeHead(200, {
    "content-type": types[extname(file)] ?? "text/plain",
  })
  createReadStream(file).pipe(response)
})
let origin
before(async () => {
  await new Promise((done) => server.listen(0, "127.0.0.1", done))
  origin = `http://127.0.0.1:${server.address().port}`
})
after(() => server.close())

for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  test(`${name}: the framework choice keeps component, native usage, theme and remembered links`, async () => {
    const browser = await engine.launch()
    try {
      const page = await browser.newPage({
        viewport: { width: 1440, height: 1000 },
      })
      const errors = []
      page.on("pageerror", (error) => {
        // Chromium also emits this stackless CSS navigation abort on the
        // unchanged Astro Button -> Card flow. It is not an application error.
        if (
          error.name === "InvalidStateError" &&
          error.message ===
            "Transition was aborted because of invalid state. ViewTransition opt-in disabled" &&
          !error.stack
        )
          return
        errors.push(error.message)
      })
      await page.goto(`${origin}/components/button/`)
      await page
        .locator("aside [data-docs-switcher] [data-slot=dropdown-menu-trigger]")
        .click()
      await page.locator("[data-framework-choice=liquid]:visible").click()
      await page.waitForURL("**/liquid/components/button/")
      await page.waitForLoadState("networkidle")
      assert.equal(
        await page.evaluate(() => localStorage.getItem("fulldev-ui-framework")),
        "liquid"
      )
      const frame = page.frameLocator("iframe[data-liquid-preview]")
      await frame
        .getByRole("button", { name: "Outline", exact: true })
        .waitFor()
      await page.getByRole("tab", { name: "Usage", exact: true }).click()
      assert.match(
        await page.locator("[data-slot=live-code-panel]").textContent(),
        /render 'ui-button'/
      )
      await page
        .locator("aside")
        .getByRole("link", { name: "Card", exact: true })
        .click()
      await page.waitForURL("**/liquid/components/card/")
      await page.waitForLoadState("networkidle")
      await frame.getByRole("heading", { name: "Your collection" }).waitFor()
      assert.match(
        await frame
          .locator("[data-slot=card]")
          .evaluate((element) => getComputedStyle(element).borderRadius),
        /px$/
      )
      await page.evaluate(() => document.documentElement.classList.add("dark"))
      await page.waitForFunction(() =>
        document
          .querySelector("iframe[data-liquid-preview]")
          .contentDocument.documentElement.classList.contains("dark")
      )
      await page
        .locator("aside [data-docs-switcher] [data-slot=dropdown-menu-trigger]")
        .click()
      assert.equal(
        await page
          .locator("[data-framework-choice=astro]:visible")
          .getAttribute("href"),
        "/components/card/"
      )
      assert.match(
        await page
          .locator("[data-framework-choice=react]:visible")
          .getAttribute("href"),
        /ui.shadcn.com\/docs\/components\/base\/card/
      )
      await page.waitForFunction(() =>
        document
          .getAnimations()
          .every(
            (animation) =>
              animation.playState !== "running" ||
              animation.effect?.getTiming().iterations === Infinity
          )
      )
      await page.goto(`${origin}/components/resizable/`)
      await page.waitForLoadState("networkidle")
      assert.equal(
        await page
          .locator("aside [data-framework-choice=liquid]")
          .getAttribute("href"),
        "/liquid/components/"
      )
      await page.goto(`${origin}/`)
      await page.waitForLoadState("networkidle")
      assert.equal(
        await page
          .getByRole("link", { name: "Get started", exact: true })
          .first()
          .getAttribute("href"),
        "/liquid/docs/installation/"
      )
      await page.goto(`${origin}/create/`)
      assert.equal(
        await page.locator("select[data-create-framework]").inputValue(),
        "liquid"
      )
      assert(await page.locator("[data-framework-panel=liquid]").isVisible())
      assert.deepEqual(errors, [])
    } finally {
      await browser.close()
    }
  })
  test(`${name}: Liquid catalog, Markdown, mobile menu and interactive preview are native`, async () => {
    const browser = await engine.launch()
    try {
      const page = await browser.newPage({
        viewport: { width: 390, height: 844 },
      })
      await page.goto(`${origin}/liquid/components/`)
      assert.equal(
        await page
          .locator("main section a[href^='/liquid/components/']")
          .count(),
        58
      )
      await page.getByRole("button", { name: "Open menu", exact: true }).click()
      await page
        .locator(
          "[data-docs-menu-content] [data-docs-switcher] [data-slot=dropdown-menu-trigger]"
        )
        .click()
      assert(
        await page.locator("[data-framework-choice=liquid]:visible").isVisible()
      )
      await page.goto(`${origin}/liquid/components/select/`)
      const frame = page.frameLocator("iframe[data-liquid-preview]")
      await frame.getByRole("combobox").click()
      await frame.getByRole("option", { name: "Medium", exact: true }).click()
      assert.match(await frame.getByRole("combobox").textContent(), /Medium/)
      const markdown = await (
        await page.request.get(`${origin}/liquid/components/card.md`)
      ).text()
      assert.match(markdown, /```liquid[\s\S]*data-slot=['"]card-header['"]/)
      assert.doesNotMatch(markdown, /<Example|@fulldev\/|className=/)
      const llms = await (
        await page.request.get(`${origin}/liquid/llms.txt`)
      ).text()
      assert.match(llms, /\/liquid\/components\/button.md/)
      assert.doesNotMatch(llms, /\/react\/components\/|\/r\/styles\//)
    } finally {
      await browser.close()
    }
  })
}

test("every native preview loads its real installed styles and runtime without errors", async () => {
  const { readFile } = await import("node:fs/promises")
  const examples = JSON.parse(
    await readFile("liquid/examples/dependencies.json", "utf8")
  )
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    const errors = []
    page.on("pageerror", (error) =>
      errors.push(`${page.url()}: ${error.message}`)
    )
    page.on("console", (message) => {
      if (message.type() === "error")
        errors.push(`${page.url()}: ${message.text()}`)
    })
    for (const name of Object.keys(examples)) {
      await page.goto(`${origin}/preview/liquid/${name}.html`)
      await page.waitForLoadState("networkidle")
      assert(await page.locator("#example > *").count(), name)
    }
    assert.deepEqual(errors, [])
  } finally {
    await browser.close()
  }
})
