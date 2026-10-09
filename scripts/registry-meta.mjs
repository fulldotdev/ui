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
      "Class helper, dependencies, and base styles for an existing project. Leaves theme tokens alone.",
    docs: `${site}/docs/installation/`,
  },
  base: {
    title: "Base",
    description:
      "Sets up a new project with `shadcn init`: style, registry, theme, class helper, and dependencies.",
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
  "extends",
  "title",
  "description",
  "categories",
  "docs",
  "config",
  "dependencies",
  "registryDependencies",
  "files",
  "cssVars",
  "css",
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
    const category = item.name.replace(/-\d+$/, "")
    const fm =
      readFrontmatter(`src/content/pages/blocks/${item.name}.mdx`) ??
      readFrontmatter(`src/content/pages/blocks/${category}.mdx`)
    if (fm) {
      Object.assign(meta, {
        title: `${fm.title} ${item.name.match(/\d+$/)?.[0] ?? ""}`.trim(),
        description: fm.description,
        categories: [fm.category ?? category],
        docs: `${site}/blocks/${category}/`,
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
  return sorted({ ...item, ...meta })
})

// Known fields first, in a fixed order; keep any other schema field after them.
function sorted(item) {
  const keys = [
    ...order.filter((key) => key in item),
    ...Object.keys(item).filter((key) => !order.includes(key)),
  ]
  return Object.fromEntries(keys.map((key) => [key, item[key]]))
}

const bundle = (items, name, type) => {
  const item = items.find((entry) => entry.name === name)
  item.registryDependencies = items
    .filter((entry) => entry.type === type)
    .map((entry) => `@fulldev/${entry.name}`)
    .sort()
}
bundle(registry.items, "components", "registry:ui")
bundle(registry.items, "blocks", "registry:block")

writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n")
console.log(`Synced metadata for ${registry.items.length} registry items.`)

// The React registry shares base and init with this one; base points the
// @fulldev registry at the React items instead.
const reactPath = new URL("../react/registry.json", import.meta.url)
const react = JSON.parse(readFileSync(reactPath, "utf8"))
const gallery = `${site}/react/`
const reactManual = {
  components: {
    title: "All components",
    description: "Installs every Fulldev UI React component.",
  },
  blocks: {
    title: "All blocks",
    description: "Installs every Fulldev UI React block.",
  },
}
react.items = react.items.map((item) => {
  if (item.name === "base" || item.name === "init") {
    const shared = structuredClone(
      registry.items.find((entry) => entry.name === item.name)
    )
    if (shared.config) {
      shared.config.registries["@fulldev"] =
        `${site}/r/react/styles/{style}/{name}.json`
    }
    return sorted({ ...shared, docs: gallery })
  }
  if (reactManual[item.name]) {
    return sorted({
      ...item,
      name: item.name,
      type: "registry:item",
      ...reactManual[item.name],
      docs: gallery,
    })
  }
  return sorted(item)
})
bundle(react.items, "components", "registry:ui")
bundle(react.items, "blocks", "registry:block")

writeFileSync(reactPath, JSON.stringify(react, null, 2) + "\n")
console.log(`Synced metadata for ${react.items.length} React registry items.`)
