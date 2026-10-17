import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { after, before, test } from "node:test"
import { fixtureServer, install, registryServer } from "#liquid-fixture"
import { chromium, firefox, webkit } from "playwright"

let theme, server
before(async () => {
  theme = await mkdtemp(resolve(tmpdir(), "fulldev-liquid-browser-"))
  const registry = await registryServer()
  try {
    await install(registry.origin, theme)
  } finally {
    await registry.close()
  }
  server = await fixtureServer(theme)
})
after(async () => {
  await server?.close()
  if (theme) await rm(theme, { recursive: true, force: true })
})
const slot = (name) => `[data-slot="${name}"]`
const controllers = [
  "accordion",
  "select",
  "radio-group",
  "switch",
  "slider",
  "alert-dialog",
  "toggle",
  "toggle-group",
  "tabs",
  "collapsible",
  "popover",
  "hover-card",
  "tooltip",
  "dropdown-menu",
  "drawer",
  "toast",
  "dialog",
  "combobox",
  "command",
  "carousel",
  "navigation-menu",
]

for (const [name, type] of Object.entries({ chromium, firefox, webkit })) {
  test(`Liquid ${name}: all controllers, forms, overlays and editor lifecycle`, async () => {
    const browser = await type.launch()
    const page = await browser.newPage()
    const errors = []
    page.on("pageerror", (error) => errors.push(error.message))
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text())
    })
    try {
      await page.goto(server.origin)
      for (const component of controllers)
        await page
          .locator(`${slot(component)}[data-enhanced]`)
          .first()
          .waitFor({ state: "attached" })
      assert.deepEqual(errors, [])
      assert.equal(
        await page
          .getByRole("button", { name: "<Escaped label>", exact: true })
          .count(),
        1
      )
      const button = page.getByRole("button", {
        name: "<Escaped label>",
        exact: true,
      })
      assert.equal(await button.evaluate((el) => el.children.length), 0)
      for (const width of [390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 })
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
          ),
          `${name}: overflow at ${width}`
        )
      }
      await page.locator(slot("tabs-trigger")).nth(1).click()
      assert.equal(
        await page
          .locator(slot("tabs-trigger"))
          .nth(1)
          .getAttribute("aria-selected"),
        "true"
      )
      await page.locator(slot("accordion-trigger")).first().click()
      assert.equal(
        await page
          .locator(slot("accordion-trigger"))
          .first()
          .getAttribute("aria-expanded"),
        "false"
      )
      await page
        .locator(slot("accordion-item"))
        .first()
        .evaluate((item) => {
          item.dispatchEvent(
            new CustomEvent("shopify:block:select", { bubbles: true })
          )
        })
      await page.waitForFunction(
        () =>
          document
            .querySelector('[data-slot="accordion-trigger"]')
            .getAttribute("aria-expanded") === "true"
      )
      await page.locator(slot("toggle")).first().click()
      assert.equal(
        await page.locator(slot("toggle")).first().getAttribute("aria-pressed"),
        "true"
      )
      await page.locator(slot("select-trigger")).click()
      await page.locator(`${slot("select-item")}[data-value="medium"]`).click()
      await page
        .locator(`${slot("radio-group-item")}[data-value="express"]`)
        .click()
      await page.locator(slot("switch")).click()
      await page.locator(slot("toggle-group-item")).last().click()
      assert.equal(
        await page
          .locator(slot("toggle-group-item"))
          .last()
          .getAttribute("aria-pressed"),
        "true"
      )
      await page.locator(slot("slider-thumb")).first().focus()
      await page.keyboard.press("ArrowRight")
      assert.equal(
        await page.locator('input[name="range_min"]').inputValue(),
        "25"
      )
      const values = await page
        .locator("#ui-reference-form")
        .evaluate((form) => Object.fromEntries(new FormData(form)))
      assert.equal(values.size, "medium")
      assert.equal(values.delivery, "express")
      assert.equal(values.updates, "yes")
      await page.locator(slot("dialog-trigger")).focus()
      await page.keyboard.press("Enter")
      await page.locator(slot("dialog-content")).waitFor({ state: "visible" })
      await page.keyboard.press("Escape")
      await page.locator(slot("dialog-content")).waitFor({ state: "hidden" })
      await page.waitForFunction(
        () =>
          document.querySelector('[data-slot="dialog-trigger"]') ===
          document.activeElement
      )
      for (const component of ["popover", "dropdown-menu", "drawer"]) {
        await page.locator(slot(`${component}-trigger`)).click()
        const part =
          component === "drawer" ? "drawer-popup" : `${component}-content`
        await page.locator(slot(part)).waitFor({ state: "visible" })
        await page.keyboard.press("Escape")
        await page.locator(slot(part)).waitFor({ state: "hidden" })
      }
      await page.locator("[data-toast-title]").click()
      await page.locator(slot("toast-item")).waitFor({ state: "visible" })
      await page.locator(slot("toast-close")).click()
      await page.locator(slot("toast-item")).waitFor({ state: "detached" })
      await page.locator(slot("combobox-input")).fill("Belg")
      await page.locator(`${slot("combobox-item")}[data-value="be"]`).click()
      assert.equal(
        await page.locator(slot("combobox-input")).inputValue(),
        "Belgium"
      )
      await page.locator(slot("command-input")).fill("Second")
      await page
        .locator('[data-slot="command-item"][href="/one"]')
        .waitFor({ state: "hidden" })
      await page.locator(slot("carousel-next")).click()
      await page.waitForFunction(
        () =>
          document.querySelector('[data-slot="carousel-content"]').scrollLeft >
          0
      )
      await page
        .locator(slot("carousel-item"))
        .first()
        .evaluate((slide) => {
          slide.dispatchEvent(
            new CustomEvent("shopify:block:select", { bubbles: true })
          )
        })
      await page.waitForFunction(
        () =>
          document.querySelector('[data-slot="carousel-content"]')
            .scrollLeft === 0
      )
      await page.locator(slot("navigation-menu-trigger")).click()
      assert.equal(
        await page
          .locator(slot("navigation-menu-trigger"))
          .getAttribute("aria-expanded"),
        "true"
      )
      await page.keyboard.press("Escape")
      for (const component of ["hover-card", "tooltip"]) {
        await page.locator(slot(`${component}-trigger`)).hover()
        await page
          .locator(slot(`${component}-content`))
          .waitFor({ state: "visible" })
        await page.locator("h1").hover()
        await page
          .locator(slot(`${component}-content`))
          .waitFor({ state: "hidden" })
      }
      await page.locator("[data-motion-pause]").click()
      assert.equal(
        await page.locator("[data-motion-pause]").getAttribute("aria-pressed"),
        "true"
      )
      await page.emulateMedia({ reducedMotion: "reduce" })
      await page.locator("[data-motion-pause]").waitFor({ state: "hidden" })
      await page.emulateMedia({ reducedMotion: "no-preference" })
      await page.locator(slot("alert-dialog-trigger")).click()
      await page.locator(slot("alert-dialog-action")).click()
      await page
        .locator(slot("alert-dialog-content"))
        .waitFor({ state: "hidden" })
      await page.waitForFunction(
        () =>
          new FormData(document.querySelector("#ui-reference-form")).get(
            "delivery"
          ) === "standard"
      )
      // Unload restores native fields with their labels and current state. Load starts once.
      await page.evaluate(() => {
        const section = document
          .querySelector("#ui-reference-form")
          .closest("section")
        section.dispatchEvent(
          new CustomEvent("shopify:section:unload", { bubbles: true })
        )
      })
      assert(await page.locator("select[data-fallback]").isVisible())
      assert.equal(
        await page.locator(slot("select")).getAttribute("hidden"),
        ""
      )
      await page.evaluate(() => {
        const section = document
          .querySelector("#ui-reference-form")
          .closest("section")
        section.dispatchEvent(
          new CustomEvent("shopify:section:load", { bubbles: true })
        )
        section.dispatchEvent(
          new CustomEvent("shopify:section:load", { bubbles: true })
        )
      })
      await page
        .locator(`${slot("select")}[data-enhanced]`)
        .waitFor({ state: "attached" })
      assert.equal(await page.locator("#ui-reference-size").count(), 1)
      await page.evaluate(() => {
        const root = document.createElement("div")
        root.innerHTML =
          '<button data-slot="toggle" type="button">Inserted</button>'
        root.id = "inserted"
        document.body.append(root)
      })
      await page
        .locator("#inserted [data-enhanced]")
        .waitFor({ state: "attached" })
      await page.getByRole("button", { name: "Inserted", exact: true }).click()
      assert.equal(
        await page
          .getByRole("button", { name: "Inserted", exact: true })
          .getAttribute("aria-pressed"),
        "true"
      )
      await page.evaluate(() => document.querySelector("#inserted").remove())
      assert.deepEqual(errors, [])
    } finally {
      await browser.close()
    }
  })
}

test("Liquid without JavaScript keeps native controls and readable content", async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  })
  try {
    await page.goto(server.origin)
    assert(await page.locator("select[data-fallback]").isVisible())
    assert(await page.locator(slot("select")).isHidden())
    assert(await page.locator(slot("tabs-content")).nth(1).isVisible())
    assert(await page.locator(slot("collapsible-content")).isVisible())
    await page.locator("select[data-fallback]").selectOption("large")
    assert.equal(
      await page
        .locator("#ui-reference-form")
        .evaluate((form) => new FormData(form).get("size")),
      "large"
    )
  } finally {
    await browser.close()
  }
})
