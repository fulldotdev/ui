import { execFileSync } from "node:child_process"
import { readdirSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"

const registry = JSON.parse(readFileSync(new URL("../registry.json", import.meta.url)))
const outputDir = new URL("../public/r/", import.meta.url)

const expectedFiles = new Set([
  "registry.json",
  ...registry.items.map((item) => `${item.name}.json`),
])

execFileSync("pnpm", ["dlx", "shadcn@latest", "build"], {
  stdio: "inherit",
})

for (const entry of readdirSync(outputDir)) {
  if (!entry.endsWith(".json")) continue
  if (expectedFiles.has(entry)) continue

  rmSync(join(outputDir.pathname, entry))
}
