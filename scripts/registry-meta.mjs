// Sync registry item metadata (title, description, categories, docs) from the
// matching documentation page frontmatter, and keep the bundle items complete.
import { existsSync, readFileSync, writeFileSync } from "node:fs"

const registryPath = new URL("../registry.json", import.meta.url)
const registry = JSON.parse(readFileSync(registryPath, "utf8"))
const site = "https://ui.full.dev"

const readFrontmatter = (path) => {
  if (!existsSync(path)) return undefined
  const source = readFileSync(path, "utf8")
  const match = source.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return undefined
  const data = {}
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([a-zA-Z]+):\s*(.*)$/)
    if (pair) data[pair[1]] = pair[2].replace(/^["']|["']$/g, "")
  }
  return data
}

const manual = {
  init: {
    title: "Init",
    description:
      "Shared setup: class helper, Tailwind token layer, and dependencies.",
    docs: `${site}/docs/installation/`,
  },
  components: {
    title: "All components",
    description: "Installs every Fulldev UI component.",
    docs: `${site}/components/`,
  },
  blocks: {
    title: "All blocks",
    description: "Installs every Fulldev UI block.",
    docs: `${site}/blocks/`,
  },
  "beta-repo-setup": {
    title: "Repo setup (beta)",
    description:
      "Content, schema, layout, and route scaffolding for a content-driven Astro site.",
    docs: `${site}/docs/layouts/`,
  },
}

const order = [
  "name",
  "type",
  "title",
  "description",
  "categories",
  "docs",
  "dependencies",
  "registryDependencies",
  "files",
]

registry.items = registry.items.map((item) => {
  const meta = {}
  if (manual[item.name]) {
    Object.assign(meta, manual[item.name])
  } else if (item.type === "registry:ui") {
    const fm = readFrontmatter(`src/content/pages/components/${item.name}.mdx`)
    if (!fm) throw new Error(`Missing docs page for component ${item.name}`)
    Object.assign(meta, {
      title: fm.title,
      description: fm.description,
      categories: ["ui"],
      docs: `${site}/components/${item.name}/`,
    })
  } else if (item.type === "registry:block") {
    const fm = readFrontmatter(`src/content/pages/blocks/${item.name}.mdx`)
    const category = item.name.replace(/-\d+$/, "")
    if (fm) {
      Object.assign(meta, {
        title: fm.title,
        description: fm.description,
        categories: [fm.category ?? category],
        docs: `${site}/blocks/${item.name}/`,
      })
    } else {
      // Docs-site blocks without a dedicated page.
      const title = item.name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
      Object.assign(meta, {
        title,
        categories: [category],
        docs: `${site}/blocks/`,
      })
    }
  }
  const merged = { ...item, ...meta }
  return Object.fromEntries(
    order.filter((key) => key in merged).map((key) => [key, merged[key]])
  )
})

const bundle = (name, type) => {
  const item = registry.items.find((entry) => entry.name === name)
  item.registryDependencies = registry.items
    .filter((entry) => entry.type === type)
    .map((entry) => `@fulldev/${entry.name}`)
    .sort()
}
bundle("components", "registry:ui")
bundle("blocks", "registry:block")

writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n")
console.log(`Synced metadata for ${registry.items.length} registry items.`)
