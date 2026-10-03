// Write the registry once per style. Components use cn-* placeholder classes;
// each style maps them to Tailwind classes, the same way shadcn/ui does.
// Input is the plain `shadcn build` output, output goes to public/r.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"

import {
  createStyleMaps,
  KEEP,
  replacePlaceholders,
  STYLES,
} from "./styles.mjs"

// Served at the old /r/{name}.json path, so existing installs keep working.
const DEFAULT_STYLE = "vega"

const [input = "node_modules/.cache/fulldev-registry"] = process.argv.slice(2)
const { maps, known } = createStyleMaps((path) =>
  readFileSync(new URL(`../registry/styles/${path}`, import.meta.url), "utf8")
)

// Replace the placeholders in every double-quoted string that contains one.
// Style classes can contain single quotes, so other strings are not supported.
const transform = (source, styleMap) =>
  source.replace(
    /"([^"\n]*?\bcn-[\w-]+[^"\n]*?)"/g,
    (_, value) => `"${replacePlaceholders(value, styleMap, known)}"`
  )

// Placeholders left over: a typo, or a placeholder outside a double-quoted string.
const leftovers = (source) =>
  [...source.matchAll(/\bcn-[\w-]+/g)]
    .map(([token]) => token)
    .filter((token) => !KEEP.has(token))

// Only items in registry.json; the cache can hold files of removed items.
const registry = JSON.parse(
  readFileSync(new URL("../registry.json", import.meta.url), "utf8")
)
const files = [
  "registry.json",
  ...registry.items.map((item) => `${item.name}.json`),
]
const errors = []

for (const style of STYLES) {
  const styleMap = maps[style]
  const outputs = [`public/r/styles/base-${style}`]
  if (style === DEFAULT_STYLE) outputs.push("public/r")
  rmSync(outputs[0], { recursive: true, force: true })

  for (const file of files) {
    const raw = readFileSync(`${input}/${file}`, "utf8")
    const item = JSON.parse(raw)
    // `shadcn init <url>` writes the base item's style to components.json.
    if (item.config?.style) item.config.style = `base-${style}`
    for (const entry of item.files ?? []) {
      if (typeof entry.content !== "string") continue
      entry.content = transform(entry.content, styleMap)
      for (const token of new Set(leftovers(entry.content))) {
        errors.push(`${style}: ${entry.path} still has ${token}`)
      }
    }
    // Keep the exact formatting of `shadcn build` to avoid noise in diffs.
    const json =
      JSON.stringify(item, null, 2) + (raw.endsWith("\n") ? "\n" : "")
    for (const output of outputs) {
      mkdirSync(output, { recursive: true })
      writeFileSync(`${output}/${file}`, json)
    }
  }
}

if (errors.length) {
  console.error(
    `Placeholders left in the output:\n${[...new Set(errors)].join("\n")}`
  )
  process.exit(1)
}

console.log(`Built ${files.length} registry files for: ${STYLES.join(", ")}`)
