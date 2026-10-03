// Checks scripts/update-site.mjs against small fixture repos: a ui repo with
// release history, and a site with installed files. No network: the install is
// replaced by a function that writes the new release.
import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { after, test } from "node:test"
import { fileURLToPath } from "node:url"

const script = new URL("../scripts/update-site.mjs", import.meta.url)
const { classify, update } = await import(script)

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "update-site-test-"))
after(() => fs.rmSync(temp, { recursive: true, force: true }))

const git = (cwd, ...args) =>
  execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  })
const write = (dir, files) => {
  for (const [file, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true })
    fs.writeFileSync(path.join(dir, file), text)
  }
}
const read = (dir, file) => fs.readFileSync(path.join(dir, file), "utf8")
let count = 0
const repo = (name) => {
  const dir = path.join(temp, `${name}-${count++}`)
  fs.mkdirSync(dir)
  git(dir, "init", "-q", "-b", "main")
  git(dir, "config", "user.name", "Test")
  git(dir, "config", "user.email", "test@example.com")
  git(dir, "config", "commit.gpgsign", "false")
  return dir
}
const commit = (dir, files) => {
  write(dir, files)
  git(dir, "add", "-A")
  git(dir, "commit", "-q", "-m", "release")
}

const box = (classes, extra = "") => `---
import { cn } from "@/lib/utils"
const { class: className, ...props } = Astro.props
---

<div
  class={cn("${classes}", className)}
  data-slot="box"
  {...props}
>
  <slot />${extra}
</div>
`
// Releases of one component. 0.16 installed the source as it was; since 0.17
// the source has placeholders and installs come from public/r.
const V16 = box("rounded p-2").replace('data-slot="box"', "data-box")
const V17 = box("rounded-lg p-4")
const V18 = box("rounded-lg p-4", '\n  <slot name="footer" />')
const SOURCE17 = box("cn-box")
const SOURCE18 = box("cn-box", '\n  <slot name="footer" />')
const UTILS = 'export { cn } from "cn"\n'

const BOX = "src/components/ui/box/box.astro"
const UTILS_FILE = "src/lib/utils.ts"
const built = (content) =>
  JSON.stringify({ name: "box", files: [{ path: BOX, content }] })

const createUi = (
  releases = [
    [SOURCE17, V17],
    [SOURCE18, V18],
  ]
) => {
  const ui = repo("ui")
  const registry = JSON.stringify({
    items: [
      { name: "box", type: "registry:ui", files: [{ path: BOX }] },
      { name: "utils", type: "registry:lib", files: [{ path: UTILS_FILE }] },
    ],
  })
  const utils = JSON.stringify({
    name: "utils",
    files: [{ path: UTILS_FILE, content: UTILS }],
  })
  commit(ui, {
    "registry.json": registry,
    [BOX]: V16,
    [UTILS_FILE]: UTILS,
    "public/r/utils.json": utils,
  })
  for (const [source, content] of releases) {
    commit(ui, {
      [BOX]: source,
      "public/r/box.json": built(content),
      "public/r/styles/base-vega/box.json": built(content),
      "public/r/styles/base-vega/utils.json": utils,
    })
  }
  return ui
}
const ui = createUi()

const createSite = (files) => {
  const site = repo("site")
  commit(site, {
    "components.json": JSON.stringify({ style: "base-vega" }),
    "src/styles/global.css": ":root { --brand: red; }\n",
    ...files,
  })
  return site
}
const status = (site) =>
  Object.fromEntries(
    classify({ cwd: site, ui }).files.map((f) => [f.file, f.status])
  )

test("an unmodified release since 0.17 is old, not custom", () => {
  assert.equal(status(createSite({ [BOX]: V17 }))[BOX], "old")
})

test("the latest release is current", () => {
  assert.equal(status(createSite({ [BOX]: V18 }))[BOX], "current")
})

test("an install from before 0.17 is still recognized", () => {
  assert.equal(status(createSite({ [BOX]: V16 }))[BOX], "old")
})

test("a release from a merged branch counts, also when the merge replaced it", () => {
  const branched = repo("ui")
  git(branched, "fetch", "-q", ui, "main")
  git(branched, "checkout", "-q", "-b", "main", "FETCH_HEAD")
  git(branched, "checkout", "-q", "-b", "side")
  const side = box("rounded-xl p-4")
  commit(branched, { "public/r/styles/base-vega/box.json": built(side) })
  git(branched, "checkout", "-q", "main")
  commit(branched, { "public/r/styles/base-vega/box.json": built(V18 + "\n") })
  git(branched, "merge", "-q", "-s", "ours", "--no-edit", "side")
  git(branched, "branch", "-q", "-D", "side")
  const site = createSite({ [BOX]: side })
  const { files } = classify({ cwd: site, ui: branched })
  assert.equal(files.find((f) => f.file === BOX).status, "old")
})

test("a customized file merges with the release it came from", () => {
  const edited = box("rounded-none p-8")
  const site = createSite({ [BOX]: edited })
  assert.equal(status(site)[BOX], "custom")
  const report = update({
    cwd: site,
    ui,
    install: ({ cwd }) => write(cwd, { [BOX]: V18 }),
  })
  assert.deepEqual(report.merged, [BOX])
  assert.deepEqual(report.conflicts, [])
  assert.equal(
    read(site, BOX),
    box("rounded-none p-8", '\n  <slot name="footer" />')
  )
})

