// Scan every page in dist with axe in headless Chromium.
//
// Usage: pnpm a11y (builds dist and installs the Chromium headless shell
// first), or node scripts/a11y.mjs against an existing dist.
//
// Serves dist on a free localhost port, opens each HTML route, waits for
// fonts and eager images, and runs axe with its default rules. Violations,
// uncaught page errors and failed same-origin requests fail the scan.
// Incomplete results are listed for manual review: axe could not decide
// them, so they did not pass. Requests to other origins are blocked, so the
// scan needs no network. The report goes to .dev/a11y/report.json.
//
// Axe checks the rendered default state of each page. Menus, dialogs, focus
// order and motion still need a manual check.
import { createReadStream, existsSync, statSync } from "node:fs"
import { mkdir, readdir, writeFile } from "node:fs/promises"
import { createServer } from "node:http"
import { extname, join, relative, resolve, sep } from "node:path"
import AxeBuilder from "@axe-core/playwright"
import { chromium } from "playwright"

const root = resolve("dist")
const reportPath = resolve(".dev/a11y/report.json")
const concurrency = 4

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
}

if (!existsSync(root)) {
  console.error("No dist folder. Run pnpm a11y, which builds it first.")
  process.exit(1)
}

const walk = async (directory) => {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(path)))
    else if (entry.name.endsWith(".html")) files.push(path)
  }
  return files
}

const routes = (await walk(root))
  .map((file) => "/" + relative(root, file).split(sep).join("/"))
  .map((route) => route.replace(/(^|\/)index\.html$/, "$1"))
  .sort()

if (routes.length === 0) {
  console.error("No HTML pages in dist.")
  process.exit(1)
}

// Resolve a request path to a file inside dist, the way a static host does.
const fileFor = (pathname) => {
  let decoded
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return undefined
  }
  const candidates = [decoded, join(decoded, "index.html"), `${decoded}.html`]
  for (const candidate of candidates) {
    const file = resolve(root, "." + candidate)
    if (file !== root && !file.startsWith(root + sep)) return undefined
    if (existsSync(file) && statSync(file).isFile()) return file
  }
  return undefined
}

const server = createServer((request, response) => {
  const { pathname } = new URL(request.url ?? "/", "http://localhost")
  const file = fileFor(pathname)
  if (!file) {
    response.writeHead(404, { "content-type": "text/plain" })
    response.end("Not found")
    return
  }
  response.writeHead(200, {
    "content-type": types[extname(file)] ?? "application/octet-stream",
  })
  createReadStream(file).pipe(response)
})

await new Promise((done) => server.listen(0, "127.0.0.1", done))
const origin = `http://127.0.0.1:${server.address().port}`

let browser
const results = []

const close = async () => {
  await browser?.close().catch(() => {})
  await new Promise((done) => server.close(() => done()))
}
process.once("SIGINT", async () => {
  await close()
  process.exit(130)
})

try {
  try {
    browser = await chromium.launch({ headless: true })
  } catch (error) {
    console.error(
      "Could not start headless Chromium. Run pnpm a11y, which installs it with `playwright install chromium --only-shell`.\n"
    )
    throw error
  }
  const context = await browser.newContext()
  await context.route("**/*", (route) =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort()
  )

  const scan = async (route) => {
    const page = await context.newPage()
    const errors = []
    page.on("pageerror", (error) => errors.push(`Page error: ${error.message}`))
    page.on("requestfailed", (request) => {
      if (request.url().startsWith(origin))
        errors.push(`Request failed: ${request.url()}`)
    })
    page.on("response", (response) => {
      if (response.url().startsWith(origin) && response.status() >= 400)
        errors.push(`HTTP ${response.status()}: ${response.url()}`)
    })
    try {
      const response = await page.goto(origin + route, { waitUntil: "load" })
      if (!response?.ok()) errors.push(`HTTP ${response?.status()}: ${route}`)
      await page.evaluate(() => document.fonts.ready)
      await page
        .waitForFunction(
          () =>
            [...document.images].every(
              (image) => image.complete || image.loading === "lazy"
            ),
          undefined,
          { timeout: 10_000 }
        )
        .catch(() => errors.push("Images did not finish loading in 10s"))
      const axe = await new AxeBuilder({ page }).analyze()
      results.push({
        route,
        errors,
        violations: axe.violations.map((rule) => ({
          id: rule.id,
          impact: rule.impact,
          help: rule.help,
          helpUrl: rule.helpUrl,
          targets: rule.nodes.map((node) => node.target.join(" ")),
        })),
        incomplete: axe.incomplete.map((rule) => ({
          id: rule.id,
          help: rule.help,
          count: rule.nodes.length,
        })),
      })
    } catch (error) {
      results.push({
        route,
        errors: [...errors, `Scan failed: ${error.message}`],
        violations: [],
        incomplete: [],
      })
    } finally {
      await page.close()
    }
  }

  const queue = [...routes]
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (queue.length > 0) await scan(queue.shift())
    })
  )
} finally {
  await close()
}

results.sort((a, b) => a.route.localeCompare(b.route))
await mkdir(resolve(reportPath, ".."), { recursive: true })
await writeFile(reportPath, JSON.stringify(results, null, 2) + "\n")

let failures = 0
for (const { route, errors, violations } of results) {
  for (const error of errors) {
    failures++
    console.log(`${route}\n  ${error}`)
  }
  for (const rule of violations) {
    failures++
    console.log(`${route}\n  ${rule.id} (${rule.impact}): ${rule.help}`)
    for (const target of rule.targets) console.log(`    ${target}`)
    console.log(`    ${rule.helpUrl}`)
  }
}

const review = new Map()
for (const { incomplete } of results)
  for (const rule of incomplete) {
    const entry = review.get(rule.id) ?? {
      help: rule.help,
      routes: 0,
      nodes: 0,
    }
    entry.routes++
    entry.nodes += rule.count
    review.set(rule.id, entry)
  }
if (review.size > 0) {
  console.log("\nNeeds manual review (axe could not decide, so not a pass):")
  for (const [id, { help, routes, nodes }] of review)
    console.log(`  ${id}: ${help} (${nodes} elements on ${routes} pages)`)
}

console.log(
  `\nScanned ${results.length} pages: ${failures} failures. Report: ${relative(process.cwd(), reportPath)}`
)
process.exit(failures > 0 ? 1 : 0)
