// Checks that docs previews and installs get the same classes, and that the
// registry output stays portable. Run after `pnpm registry:build`.
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import {
  applyMenuColor,
  buildsMenuColor,
  createStyleMaps,
  hasMenuHook,
  MENU_COLORS,
  replacePlaceholders,
  STYLES,
  transformSource,
} from "#styles"
import { transformMenu } from "shadcn/utils"

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
        const expected = transformSource(
          read(file.path),
          maps[style],
          known,
          style,
          buildsMenuColor(file.path) ? "default" : undefined
        )
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

// shadcn/ui marks the menu surfaces with cn-menu-target and cn-menu-translucent
// in these parts, for components.json `menuColor`.
test("menu surfaces carry the shadcn/ui menu hooks", () => {
  for (const name of [
    "dropdown-menu/dropdown-menu-content",
    "select/select-content",
    "combobox/combobox-content",
  ]) {
    assert.match(
      read(`src/components/ui/${name}.astro`),
      /"cn-[\w-]+-content cn-[\w-]+-content-logical cn-menu-target cn-menu-translucent /,
      `${name} lacks the menu hooks`
    )
  }
})

// The shadcn CLI's own menu transform, on one className string. It takes a
// ts-morph source file; this one holds a single className attribute.
async function shadcnMenu(classes, menuColor) {
  let text = `"${classes}"`
  const attribute = {
    getNameNode: () => ({ getText: () => "className" }),
    getInitializer: () => ({ getText: () => text }),
    setInitializer: (value) => (text = value),
  }
  await transformMenu({
    sourceFile: { getDescendantsOfKind: () => [attribute] },
    config: { menuColor },
  })
  return text.slice(1, -1)
}

test("menu colors give the classes the shadcn CLI installs", async () => {
  let checked = 0
  for (const style of STYLES) {
    for (const item of registry.items) {
      for (const file of item.files ?? []) {
        for (const [, value] of read(file.path).matchAll(/"([^"\n]*)"/g)) {
          if (!hasMenuHook(value)) continue
          const classes = replacePlaceholders(value, maps[style], known, style)
          for (const menuColor of MENU_COLORS) {
            assert.equal(
              applyMenuColor(classes, menuColor, maps[style]),
              await shadcnMenu(classes, menuColor),
              `${style}: ${file.path} in ${menuColor}`
            )
            checked++
          }
        }
      }
    }
  }
  assert.ok(checked > 0)
})

test("the docs generate the translucent menu classes of every style", () => {
  const inline = read("src/styles/global.css").match(
    /@source inline\(\s*"([^"]*)"\s*\)/
  )?.[1]
  for (const style of STYLES) {
    assert.equal(inline, maps[style]["cn-menu-translucent"], style)
  }
})

test("base sets up each style through `shadcn init`", () => {
  for (const style of STYLES) {
    const index = json(`public/r/styles/base-${style}/registry.json`)
    const items = [
      json(`public/r/styles/base-${style}/base.json`),
      index.items.find((item) => item.name === "base"),
    ]
    for (const base of items) {
      assert.equal(base.type, "registry:base")
      assert.equal(
        base.extends,
        "none",
        "base must not pull in shadcn's React style index"
      )
      assert.equal(base.config.style, `base-${style}`)
      assert.match(
        base.config.registries["@fulldev"],
        /\{style\}\/\{name\}\.json$/
      )
    }
  }
})

// The shadcn CLI can override a site's colors even when it only adds missing
// tokens, for example when the site defines them inside @layer base. So only
// base, which sets up a new project, writes theme tokens.
test("init leaves theme tokens alone and shares the rest with base", () => {
  const init = registry.items.find((item) => item.name === "init")
  const base = registry.items.find((item) => item.name === "base")
  assert.equal(init.type, "registry:lib")
  assert.equal(init.config, undefined)
  assert.equal(init.cssVars, undefined)
  for (const key of ["dependencies", "files", "css"]) {
    assert.deepEqual(base[key], init[key], `base and init differ in ${key}`)
  }
  assert.ok(base.cssVars.light.primary && base.cssVars.dark.primary)
  assert.ok(base.cssVars.light["shadow-md"], "base keeps the shadow scale")
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
