// Draw the docs pages in full.dev's Open Graph browser window (1200x630).
// Run `vp run og` after changing a page's opening content. Images are
// committed, so the regular build needs no browser. CHROME overrides the
// Playwright browser; OG_PORT overrides the local preview port.
import { spawn } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
} from "node:fs"
import { dirname, join, relative } from "node:path"
import { preview } from "astro"
import { chromium } from "playwright"
import sharp from "sharp"

const root = process.cwd()
const dist = join(root, "dist")
const out = join(root, "public", "og")
const port = Number(process.env.OG_PORT ?? 4517)
const base = `http://127.0.0.1:${port}`
const shot = { width: 1680, height: 882 }
const card = { width: 1200, height: 630 }

const run = (args: string[]) =>
  new Promise<void>((resolve, reject) => {
    const child = spawn("vp", args, { cwd: root, stdio: "inherit" })
    child.on("error", reject)
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`vp ${args.join(" ")} failed`))
    )
  })

const pages = () =>
  readdirSync(dist, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith("index.html"))
    .flatMap((file) => {
      const html = readFileSync(join(dist, file), "utf8")
      if (/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html))
        return []
      const image = html.match(/property="og:image" content="([^"]+)"/)?.[1]
      if (!image) return []
      const url = new URL(image)
      // Explicit page images keep their existing behavior.
      if (
        url.origin !== "https://ui.full.dev" ||
        !url.pathname.startsWith("/og/")
      )
        return []
      return [
        {
          path: `/${dirname(file).replace(/^\.$/, "")}/`.replace("//", "/"),
          image: url.pathname,
          docs: html.includes("data-og-doc"),
        },
      ]
    })

// Capture the real content without the site navigation, docs sidebar or
// table of contents. The examples and their iframes stay as the site draws
// them. These capture-only rules never ship to the website.
const isolate = () => {
  const style = document.createElement("style")
  style.textContent = `
    html, body { overflow: hidden !important; }
    body > header, netlify-drawer,
    aside:has([data-docs-sidebar]),
    [data-og-doc] > :not(:first-child) { display: none !important; }
    div:has(> #main) { display: block !important; }
    [data-og-doc] { display: block !important; }
    #main { max-width: 1440px; margin-inline: auto; padding: 0 40px; }
  `
  document.head.append(style)
  const section = document.querySelector("main h1")?.closest("section")
  if (section) section.style.setProperty("padding-top", "80px", "important")
  else {
    const content = document.querySelector<HTMLElement>("#main > :first-child")
    content?.style.setProperty("padding-top", "80px", "important")
  }
  scrollTo(0, 0)
}

// The same stone canvas, raised frame, dots and floor shadow as full.dev's
// packages/web/scripts/og.ts. The image inside keeps this site's own theme.
const frame = (src: string) => `<!doctype html><html><head><style>
* { margin: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; overflow: hidden; background: #fbfaf8; }
.frame { position: absolute; left: 80px; right: 80px; top: 64px; height: 620px; overflow: hidden; border-radius: 18px;
  background: #fbfaf8;
  box-shadow: 0 0 0 1px color-mix(in oklab, rgb(40 32 20 / 0.24) 40%, transparent), 0 2px 4px -2px rgb(40 32 20 / 0.24), 0 36px 70px -24px rgb(40 32 20 / 0.24); }
.bar { height: 30px; display: flex; gap: 7px; align-items: center; padding: 0 15px; background: #fff; border-bottom: 1px solid #e4e2dd; }
.bar i { width: 10px; height: 10px; border-radius: 50%; background: #e4e2dd; }
img { display: block; width: 100%; }
</style></head><body><div class="frame"><div class="bar"><i></i><i></i><i></i></div><img src="${src}"></div></body></html>`

if (process.argv.includes("--check")) {
  for (const { image } of pages()) {
    const file = join(dist, image)
    if (!existsSync(file)) throw new Error(`Missing ${image}; run vp run og`)
    const meta = await sharp(file).metadata()
    if (
      meta.width !== card.width ||
      meta.height !== card.height ||
      meta.format !== "jpeg"
    )
      throw new Error(`Invalid OG image: ${image}`)
  }
  console.log("All generated OG images exist and are 1200x630 JPEGs.")
} else {
  await run(["exec", "astro", "build"])
  await run(["-C", "react", "run", "build"])
  if (
    await fetch(base).then(
      () => true,
      () => false
    )
  )
    throw new Error(`OG_PORT ${port} is already in use`)
  const server = await preview({
    root,
    server: { host: "127.0.0.1", port },
  })
  const next = `${out}.next`
  rmSync(next, { recursive: true, force: true })
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROME })
    const context = await browser.newContext({
      viewport: shot,
      colorScheme: "light",
      reducedMotion: "reduce",
    })
    const page = await context.newPage()
    const targets = pages()
    if (!targets.length) throw new Error("No generated OG images found in dist")
    for (const { path, image, docs } of targets) {
      // Docs have one narrow content column; capture it closer for legibility.
      await page.setViewportSize({ ...shot, width: docs ? 1200 : shot.width })
      await page.goto(base + path, { waitUntil: "networkidle" })
      await page.evaluate(isolate)
      await page.evaluate(() => document.fonts.ready)
      // Allow live examples to settle after removing the sidebar.
      await page.waitForTimeout(300)
      const raw = await page.screenshot({ type: "png" })
      await page.setViewportSize(card)
      await page.setContent(
        frame(`data:image/png;base64,${raw.toString("base64")}`)
      )
      await page
        .locator("img")
        .evaluate((img: HTMLImageElement) => img.decode())
      const file = join(next, relative("/og", image))
      mkdirSync(dirname(file), { recursive: true })
      await page.screenshot({ path: file, type: "jpeg", quality: 85 })
      console.log(`public${image}`)
    }
    rmSync(out, { recursive: true, force: true })
    renameSync(next, out)
    console.log(`Drew ${targets.length} OG images.`)
  } finally {
    try {
      await browser?.close()
    } finally {
      await server.stop()
      rmSync(next, { recursive: true, force: true })
    }
  }
}
