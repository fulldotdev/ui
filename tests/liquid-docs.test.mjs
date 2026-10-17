// The public native inventory must remain discoverable as a real platform.
import assert from "node:assert/strict"
import { readdir, readFile } from "node:fs/promises"
import { test } from "node:test"

const read = (path) => readFile(path, "utf8")
const json = async (path) => JSON.parse(await read(path))
const internal = new Set([
  "init",
  "runtime",
  "components",
  "popup",
  "triggers",
  "invalid-controls",
])

test("every public Liquid item has native usage, installation and a component page", async () => {
  const registry = await json("liquid/registry.json")
  const names = registry.items
    .filter((item) => !internal.has(item.name))
    .map((item) => item.name)
    .sort()
  const files = (await readdir("liquid/examples"))
    .filter((file) => file.endsWith(".liquid"))
    .map((file) => file.slice(0, -7))
    .sort()
  assert.deepEqual(files, names)
  const dependencies = await json("liquid/examples/dependencies.json")
  for (const name of names) {
    const page = await read(`src/content/pages/liquid/components/${name}.mdx`)
    assert.match(page, new RegExp(`<Example name="${name}" />`))
    assert.match(page, /\/liquid\/docs\/installation\//)
    const command = `npx shadcn@latest add ${dependencies[name].map((item) => `https://ui.full.dev/r/liquid/${item}.json`).join(" ")}`
    assert(
      page.includes(command),
      `${name}: command installs every example part`
    )
    for (const item of dependencies[name])
      assert(
        registry.items.some((entry) => entry.name === item),
        `${name}: ${item}`
      )
    assert.doesNotMatch(page, /@fulldev\/|className=|import .*components\/ui/)
  }
})
