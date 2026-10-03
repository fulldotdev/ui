// Check that every registry item installs as-is with the shadcn CLI:
// - every local file an item imports ships with the item or a registry dependency,
// - every package an item imports is listed in its dependencies,
// - item files are UTF-8 text, because shadcn build reads files as UTF-8,
// - transformed files do not start with whitespace or a comment, because the
//   shadcn CLI drops leading trivia when it rewrites them on install.
import { existsSync, readFileSync } from "node:fs"
import { builtinModules } from "node:module"
import { dirname, join, normalize } from "node:path"

const registry = JSON.parse(readFileSync("registry.json", "utf8"))
const items = new Map(registry.items.map((item) => [item.name, item]))
const errors = []

// Projects install @fulldev/init (through `shadcn init` with @fulldev/base, or
// `shadcn add`) before any other item.
const baseItems = ["init"]
// Projects set up Tailwind before installing from a shadcn registry.
const prerequisites = new Set(["astro", "tailwindcss"])
// The project's own stylesheet, which `shadcn init` writes the theme into.
const stylesheet = normalize("src/styles/global.css")
const builtins = new Set(builtinModules)
const decoder = new TextDecoder("utf-8", { fatal: true })
const extensions = ["", ".ts", ".astro", ".js", "/index.ts"]

const installedPath = (file) => normalize(file.target ?? file.path)
const packageName = (dependency) =>
  dependency.match(/^(@[^/@]+\/[^/@]+|[^/@]+)/)?.[1]

const collect = (name, seen = new Set()) => {
  if (seen.has(name)) return seen
  seen.add(name)
  for (const dependency of items.get(name)?.registryDependencies ?? []) {
    collect(dependency.replace(/^@fulldev\//, ""), seen)
  }
  return seen
}

const resolve = (specifier, from, provided) => {
  const base = specifier.startsWith("@/")
    ? join("src", specifier.slice(2))
    : join(dirname(from), specifier)
  return extensions
    .map((extension) => normalize(base + extension))
    .find((candidate) => provided.has(candidate))
}

const specifiers = (source) =>
  [
    ...source.matchAll(
      /(?:^|[\s;])(?:import|export)\s[^"'`;]*?from\s*["']([^"']+)["']/gm
    ),
    ...source.matchAll(/(?:^|[\s;])import\s*["']([^"']+)["']/gm),
    ...source.matchAll(/\bimport\(\s*["']([^"']+)["']\s*\)/g),
    ...source.matchAll(/@import\s+["']([^"']+)["']/g),
  ].map((match) => match[1])

for (const item of registry.items) {
  if (item.type === "registry:item") continue
  const scope = [...collect(item.name), ...baseItems]
  const provided = new Set([stylesheet])
  const packages = new Set()
  for (const name of scope) {
    const scoped = items.get(name)
    if (!scoped) {
      errors.push(`${item.name}: unknown registry dependency @fulldev/${name}`)
      continue
    }
    for (const file of scoped.files ?? []) provided.add(installedPath(file))
    for (const dependency of scoped.dependencies ?? []) {
      packages.add(packageName(dependency))
    }
  }

  for (const file of item.files ?? []) {
    if (!existsSync(file.path)) {
      errors.push(`${item.name}: ${file.path} does not exist`)
      continue
    }
    const bytes = readFileSync(file.path)
    let source
    try {
      source = decoder.decode(bytes)
      if (source.includes("\0")) throw new Error("NUL byte")
    } catch {
      errors.push(
        `${item.name}: ${file.path} is binary; registry JSON only carries UTF-8 text`
      )
      continue
    }

    const transformed = !["registry:file", "registry:item"].includes(file.type)
    if (transformed && /^(\s|\/\/|\/\*)/.test(source)) {
      errors.push(
        `${item.name}: ${file.path} starts with whitespace or a comment, which the shadcn CLI drops on install`
      )
    }

    for (const specifier of specifiers(source)) {
      if (specifier.startsWith(".") || specifier.startsWith("@/")) {
        const problem = `${item.name}: ${file.path} imports "${specifier}"`
        if (!resolve(specifier, installedPath(file), provided)) {
          errors.push(
            `${problem}, which no file in the item or its registry dependencies provides`
          )
        }
        continue
      }
      const name = packageName(specifier.replace(/^node:/, ""))
      if (
        specifier.startsWith("node:") ||
        specifier.startsWith("astro:") ||
        builtins.has(name) ||
        prerequisites.has(name) ||
        packages.has(name)
      ) {
        continue
      }
      errors.push(
        `${item.name}: ${file.path} imports package "${name}", which is not in the item's dependencies`
      )
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"))
  console.error(`\n${errors.length} registry problems found.`)
  process.exit(1)
}
console.log(`Validated ${registry.items.length} registry items.`)
