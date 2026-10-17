import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { after, before, test } from "node:test"
import { fixtureServer, install, registryServer } from "#liquid-fixture"
import { chromium, firefox, webkit } from "playwright"

let theme, server
before(async () => {
  theme = await mkdtemp(resolve(tmpdir(), "fulldev-liquid-regressions-"))
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

for (const [name, type] of Object.entries({ chromium, firefox, webkit })) {
  test(`Liquid ${name}: portable breakpoints and translated dynamic slides`, async () => {
    const browser = await type.launch()
    try {
      const page = await browser.newPage()
      await page.goto(server.origin)
      await page.locator('[data-slot="carousel"][data-enhanced]').waitFor()
      await page.evaluate(() => {
        const container = document.createElement("div")
        container.id = "responsive-regression"
        container.innerHTML = `
          <h2 class="hero-title">Split headline</h2>
          <h2 class="display-title">Centered headline</h2>
          <h2 data-slot="section-title">Section headline</h2>
          <div class="field-row"><div data-slot="field">Name</div><div data-slot="field">Email</div></div>
          <input data-slot="input" aria-label="Responsive field">
          <div data-slot="empty">Empty state</div>`
        document.body.append(container)
      })
      for (const width of [390, 639, 640, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 })
        const styles = await page
          .locator("#responsive-regression")
          .evaluate((root) => {
            const style = (selector) =>
              getComputedStyle(root.querySelector(selector))
            return {
              hero: style(".hero-title").fontSize,
              display: style(".display-title").fontSize,
              title: style('[data-slot="section-title"]').fontSize,
              columns:
                style(".field-row").gridTemplateColumns.split(" ").length,
              input: style("input").fontSize,
              empty: style('[data-slot="empty"]').padding,
            }
          })
        assert.equal(styles.hero, width < 640 ? "36px" : "48px")
        assert.equal(
          styles.display,
          width < 640 ? "36px" : width < 1024 ? "48px" : "60px"
        )
        assert.equal(styles.title, width < 640 ? "30px" : "36px")
        assert.equal(styles.columns, width < 640 ? 1 : 2)
        assert.equal(styles.input, width < 768 ? "16px" : "14px")
        assert.equal(styles.empty, width < 640 ? "32px 16px" : "48px")
      }
      const carousel = page.locator('[data-slot="carousel"]')
      // Exercise the adapter directly on an isolated root; the lifecycle does not observe shadow trees.
      await carousel.evaluate(async (source, moduleURL) => {
        const host = document.createElement("div")
        host.id = "carousel-regression"
        document.body.append(host)
        const shadow = host.attachShadow({ mode: "open" })
        const root = source.cloneNode(true)
        root.removeAttribute("data-enhanced")
        root.setAttribute("aria-roledescription", "Carrousel")
        root.dataset.slideLabel = "Dia [index] van [total]"
        const content = root.querySelector('[data-slot="carousel-content"]')
        content.style.cssText = "display:flex;width:300px;overflow:auto"
        for (const item of content.children) {
          item.style.cssText = "flex:0 0 300px"
          item.setAttribute("aria-roledescription", "Dia")
        }
        shadow.append(root)
        const { initializeCarousel } = await import(moduleURL)
        window.carouselRegression = {
          root,
          controller: initializeCarousel(root),
        }
      }, "/assets/ui-carousel.js")
      const readSlides = () =>
        page.evaluate(() => {
          const { root, controller } = window.carouselRegression
          return {
            description: root.getAttribute("aria-roledescription"),
            count: controller.count,
            slides: [
              ...root.querySelector('[data-slot="carousel-content"]').children,
            ].map((item) => ({
              description: item.getAttribute("aria-roledescription"),
              label: item.getAttribute("aria-label"),
            })),
          }
        })
      assert.equal((await readSlides()).count, 3)
      await page.evaluate(() => {
        const { root } = window.carouselRegression
        const item = document.createElement("div")
        item.dataset.slot = "carousel-item"
        item.style.cssText = "flex:0 0 300px"
        item.setAttribute("aria-roledescription", "Paneel")
        root.querySelector('[data-slot="carousel-content"]').append(item)
      })
      assert.deepEqual(await readSlides(), {
        description: "Carrousel",
        count: 4,
        slides: ["Dia", "Dia", "Dia", "Paneel"].map((description, index) => ({
          description,
          label: `Dia ${index + 1} van 4`,
        })),
      })
      await page.evaluate(() =>
        window.carouselRegression.root
          .querySelector('[data-slot="carousel-content"]')
          .firstElementChild.remove()
      )
      assert.deepEqual(
        (await readSlides()).slides.map((slide) => slide.label),
        ["Dia 1 van 3", "Dia 2 van 3", "Dia 3 van 3"]
      )
      await page.evaluate(() => {
        const { root, controller } = window.carouselRegression
        const content = root.querySelector('[data-slot="carousel-content"]')
        const item = content.firstElementChild.cloneNode(true)
        content.append(item)
        queueMicrotask(() => {
          controller.destroy()
          item.setAttribute("aria-label", "After destroy")
        })
      })
      assert.equal((await readSlides()).slides.at(-1).label, "After destroy")
      await page.evaluate(() => {
        const content = window.carouselRegression.root.querySelector(
          '[data-slot="carousel-content"]'
        )
        const item = document.createElement("div")
        item.dataset.slot = "carousel-item"
        content.append(item)
      })
      assert.equal((await readSlides()).slides.at(-1).label, null)
    } finally {
      await browser.close()
    }
  })
}
