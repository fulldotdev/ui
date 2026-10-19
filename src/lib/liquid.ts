// Docs only. Render the native sources, never Astro stand-ins, in isolated frames.
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import registry from "@liquid/registry.json"
import { Liquid } from "liquidjs"

import { DEFAULT_CONFIG, presetCss } from "@/lib/presets"
import previewCss from "@/styles/liquid-preview.css?raw"
import fontUrl from "@/assets/fonts/geist-variable.woff2?url"

export const liquidAssets = [
  ...new Map(
    registry.items
      .flatMap((item) => item.files ?? [])
      .filter((file) => file.target.startsWith("~/assets/"))
      .map((file) => [file.target.slice("~/assets/".length), file.path])
  ).entries(),
]

export async function renderLiquidExample(source: string) {
  const snippets = new Map<string, string>()
  const styles = new Set<string>()
  for (const file of registry.items.flatMap((item) => item.files ?? [])) {
    if (!file.target.startsWith("~/snippets/")) continue
    let text = await readFile(resolve("liquid", file.path), "utf8")
    text = text
      .replace(/{%-? doc -?%}[\s\S]*?{%-? enddoc -?%}/g, "")
      .replace(
        /{%-? stylesheet -?%}([\s\S]*?){%-? endstylesheet -?%}/g,
        (_, css) => {
          styles.add(css)
          return ""
        }
      )
    snippets.set(file.target.split("/").at(-1)!, text)
  }
  const engine = new Liquid({
    extname: ".liquid",
    relativeReference: false,
    fs: {
      exists: async (path) => snippets.has(path),
      existsSync: (path) => snippets.has(path),
      readFile: async (path) => snippets.get(path)!,
      readFileSync: (path) => snippets.get(path)!,
      resolve: (_root, path, ext) => (path.endsWith(ext) ? path : path + ext),
    },
  })
  engine.registerFilter("asset_url", (name) => `/preview/liquid/assets/${name}`)
  engine.registerFilter(
    "stylesheet_tag",
    (url) => `<link rel="stylesheet" href="${url}">`
  )
  engine.registerFilter("json", JSON.stringify)
  const head = await engine.parseAndRender("{% render 'ui' %}")
  const body = await engine.parseAndRender(source, {
    // Native examples use Shopify routes. Point them at docs in this fixture.
    routes: {
      root_url: "/liquid/",
      all_products_collection_url: "/liquid/components/",
      search_url: "/liquid/components/command/",
      cart_url: "/liquid/components/sheet/",
    },
  })
  // A div, not main: axe counts the iframe's landmarks with the docs page's,
  // and the page already has its main.
  return `<!doctype html><html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width">
  <title>Native Liquid preview</title>
  ${head}
  <style>${[...styles].join("\n")}</style>
  <style>@font-face{font-family:Geist;src:url('${fontUrl}') format('woff2');font-weight:100 900}${previewCss}</style>
  <style id="preview-theme">${presetCss(DEFAULT_CONFIG)}</style>
  <script type="module" src="/preview/liquid.js"></script>
  </head><body><div id="example">${body}</div></body></html>`
}