test("an install never silently overwrites a customized file", () => {
  const utils = 'export { cn } from "cn"\nexport const brand = "red"\n'
  const site = createSite({ [BOX]: V17, [UTILS_FILE]: utils })
  const css = read(site, "src/styles/global.css")
  const report = update({
    cwd: site,
    ui,
    install: ({ cwd }) =>
      write(cwd, {
        [BOX]: V18,
        [UTILS_FILE]: UTILS,
        "src/styles/global.css": ":root { --brand: blue; }\n",
        "src/components/ui/box/index.ts":
          'export { default as Box } from "./box.astro"\n',
      }),
  })
  // A customized file of a registry dependency keeps its edit.
  assert.equal(read(site, UTILS_FILE), utils)
  assert.deepEqual(report.merged, [UTILS_FILE])
  // A file no registry item owns stays, with the new version next to it.
  assert.equal(read(site, "src/styles/global.css"), css)
  assert.equal(
    read(site, "src/styles/global.css.upstream"),
    ":root { --brand: blue; }\n"
  )
  assert.deepEqual(report.conflicts, ["src/styles/global.css"])
  // An unmodified file updates, and new files are listed.
  assert.equal(read(site, BOX), V18)
  assert.deepEqual(report.added, ["src/components/ui/box/index.ts"])
})

test("--write refuses a dirty worktree", () => {
  const site = createSite({ [BOX]: V17 })
  write(site, { [BOX]: V18 })
  assert.throws(
    () => update({ cwd: site, ui, install: () => assert.fail("installed") }),
    /clean git worktree/
  )
})

test("the command is a dry run unless --write is given", () => {
  const site = createSite({ [BOX]: V17 })
  // Through a symlink, as /tmp is one on macOS.
  const link = path.join(temp, `update-site-${count++}.mjs`)
  fs.symlinkSync(fileURLToPath(script), link)
  const output = execFileSync(process.execPath, [link], {
    cwd: site,
    encoding: "utf8",
  })
  assert.equal(JSON.parse(output).dryRun, true)
  assert.equal(git(site, "status", "--porcelain"), "")
})

test("a space inside a string is an edit", () => {
  for (const edit of ["rounded-lgp-4", "rounded-lg,p-4", "rounded-lg  p-4"]) {
    const site = createSite({ [BOX]: V17.replace("rounded-lg p-4", edit) })
    assert.equal(status(site)[BOX], "custom", edit)
  }
})

test("equally close releases that merge differently are a conflict", () => {
  const list = (order, brand, extra = "") =>
    `const items = [\n${order.map((i) => `  "${i}",\n`).join("")}]\n${gap}const brand = "${brand}"\n${gap}${extra}`
  // Unrelated lines, so the changes are separate hunks.
  const gap = "// one\n// two\n// three\n"
  const placeholder = (text) => `${text}// cn-box\n`
  const R1 = list(["a", "b"], "red")
  const R2 = list(["b", "a"], "red")
  const R3 = list(["a", "b"], "red", "export { items, brand }\n")
  const ordered = createUi(
    [R1, R2, R3].map((content) => [placeholder(content), content])
  )
  // Installed from R1, reordered by the client, and a new brand.
  const local = list(["b", "a"], "blue")
  const site = createSite({ [BOX]: local })
  const report = update({
    cwd: site,
    ui: ordered,
    install: ({ cwd }) => write(cwd, { [BOX]: R3 }),
  })
  assert.deepEqual(report.conflicts, [BOX])
  assert.equal(read(site, BOX), local)
  assert.equal(read(site, `${BOX}.upstream`), R3)
})

test("a failing install still keeps customized files", () => {
  const edited = box("rounded-none p-8")
  const site = createSite({ [BOX]: edited })
  const report = update({
    cwd: site,
    ui,
    install: ({ cwd }) => {
      write(cwd, { [BOX]: V18 })
      throw new Error("network")
    },
  })
  assert.match(report.error, /network/)
  assert.match(read(site, BOX), /rounded-none p-8/)
})

test("an ignored file the install changes is kept", () => {
  const site = createSite({ ".gitignore": "src/private/\n", [BOX]: V17 })
  write(site, { "src/private/config.ts": "export const key = 1\n" })
  const report = update({
    cwd: site,
    ui,
    install: ({ cwd }) =>
      write(cwd, { [BOX]: V18, "src/private/config.ts": "export {}\n" }),
  })
  assert.equal(read(site, "src/private/config.ts"), "export const key = 1\n")
  assert.equal(read(site, "src/private/config.ts.upstream"), "export {}\n")
  assert.deepEqual(report.conflicts, ["src/private/config.ts"])
})

test("deleted files come back, also when the install fails", () => {
  const edited = box("rounded-none p-8")
  const utils = 'export { cn } from "cn"\nexport const brand = "red"\n'
  const site = createSite({
    ".gitignore": "src/private/\n",
    [BOX]: edited,
    [UTILS_FILE]: utils,
  })
  write(site, { "src/private/config.ts": "export const key = 1\n" })
  const report = update({
    cwd: site,
    ui,
    install: ({ cwd }) => {
      fs.rmSync(path.join(cwd, "src/components"), { recursive: true })
      fs.rmSync(path.join(cwd, "src/private"), { recursive: true })
      write(cwd, { [UTILS_FILE]: UTILS })
      throw new Error("network")
    },
  })
  assert.match(report.error, /network/)
  assert.equal(read(site, BOX), edited)
  assert.equal(read(site, UTILS_FILE), utils)
  assert.equal(read(site, "src/private/config.ts"), "export const key = 1\n")
  assert.deepEqual(report.conflicts.sort(), [BOX, "src/private/config.ts"])
})
