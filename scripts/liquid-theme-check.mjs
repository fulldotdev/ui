// Run Shopify Theme Check on the native Liquid registry, with every file at the
// target a theme installs it to. It reports what Shopify rejects but the
// LiquidJS renderer in the docs and tests accepts, such as unknown filters.
// Errors fail; warnings are listed.
import { readFileSync } from "node:fs"
import { copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { Severity, themeCheckRun } from "@shopify/theme-check-node"

const registry = JSON.parse(readFileSync("liquid/registry.json", "utf8"))
const theme = await mkdtemp(join(tmpdir(), "fulldev-theme-check-"))
// Install target to source path, so offenses point at the source.
const sources = new Map()
try {
  for (const file of registry.items.flatMap((item) => item.files ?? [])) {
    const target = file.target.replace(/^~\//, "")
    const source = join("liquid", file.path)
    sources.set(target, source)
    await mkdir(dirname(join(theme, target)), { recursive: true })
    await copyFile(source, join(theme, target))
  }
  // A library has no templates that render its snippets, nor translations.
  await mkdir(join(theme, "locales"))
  const config = join(theme, ".theme-check.yml")
  await writeFile(
    config,
    "extends: theme-check:recommended\nOrphanedSnippet:\n  enabled: false\n"
  )
  const { offenses } = await themeCheckRun(theme, config)
  for (const offense of offenses) {
    const target = relative(theme, fileURLToPath(offense.uri))
    const level = Severity[offense.severity].toLowerCase()
    console.log(
      `${sources.get(target) ?? target}:${offense.start.line}:${offense.start.character + 1} ${level} ${offense.check}: ${offense.message}`
    )
  }
  if (offenses.some((offense) => offense.severity === Severity.ERROR))
    process.exitCode = 1
} finally {
  await rm(theme, { recursive: true, force: true })
}
