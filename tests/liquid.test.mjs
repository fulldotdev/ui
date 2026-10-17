import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { test } from "node:test"
import { install, registryServer } from "#liquid-fixture"

const json = async (path) => JSON.parse(await readFile(path, "utf8"))
const digest = (source) => createHash("sha256").update(source).digest("hex")

test("Liquid retains the shared semantic palette and Card/Button parts", async () => {
  const themes = await json("registry/styles/shadcn/themes.json")
  const neutral = themes.find((theme) => theme.name === "neutral").cssVars
  const css = await readFile("liquid/styles/tokens.css", "utf8")
  for (const [key, value] of Object.entries(neutral.light)) {
    assert(css.includes(`--${key}: ${value};`), key)
  }
  const contract = await json("liquid/contracts.json")
  const astroCardFiles = await readdir("src/components/ui/card")
  const astroCard = (
    await Promise.all(
      astroCardFiles
        .filter((name) => name.endsWith(".astro"))
        .map((name) =>
          readFile(resolve("src/components/ui/card", name), "utf8")
        )
    )
  ).join("\n")
  for (const [, part] of astroCard.matchAll(/data-slot="([^"]+)"/g))
    assert(contract.card.includes(part), part)
  const button = await readFile("liquid/components/button.liquid", "utf8")
  const astroButton = await readFile(
    "src/components/ui/button/button-variants.ts",
    "utf8"
  )
  for (const [, kind, value] of astroButton.matchAll(
    /cn-button-(variant|size)-([a-z-]+)/g
  )) {
    if (value === "default") continue
    assert(
      button.includes(`data-${kind}='${value}'`) ||
        (value === "icon" && button.includes("data-size^='icon'")),
      value
    )
  }
})

test("every individual universal item installs its complete dependency closure", async () => {
  const registry = await json("liquid/registry.json")
  const items = new Map(registry.items.map((item) => [item.name, item]))
  const collect = (name, seen = new Set()) => {
    if (seen.has(name)) return seen
    seen.add(name)
    for (const dependency of items.get(name).registryDependencies ?? [])
      collect(dependency.split("/").at(-1).slice(0, -5), seen)
    return seen
  }
  for (const item of registry.items) {
    const provided = new Map(
      [...collect(item.name)].flatMap((name) =>
        items.get(name).files.map((file) => [file.target.slice(2), file])
      )
    )
    for (const file of provided.values()) {
      if (!file.path.endsWith(".liquid")) continue
      const source = await readFile(resolve("liquid", file.path), "utf8")
      for (const [, snippet] of source.matchAll(/{%[-\s]*render\s+'([^']+)'/g))
        assert(
          provided.has(`snippets/${snippet}.liquid`),
          `${item.name}: ${snippet}`
        )
      for (const [, asset] of source.matchAll(
        /'([^']+\.(?:css|js))' \| asset_url/g
      ))
        assert(provided.has(`assets/${asset}`), `${item.name}: ${asset}`)
    }
  }
})

test("real shadcn CLI: clean theme, single items, repeat install and preservation", async () => {
  const server = await registryServer()
  const theme = await mkdtemp(resolve(tmpdir(), "fulldev-liquid-test-"))
  try {
    await mkdir(resolve(theme, "layout"))
    await mkdir(resolve(theme, "config"))
    const merchant = {
      "layout/theme.liquid": "<head>{{ content_for_header }}</head>",
      "config/settings_data.json": '{"merchant":"keep"}',
    }
    for (const [file, source] of Object.entries(merchant))
      await writeFile(resolve(theme, file), source)
    await install(server.origin, theme, "button")
    assert(
      (await readdir(resolve(theme, "snippets"))).includes("ui-button.liquid")
    )
    assert(
      !(await readdir(resolve(theme, "assets"))).some((name) =>
        name.endsWith(".js")
      )
    )
    await install(server.origin, theme, "select")
    await install(server.origin, theme)
    const manifest = await json(resolve(theme, "assets/ui-manifest.json"))
    for (const [path, expected] of Object.entries(manifest.files))
      assert.equal(digest(await readFile(resolve(theme, path))), expected, path)
    const before = await readFile(
      resolve(theme, "assets/ui-manifest.json"),
      "utf8"
    )
    await install(server.origin, theme)
    assert.equal(
      await readFile(resolve(theme, "assets/ui-manifest.json"), "utf8"),
      before
    )
    for (const [file, source] of Object.entries(merchant))
      assert.equal(await readFile(resolve(theme, file), "utf8"), source)
    assert(!(await readdir(theme)).includes("components.json"))
    assert(!(await readdir(theme)).includes("package.json"))
    assert(server.requests.includes("runtime.json"))
    const custom = "{% comment %}Store customization{% endcomment %}"
    await writeFile(resolve(theme, "snippets/ui-button.liquid"), custom)
    await install(server.origin, theme)
    assert.equal(
      await readFile(resolve(theme, "snippets/ui-button.liquid"), "utf8"),
      custom
    )
  } finally {
    await server.close()
    await rm(theme, { recursive: true, force: true })
  }
})
