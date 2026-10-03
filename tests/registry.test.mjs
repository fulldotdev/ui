// Checks that docs previews and installs get the same classes, and that the
// registry output stays portable. Run after `pnpm registry:build`.
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import {
  createStyleMaps,
  replacePlaceholders,
  STYLES,
  transformSource,
} from "#styles"

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
const json = (path) => JSON.parse(read(path))

// The docs site reads the style files from disk, the same way as here.
const { maps, known } = createStyleMaps((path) =>
  read(`registry/styles/${path}`)
)
const registry = json("registry.json")

test("installed files match the docs rendering in every style", () => {
  for (const style of STYLES) {
    for (const item of registry.items) {
      const built = json(`public/r/styles/base-${style}/${item.name}.json`)
      for (const [index, file] of (item.files ?? []).entries()) {
        const expected = transformSource(read(file.path), maps[style], known)
        assert.equal(
          built.files[index].content,
          expected,
          `${style}: ${file.path} differs between the docs and the install`
        )
      }
    }
  }
})

// Prettier once reordered the generated Sera classes after the build, so the
// docs merged away the bottom border color that installs keep.
test("Sera input group keeps its bottom border color in docs and install", () => {
  const docs = replacePlaceholders("cn-fd-input-group", maps.sera, known)
  assert.match(docs, /(^|\s)border-b-input(\s|$)/)
  const installed = json("public/r/styles/base-sera/input-group.json")
  assert.ok(
    installed.files.some((file) => file.content.includes("border-b-input"))
  )
})

test("init sets up each style and the stylesheet from components.json", () => {
  for (const style of STYLES) {
    const index = json(`public/r/styles/base-${style}/registry.json`)
    const items = [
      json(`public/r/styles/base-${style}/init.json`),
      index.items.find((item) => item.name === "init"),
    ]
    for (const init of items) {
      assert.equal(init.type, "registry:base")
      assert.equal(
        init.extends,
        "none",
        "init must not pull in shadcn's React style index"
      )
      assert.equal(init.config.style, `base-${style}`)
      assert.match(
        init.config.registries["@fulldev"],
        /\{style\}\/\{name\}\.json$/
      )
      assert.ok(init.cssVars.light.primary && init.cssVars.dark.primary)
      assert.ok(
        init.cssVars.light["shadow-md"],
        "init keeps the existing shadow scale"
      )
    }
  }
})

test("no item writes into the project's stylesheet folder", () => {
  for (const item of registry.items) {
    for (const file of item.files ?? []) {
      assert.ok(
        !/^src\/styles\//.test(file.target ?? file.path),
        `${item.name} ships ${file.target ?? file.path}; use cssVars or css instead`
      )
    }
  }
})

test("every registry item is served in every style", () => {
  for (const style of STYLES) {
    const names = json(`public/r/styles/base-${style}/registry.json`).items.map(
      (item) => item.name
    )
    assert.deepEqual(
      names,
      registry.items.map((item) => item.name)
    )
  }
})
