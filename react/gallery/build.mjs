// Build the previews once per style into the docs site's dist/preview/react
// folder: vega at /preview/react/, every other style at /preview/react/<style>/.
import { readdirSync, readFileSync } from "node:fs"
import { build } from "vite"

import {
  createStyleMaps,
  hasPlaceholder,
  replacePlaceholders,
  STYLES,
} from "../../scripts/styles.mjs"

const root = "/preview/react/"
const output = new URL("../../dist/preview/react/", import.meta.url).pathname
const source = new URL("../src/", import.meta.url)
const { maps, known } = createStyleMaps((path) =>
  readFileSync(
    new URL(`../../registry/styles/${path}`, import.meta.url),
    "utf8"
  )
)
const files = readdirSync(source, { recursive: true })
  .map(String)
  .filter((path) => /\.tsx?$/.test(path))
  .map((path) => [path, readFileSync(new URL(path, source), "utf8")])

// Every class a style's placeholders become must be in that style's CSS, or
// the previews no longer match an install.
const check = (style, dir) => {
  const css = readdirSync(`${dir}assets`)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(`${dir}assets/${file}`, "utf8"))
    .join("\n")
  const selectors = new Set(
    [...css.matchAll(/\.((?:\\[0-9a-fA-F]{1,6}\s?|\\.|[\w-])+)/g)].map(
      ([, name]) =>
        name.replace(/\\([0-9a-fA-F]{1,6})\s?|\\(.)/g, (_, hex, char) =>
          hex ? String.fromCodePoint(parseInt(hex, 16)) : char
        )
    )
  )
  const missing = new Set()
  for (const [path, code] of files) {
    for (const [, value] of code.matchAll(/"([^"\n]*)"/g)) {
      if (!hasPlaceholder.test(value)) continue
      const own = new Set(value.split(/\s+/))
      for (const token of replacePlaceholders(value, maps[style], known, style)
        .split(/\s+/)
        .filter((token) => token && !own.has(token))) {
        if (!selectors.has(token)) missing.add(`${path}: ${token}`)
      }
    }
  }
  if (missing.size)
    throw new Error(
      `The ${style} gallery CSS lacks style classes:\n${[...missing].join("\n")}`
    )
}

for (const style of ["vega", ...STYLES.filter((style) => style !== "vega")]) {
  const path = style === "vega" ? "" : `${style}/`
  Object.assign(process.env, {
    STYLE: style,
    BASE: root + path,
    OUT_DIR: output + path,
  })
  await build({
    configFile: new URL("../vite.config.ts", import.meta.url).pathname,
  })
  check(style, output + path)
  console.log(`Built the ${style} gallery.`)
}
