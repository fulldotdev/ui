// Only tokens, contracts and provenance are generated. Component CSS is handwritten.
// liquid/ mirrors a theme: every file is stored at the path it installs to.
import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { format } from "prettier"

const root = resolve("liquid")
const read = (path) => readFileSync(resolve(root, path), "utf8")
const write = (path, value) =>
  process.argv.includes("--check")
    ? assert.equal(
        read(path),
        value,
        `liquid/${path}: rebuild the Liquid registry`
      )
    : writeFileSync(resolve(root, path), value)
const registry = JSON.parse(read("registry.json"))
const names = new Set(registry.items.map((item) => item.name))
assert.equal(names.size, registry.items.length, "Duplicate Liquid item names")
const prefix = "https://ui.full.dev/r/liquid/"
const palette = JSON.parse(
  readFileSync("registry/styles/shadcn/themes.json", "utf8")
).find((theme) => theme.name === "neutral").cssVars
const declarations = (values) =>
  Object.entries(values)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n")
const primitives = Object.fromEntries(
  [...read("primitives.css").matchAll(/--([\w-]+):\s*([^;]+);/g)].map(
    ([, name, value]) => [name, value]
  )
)
const focus = {
  "focus-ring": "0 0 0 3px color-mix(in oklch, var(--ring) 50%, transparent)",
}
write(
  "assets/ui-tokens.css",
  await format(
    `/* Generated from the shared neutral palette and Liquid primitives. */\n:root {\n  color-scheme: light;\n\n${declarations({ ...palette.light, ...primitives, ...focus })}\n}\n.dark {\n  color-scheme: dark;\n\n${declarations({ ...palette.dark, ...focus })}\n}\n`,
    { parser: "css", singleQuote: true, printWidth: 120 }
  )
)
const licenses = [
  ["Fulldev UI", "LICENSE-FULLDEV.txt"],
  ["shadcn/ui (derived Vega styles)", "LICENSE-SHADCN.md"],
  ["data-slot 1.1.1", "LICENSE-DATA-SLOT.md"],
].map(([name, file]) => ({ name, text: read(file).trim() }))
write("assets/ui-licenses.json", `${JSON.stringify(licenses, null, 2)}\n`)

const files = new Map()
const contract = {}
for (const item of registry.items) {
  assert.equal(item.type, "registry:item", item.name)
  assert(!item.dependencies && !item.css && !item.cssVars && !item.config)
  for (const dependency of item.registryDependencies ?? []) {
    assert(dependency.startsWith(prefix), dependency)
    assert(names.has(dependency.slice(prefix.length, -5)), dependency)
  }
  const slots = new Set()
  for (const file of item.files ?? []) {
    assert.equal(file.type, "registry:file")
    assert.match(file.target, /^~\/(assets|snippets)\/[a-z0-9.-]+$/)
    assert.equal(file.path, file.target.slice(2), file.path)
    if (file.path === "assets/ui-manifest.json") continue
    const content = read(file.path)
    assert(!/--tw-|@tailwind|@apply\b/.test(content), file.path)
    for (const match of content.matchAll(/data-slot=['"]([^'"]+)['"]/g))
      slots.add(match[1])
    const hash = createHash("sha256").update(content).digest("hex")
    if (files.has(file.path))
      assert.equal(files.get(file.path), hash, file.path)
    files.set(file.path, hash)
  }
  if (slots.size) contract[item.name] = [...slots].sort()
}
const vendor = JSON.parse(read("vendor.json"))
for (const entry of vendor.files) {
  const hash = createHash("sha256").update(read(entry.path)).digest("hex")
  assert.equal(hash, entry.sha256, entry.path)
}
write("contracts.json", `${JSON.stringify(contract, null, 2)}\n`)
write(
  "assets/ui-manifest.json",
  `${JSON.stringify({ registry: prefix, files: Object.fromEntries(files) }, null, 2)}\n`
)
console.log(
  `Liquid: ${registry.items.length} universal items, ${files.size} files`
)
