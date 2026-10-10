// Keeps the Astro docs at their original addresses and the React registry an
// extension of shadcn/ui. Run after `pnpm registry:build`.
import assert from "node:assert/strict"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { test } from "node:test"
import { STYLES } from "#styles"

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
const json = (path) => JSON.parse(read(path))
const pages = (dir) =>
  readdirSync(new URL(`../src/content/pages/${dir}`, import.meta.url))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort()

const extras = [
  "banner",
  "header",
  "icon",
  "layout",
  "logo",
  "marquee",
  "price",
  "rating",
  "section",
  "theme-toggle",
  "toc",
  "typography",
  "video",
]
const react = json("react/registry.json")
const reactNames = new Set(react.items.map((item) => item.name))

test("the Astro docs keep their original addresses", () => {
  assert.ok(!existsSync(new URL("../src/content/pages/astro", import.meta.url)))
  for (const section of ["docs", "components", "blocks"]) {
    assert.ok(pages(section).includes("index"), `${section} has an index`)
  }
  assert.ok(pages("components").includes("button"))
  assert.ok(pages("blocks").includes("hero"))
  // A redirect would take the original pages away.
  assert.doesNotMatch(
    read("netlify.toml"),
    /from = "\/(docs|components|blocks)/
  )
  assert.doesNotMatch(read("astro.config.ts"), /redirects:/)
  const redirects = read("public/_redirects")
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
  for (const line of redirects) {
    assert.match(line, /^\/(astro|react\/components)\//, line)
    // Only the standard components the extension leaves to shadcn/ui.
    const name = line.match(/^\/react\/components\/([^/.]+)/)?.[1]
    if (name) assert.ok(!pages("react/components").includes(name), line)
  }
  for (const item of json("registry.json").items) {
    assert.doesNotMatch(item.docs ?? "", /\/astro\//, item.name)
  }
})

test("the React registry holds only the Fulldev extras and blocks", () => {
  for (const item of react.items) {
    if (item.type === "registry:item") {
      assert.ok(["components", "blocks"].includes(item.name), item.name)
      continue
    }
    assert.ok(
      item.type === "registry:block" ||
        (item.type === "registry:ui" && extras.includes(item.name)),
      `${item.name} (${item.type}) is not a Fulldev extra or block`
    )
    for (const key of ["config", "cssVars", "css", "tailwind"]) {
      assert.equal(item[key], undefined, `${item.name} sets ${key}`)
    }
  }
  assert.deepEqual(
    react.items
      .filter((item) => item.type === "registry:ui")
      .map((item) => item.name)
      .sort(),
    extras
  )
  assert.deepEqual(pages("react/components"), [...extras, "index"].sort())
})

test("React items never ship standard shadcn/ui files", () => {
  const standard = new Set()
  for (const item of react.items) {
    for (const dependency of item.registryDependencies ?? []) {
      if (dependency.startsWith("@fulldev/")) {
        const name = dependency.slice("@fulldev/".length)
        assert.ok(reactNames.has(name), `${item.name}: unknown ${dependency}`)
      } else {
        // A plain name resolves to the official shadcn/ui registry.
        assert.ok(!reactNames.has(dependency), `${item.name}: ${dependency}`)
        standard.add(dependency)
      }
    }
  }
  for (const item of react.items) {
    for (const file of item.files ?? []) {
      const own =
        file.path === `src/components/ui/${item.name}.tsx` ||
        file.path === `src/components/blocks/${item.name}.tsx` ||
        (item.name === "typography" &&
          file.path === "src/components/ui/typeset.css") ||
        file.path === "src/lib/placeholder-image.ts"
      assert.ok(own, `${item.name} ships ${file.path}`)
    }
  }
  assert.ok(standard.has("button"))
  // The built items carry the same files in every style.
  for (const style of STYLES) {
    for (const item of react.items) {
      const built = json(
        `public/r/react/styles/base-${style}/${item.name}.json`
      )
      assert.deepEqual(
        (built.files ?? []).map((file) => file.path),
        (item.files ?? []).map((file) => file.path),
        `${style}: ${item.name}`
      )
      assert.deepEqual(
        built.registryDependencies,
        item.registryDependencies,
        `${style}: ${item.name}`
      )
    }
    const served = readdirSync(
      new URL(`../public/r/react/styles/base-${style}`, import.meta.url)
    )
      .filter((file) => file !== "registry.json")
      .map((file) => file.replace(/\.json$/, ""))
    assert.deepEqual(served.sort(), [...reactNames].sort(), style)
  }
})
