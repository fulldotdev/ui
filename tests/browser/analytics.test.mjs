import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { stripTypeScriptTypes } from "node:module"
import { test } from "node:test"
import { gunzipSync } from "node:zlib"
import { chromium, firefox, webkit } from "playwright"

const origin = "https://analytics.example"
const key = "phc_test_cookieless"
const source =
  stripTypeScriptTypes(
    readFileSync(new URL("../../src/lib/analytics.ts", import.meta.url), "utf8")
      .replace('"posthog-js/dist/module.slim.no-external"', '"/sdk.js"')
      .replace('"./analytics-privacy.js"', '"/privacy.js"')
      .replace(/"phc_\w+"/, JSON.stringify(key))
      .replace("posthog.init(", "window.__posthog = posthog\n  posthog.init("),
    { mode: "strip" }
  ) + "\nstartAnalytics()"
const sdk = readFileSync(
  new URL(import.meta.resolve("posthog-js/dist/module.slim.no-external.js")),
  "utf8"
)
const privacy = readFileSync(
  new URL("../../src/lib/analytics-privacy.js", import.meta.url),
  "utf8"
)

for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  test(`${name}: statistics preserve existing cookies and exclude private data`, async () => {
    const browser = await engine.launch()
    try {
      for (const choice of ["fresh", "accepted", "rejected"]) {
        const context = await browser.newContext({
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        })
        try {
          const page = await context.newPage()
          const requests = []
          const errors = []
          page.on("pageerror", (error) => errors.push(error.message))
          if (choice !== "fresh")
            await context.addCookies([
              {
                name: `ph_${key}_posthog`,
                value: JSON.stringify({
                  distinct_id: "private-account",
                  $user_id: "private-account",
                }),
                domain: ".analytics.example",
                path: "/",
              },
              {
                name: `__ph_opt_in_out_${key}`,
                value: choice === "accepted" ? "1" : "0",
                domain: ".analytics.example",
                path: "/",
              },
              {
                name: "li_fat_id",
                value: "private-ad-cookie",
                domain: ".analytics.example",
                path: "/",
              },
            ])
          const initialCookies = await context.cookies()
          await page.addInitScript(
            ({ choice, key }) => {
              Object.defineProperty(navigator, "webdriver", {
                get: () => false,
              })
              Object.defineProperty(navigator, "userAgentData", {
                get: () => undefined,
              })
              if (choice !== "fresh")
                localStorage.setItem(
                  `ph_${key}_posthog`,
                  JSON.stringify({ distinct_id: "private-account" })
                )
              window.__writes = []
              const setItem = Storage.prototype.setItem
              Storage.prototype.setItem = function (...args) {
                window.__writes.push(args[0])
                return setItem.apply(this, args)
              }
            },
            { choice, key }
          )
          // Every request is fulfilled locally. No test events reach PostHog.
          await page.route("**/*", async (route) => {
            const request = route.request()
            const url = new URL(request.url())
            if (request.method() === "POST") {
              const body = request.postDataBuffer()
              const payload = JSON.parse(
                body[0] === 31 ? gunzipSync(body).toString() : body.toString()
              )
              requests.push({
                headers: await request.allHeaders(),
                events: Array.isArray(payload)
                  ? payload
                  : (payload.batch ?? [payload]),
              })
              return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: '{"status":1}',
              })
            }
            if (url.pathname === "/sdk.js")
              return route.fulfill({
                contentType: "text/javascript",
                body: sdk,
              })
            if (url.pathname === "/privacy.js")
              return route.fulfill({
                contentType: "text/javascript",
                body: privacy,
              })
            if (url.pathname === "/analytics.js")
              return route.fulfill({
                contentType: "text/javascript",
                body: source,
              })
            if (url.origin === origin && url.pathname === "/")
              return route.fulfill({
                contentType: "text/html",
                body: '<!doctype html><input><button>Click</button><script type="module" src="/analytics.js"></script>',
              })
            return route.abort()
          })
          await page.goto(
            `${origin}/?token=private-query&gclid=private-google&fbclid=private-meta&li_fat_id=private-linkedin#private-fragment`,
            {
              referer:
                "https://www.google.com/search?q=private-search%40example.com",
            }
          )
          await page.waitForFunction(
            () =>
              performance
                .getEntriesByType("resource")
                .some((entry) => entry.name.includes("eu.i.posthog.com")),
            null,
            { timeout: 15_000 }
          )
          await page.locator("input").fill("private-input")
          await page.locator("button").click()
          await page.evaluate(() =>
            window.dispatchEvent(new PageTransitionEvent("pagehide"))
          )
          await page.waitForTimeout(3500)
          const events = requests.flatMap((request) => request.events)
          assert.deepEqual(errors, [])
          assert.ok(events.some((event) => event.event === "$pageview"))
          assert.ok(events.some((event) => event.event === "$pageleave"))
          assert.ok(
            events.every((event) =>
              ["$pageview", "$pageleave"].includes(event.event)
            )
          )
          assert.ok(
            events.every(
              (event) => event.properties.distinct_id === "$posthog_cookieless"
            )
          )
          assert.ok(requests.every((request) => !request.headers.cookie))
          assert.ok(!JSON.stringify(events).includes("private-"))
          assert.ok(!JSON.stringify(events).includes("_scroll"))
          assert.ok(
            events.every(
              (event) => !Object.hasOwn(event.properties, "ph_keyword")
            )
          )
          assert.deepEqual(await context.cookies(), initialCookies)
          const writes = await page.evaluate(() => window.__writes)
          assert.deepEqual(
            writes.filter(
              (name) =>
                !["__mplssupport__", "__support__", "test"].includes(name)
            ),
            []
          )
        } finally {
          await context.close()
        }
      }
    } finally {
      await browser.close()
    }
  })
}
