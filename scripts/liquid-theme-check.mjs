// Run Shopify Theme Check on liquid/, which is stored as the theme it installs
// into. It reports what Shopify rejects but the LiquidJS renderer in the docs
// and tests accepts, such as unknown filters. Errors fail; warnings are listed.
import { relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { Severity, themeCheckRun } from "@shopify/theme-check-node"

const root = resolve("liquid")
const { offenses } = await themeCheckRun(
  root,
  resolve(root, ".theme-check.yml")
)
for (const offense of offenses) {
  const file = relative(".", fileURLToPath(offense.uri))
  const level = Severity[offense.severity].toLowerCase()
  console.log(
    `${file}:${offense.start.line}:${offense.start.character + 1} ${level} ${offense.check}: ${offense.message}`
  )
}
if (offenses.some((offense) => offense.severity === Severity.ERROR))
  process.exitCode = 1
