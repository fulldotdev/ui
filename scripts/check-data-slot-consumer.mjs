import { spawn } from "node:child_process"
import { copyFile, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises"
import { createServer } from "node:http"
import { tmpdir } from "node:os"
import { join } from "node:path"

const repo = new URL("../", import.meta.url)
const registry = JSON.parse(
  await readFile(new URL("registry.json", repo), "utf8")
)
const affected = new Set(
  registry.items
    .filter((item) =>
      item.dependencies?.some((dep) => dep.startsWith("@data-slot/"))
    )
    .map((item) => item.name)
)
let previousSize
while (previousSize !== affected.size) {
  previousSize = affected.size
  for (const item of registry.items) {
    if (
      item.registryDependencies?.some((dep) =>
        affected.has(dep.replace("@fulldev/", ""))
      )
    )
      affected.add(item.name)
  }
}
const items = registry.items.filter(
  (item) =>
    affected.has(item.name) &&
    ["registry:ui", "registry:block"].includes(item.type)
)
const dir = await mkdtemp(join(tmpdir(), "fulldev-data-slot-consumer-"))
const run = (args, cwd = dir) =>
  new Promise((resolve, reject) => {
    const child = spawn("pnpm", args, { cwd, stdio: "inherit" })
    child.on("error", reject)
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`pnpm ${args.join(" ")} exited ${code}`))
    )
  })

const server = createServer(async (request, response) => {
  const name = request.url?.match(/^\/r\/([a-z0-9-]+)\.json$/)?.[1]
  if (!name) {
    response.writeHead(404).end()
    return
  }
  try {
    const body = await readFile(new URL(`public/r/${name}.json`, repo))
    response.writeHead(200, { "Content-Type": "application/json" }).end(body)
  } catch {
    response.writeHead(404).end()
  }
})
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
const port = server.address().port
try {
  await mkdir(join(dir, "src/pages"), { recursive: true })
  await mkdir(join(dir, "src/styles"), { recursive: true })
  const pkg = JSON.parse(await readFile(new URL("package.json", repo), "utf8"))
  await writeFile(
    join(dir, "package.json"),
    JSON.stringify(
      {
        name: "data-slot-consumer",
        private: true,
        type: "module",
        packageManager: pkg.packageManager,
        dependencies: Object.fromEntries(
          ["astro", "tailwindcss", "@tailwindcss/vite"].map((name) => [
            name,
            pkg.dependencies[name],
          ])
        ),
        devDependencies: {
          "@astrojs/check": pkg.devDependencies["@astrojs/check"],
          typescript: pkg.dependencies.typescript,
        },
      },
      null,
      2
    )
  )
  const components = JSON.parse(
    await readFile(new URL("components.json", repo), "utf8")
  )
  components.registries = {
    "@fulldev": `http://127.0.0.1:${port}/r/{name}.json`,
  }
  await writeFile(
    join(dir, "components.json"),
    JSON.stringify(components, null, 2)
  )
  await writeFile(
    join(dir, "tsconfig.json"),
    JSON.stringify({
      extends: "astro/tsconfigs/strict",
      compilerOptions: { baseUrl: ".", paths: { "@/*": ["src/*"] } },
    })
  )
  await writeFile(
    join(dir, "astro.config.mjs"),
    'import {defineConfig} from "astro/config"; import tailwind from "@tailwindcss/vite"; export default defineConfig({vite:{plugins:[tailwind()]}});\n'
  )
  await writeFile(
    join(dir, "src/styles/global.css"),
    '@import "tailwindcss";\n'
  )
  await run(["install"])
  await run(
    [
      "exec",
      "shadcn",
      "add",
      "--cwd",
      dir,
      "--yes",
      "--overwrite",
      "@fulldev/init",
      ...items.map((item) => `@fulldev/${item.name}`),
    ],
    repo
  )
  for (const page of ["index", "next"])
    await copyFile(
      new URL("tests/fixtures/data-slot-consumer.astro", repo),
      join(dir, `src/pages/${page}.astro`)
    )
  await run(["exec", "astro", "build"])
  await run(["exec", "astro", "check"])
  console.log(
    `Consumer passed: ${items.length} affected components/blocks plus their registry dependencies, installed through shadcn into ${dir}`
  )
} finally {
  await new Promise((resolve) => server.close(resolve))
}
if (process.argv.includes("--serve"))
  await run([
    "exec",
    "astro",
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    "4176",
  ])
