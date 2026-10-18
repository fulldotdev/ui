import { spawn } from "node:child_process"
import { readFile } from "node:fs/promises"
import { createServer } from "node:http"
import { resolve } from "node:path"

export async function registryServer() {
  let origin
  const requests = []
  const server = createServer(async (request, response) => {
    try {
      const name = request.url.split("/").at(-1)
      if (!/^[a-z-]+\.json$/.test(name)) throw new Error("Invalid item")
      requests.push(name)
      const body = JSON.parse(
        await readFile(resolve("public/r/liquid", name), "utf8")
      )
      body.registryDependencies = body.registryDependencies?.map((dependency) =>
        dependency.replace("https://ui.full.dev/r/liquid", origin)
      )
      response.setHeader("content-type", "application/json")
      response.end(JSON.stringify(body))
    } catch {
      response.writeHead(404).end()
    }
  })
  await new Promise((done) => server.listen(0, "127.0.0.1", done))
  origin = `http://127.0.0.1:${server.address().port}`
  return {
    origin,
    requests,
    close: () => new Promise((done) => server.close(done)),
  }
}

export async function install(origin, theme, name = "components", flags = []) {
  const child = spawn(
    process.execPath,
    [
      resolve("node_modules/shadcn/dist/index.js"),
      "add",
      `${origin}/${name}.json`,
      "--cwd",
      theme,
      "--yes",
      ...flags,
    ],
    {
      env: { ...process.env, NO_COLOR: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    }
  )
  let output = ""
  child.stdout.on("data", (data) => (output += data))
  child.stderr.on("data", (data) => (output += data))
  const code = await new Promise((done) => child.on("close", done))
  if (code !== 0) throw new Error(`shadcn exited ${code}:\n${output}`)
  return output
}

// LiquidJS exercises our markup, not Shopify's commerce objects or asset pipeline.
export async function renderFixture(theme) {
  const { Liquid } = await import("liquidjs")
  const { mkdir, readdir, writeFile } = await import("node:fs/promises")
  const renderRoot = resolve(theme, ".dev/liquid-fixture")
  await mkdir(renderRoot, { recursive: true })
  const strip = (source) =>
    source
      .replace(/{%-? (doc|schema) -?%}[\s\S]*?{%-? end\1 -?%}/g, "")
      .replace(
        /{%-? stylesheet -?%}([\s\S]*?){%-? endstylesheet -?%}/g,
        "<style>$1</style>"
      )
  for (const file of await readdir(resolve(theme, "snippets"))) {
    await writeFile(
      resolve(renderRoot, file),
      strip(await readFile(resolve(theme, "snippets", file), "utf8"))
    )
  }
  await writeFile(
    resolve(renderRoot, "icon.liquid"),
    strip(await readFile("tests/fixtures/liquid/icon.liquid", "utf8"))
  )
  const locale = JSON.parse(
    await readFile("tests/fixtures/liquid/en.json", "utf8")
  )
  const engine = new Liquid({ root: renderRoot, extname: ".liquid" })
  engine.registerFilter("t", (key, ...args) => {
    let value = key.split(".").reduce((value, part) => value?.[part], locale)
    if (typeof value !== "string")
      throw new Error(`Missing fixture translation: ${key}`)
    for (const [name, replacement] of args)
      value = value.replaceAll(`{{ ${name} }}`, replacement)
    return value
  })
  engine.registerFilter("asset_url", (asset) => `/assets/${asset}`)
  engine.registerFilter(
    "stylesheet_tag",
    (url) => `<link rel="stylesheet" href="${url}">`
  )
  engine.registerFilter("json", JSON.stringify)
  const reference = strip(
    await readFile("tests/fixtures/liquid/reference.liquid", "utf8")
  )
  const extra = await readFile(
    "tests/fixtures/liquid/interactive.liquid",
    "utf8"
  )
  const head = "{% render 'ui' %}"
  const styles = new Set()
  const html = await engine.parseAndRender(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Fulldev Liquid components</title>${head}</head><body>${reference}${extra}</body></html>`,
    {
      section: { id: "ui-reference", settings: { scheme: "default" } },
      routes: {
        all_products_collection_url: "/collections/all",
        search_url: "/search",
        cart_url: "/cart",
      },
    }
  )
  // Model Shopify's stylesheet collection: shared snippet styles after the theme assets.
  return html
    .replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => {
      styles.add(css)
      return ""
    })
    .replace("</head>", `<style>${[...styles].join("\n")}</style></head>`)
}

export async function fixtureServer(theme) {
  const html = await renderFixture(theme)
  const server = createServer(async (request, response) => {
    try {
      if (request.url === "/") {
        response.setHeader("content-type", "text/html")
        response.end(html)
      } else {
        if (!/^\/assets\/[a-z0-9.-]+$/.test(request.url))
          throw new Error("Invalid asset")
        response.setHeader(
          "content-type",
          request.url.endsWith(".js") ? "text/javascript" : "text/css"
        )
        response.end(await readFile(resolve(theme, request.url.slice(1))))
      }
    } catch {
      response.writeHead(404).end()
    }
  })
  await new Promise((done) => server.listen(0, "127.0.0.1", done))
  return {
    origin: `http://127.0.0.1:${server.address().port}`,
    close: () => new Promise((done) => server.close(done)),
  }
}
