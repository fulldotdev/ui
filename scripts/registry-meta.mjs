// Sync registry item metadata (title, description, categories, docs) from the
// matching documentation page frontmatter, and keep the bundle items complete.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import ts from "typescript"

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

// One example item per folder of src/components/examples: the Astro ports of
// the examples from the shadcn/ui docs for that component, with the packages
// and registry items their imports need.
const titleOf = (name) =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
const syncExamples = (items, root) => {
  const dir = `${root}src/components/examples/`
  const pkg = JSON.parse(readFileSync(`${root}package.json`, "utf8"))
  const folders = existsSync(dir) ? readdirSync(dir).sort() : []
  // A local import that no registry item provides ships with the example,
  // such as a docs helper or hook.
  const resolveLocal = (specifier) =>
    ["", ".ts", ".tsx"]
      .map((extension) => `src/${specifier.slice(2)}${extension}`)
      .find((path) => existsSync(root + path))
  const examples = folders.map((family) => {
    const dependencies = new Set()
    const registryDependencies = new Set()
    const files = readdirSync(dir + family)
      .sort()
      .map((file) => ({
        path: `src/components/examples/${family}/${file}`,
        type: "registry:component",
      }))
    for (let index = 0; index < files.length; index++) {
      const source = readFileSync(root + files[index].path, "utf8")
      const imports = ts.preProcessFile(source, true, true).importedFiles
      for (const { fileName: specifier } of imports) {
        if (specifier.startsWith(".")) continue
        const item = specifier.match(
          /^@\/(?:components\/(?:ui|blocks)|hooks)\/([^/]+)$/
        )?.[1]
        if (item && items.some((entry) => entry.name === item)) {
          registryDependencies.add(`@fulldev/${item}`)
          continue
        }
        if (specifier === "@/lib/utils") continue
        if (specifier.startsWith("@/")) {
          const path = resolveLocal(specifier)
          if (!path) throw new Error(`${family}: cannot resolve ${specifier}`)
          if (!files.some((file) => file.path === path))
            files.push({
              path,
              type: path.startsWith("src/hooks/")
                ? "registry:hook"
                : path.startsWith("src/lib/")
                  ? "registry:lib"
                  : "registry:component",
            })
          continue
        }
        const name = specifier.match(/^(@[^/]+\/[^/]+|[^/]+)/)[1]
        if (["react", "react-dom", "astro"].includes(name)) continue
        const version = pkg.dependencies?.[name]
        dependencies.add(
          version && /^\d/.test(version) ? `${name}@${version}` : name
        )
      }
    }
    const title = titleOf(family)
    return sorted({
      name: `${family}-examples`,
      type: "registry:example",
      title: `${title} examples`,
      description: `The examples from the shadcn/ui ${title} docs.`,
      docs: `${site}/components/${family}/`,
      dependencies: dependencies.size ? [...dependencies].sort() : undefined,
      registryDependencies: [...registryDependencies].sort(),
      files,
    })
  })
  const others = items.filter((item) => item.type !== "registry:example")
  return [...others, ...examples]
}

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
registry.items = syncExamples(registry.items, "")

writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n")
console.log(`Synced metadata for ${registry.items.length} registry items.`)

// The React registry is an extension of shadcn/ui: Fulldev extras and blocks
// only. Projects set up with the official `shadcn init`; standard components
// install from the shadcn/ui registry by their plain name.
const reactPath = new URL("../react/registry.json", import.meta.url)
const react = JSON.parse(readFileSync(reactPath, "utf8"))
const reactManual = {
  components: {
    title: "All extras",
    description: "Installs every Fulldev UI React extra.",
    docs: `${site}/react/components/`,
  },
  blocks: {
    title: "All blocks",
    description: "Installs every Fulldev UI React block.",
    docs: `${site}/react/blocks/`,
  },
}
react.items = react.items.map((item) => {
  if (reactManual[item.name]) {
    return sorted({ ...item, type: "registry:item", ...reactManual[item.name] })
  }
  if (item.type === "registry:ui")
    return sorted({ ...item, docs: `${site}/react/components/${item.name}/` })
  if (item.type === "registry:block") {
    const category = item.name.replace(/-\d+$/, "")
    return sorted({ ...item, docs: `${site}/react/blocks/${category}/` })
  }
  return sorted(item)
})
bundle(react.items, "components", "registry:ui")
bundle(react.items, "blocks", "registry:block")

writeFileSync(reactPath, JSON.stringify(react, null, 2) + "\n")
console.log(`Synced metadata for ${react.items.length} React registry items.`)

// The Liquid registry takes its titles, descriptions and docs links from the
// Liquid docs pages; shared items without a page keep their own.
const liquidPath = new URL("../liquid/registry.json", import.meta.url)
const liquid = JSON.parse(readFileSync(liquidPath, "utf8"))
liquid.items = liquid.items.map((item) => {
  const fm = readFrontmatter(
    `src/content/pages/liquid/components/${item.name}.mdx`
  )
  if (!fm) return sorted(item)
  return sorted({
    ...item,
    title: fm.title,
    description: fm.description,
    docs: `${site}/liquid/components/${item.name}/`,
  })
})

writeFileSync(liquidPath, JSON.stringify(liquid, null, 2) + "\n")
console.log(`Synced metadata for ${liquid.items.length} Liquid registry items.`)
