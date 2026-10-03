// Bring the Fulldev UI items installed in a client site up to date, keeping the
// site's own edits. Run it inside a worktree of the site, on a fresh branch from
// main, with this ui checkout on an up-to-date main:
//
//   node ~/projects/ui/scripts/update-site.mjs                  # dry run, changes nothing
//   node ~/projects/ui/scripts/update-site.mjs --write          # update the site
//   node ~/projects/ui/scripts/update-site.mjs --report <file>  # also save the report
//
// 1. Finds installed registry items and classifies each installed file as
//    current, old (an unmodified earlier Fulldev UI release), or custom (edited).
//    It compares against the built registry in public/r for the site's style,
//    not the source files, which have cn-* placeholders since 0.17. Source
//    versions without placeholders still count, for installs from before then.
// 2. With --write, reinstalls those items with the shadcn CLI from the live
//    registry, which also adds new files, registry dependencies, and npm
//    dependencies. It needs a clean git worktree, so every change shows in git.
// 3. Re-applies local edits to custom files with a three-way merge, using the
//    closest earlier release as the base. A conflict keeps the local file and
//    writes the new version next to it as <file>.upstream.
// 4. Any other existing file the install changed, apart from package manifests,
//    lockfiles and components.json, is restored the same way, so a client edit
//    is never overwritten silently.
//
// Review every file in `merged` and `conflicts`, and delete the .upstream files.
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const UI = fileURLToPath(new URL("..", import.meta.url))
const ITEM_TYPES = ["registry:ui", "registry:block"]
const LOCKFILES = new Set([
  "pnpm-lock.yaml",
  "package-lock.json",
  "yarn.lock",
  "bun.lock",
  "bun.lockb",
])
// Files the install is expected to change.
const EXPECTED = new Set(["components.json", "package.json", ...LOCKFILES])

const run = (cmd, args, cwd, options = {}) =>
  execFileSync(cmd, args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 1 << 28,
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  })
const git = (args, cwd) => run("git", args, cwd)

// Compare ignoring formatting.
const norm = (s) =>
  s
    .replace(/;(\s*\n)/g, "$1")
    .replace(/'/g, '"')
    .replace(/\s+/g, "")

const lineDiff = (a, b) => {
  const A = a.split("\n")
  const B = b.split("\n")
  const setA = new Set(A)
  const setB = new Set(B)
  return (
    A.filter((l) => !setB.has(l)).length + B.filter((l) => !setA.has(l)).length
  )
}

// The site's style decides which built registry it installed from. Before 0.17
// every install got the output that public/r/{name}.json still serves.
const builtPaths = (name, style) => [
  ...(/^base-/.test(style ?? "")
    ? [`public/r/styles/${style}/${name}.json`]
    : []),
  `public/r/${name}.json`,
]

// Every released version of one file of an item, newest first. --full-history
// keeps versions from merged branches that a later merge replaced. The first entry
// is the current version when the item is still in the registry.
const createHistory = (ui) => {
  const shown = new Map()
  const show = (commit, file) => {
    const key = `${commit}:${file}`
    if (!shown.has(key)) {
      try {
        shown.set(key, git(["show", key], ui))
      } catch {
        shown.set(key, null)
      }
    }
    return shown.get(key)
  }
  const fileOf = (json, source) => {
    try {
      const entry = JSON.parse(json).files?.find((f) => f.path === source)
      return typeof entry?.content === "string" ? entry.content : null
    } catch {
      return null
    }
  }
  return (name, source, style) => {
    const built = builtPaths(name, style)
    const commits = git(
      ["log", "--format=%H", "--full-history", "HEAD", "--", ...built, source],
      ui
    )
      .split("\n")
      .filter(Boolean)
    const out = []
    const add = (text) => {
      if (text !== null && !out.includes(text)) out.push(text)
    }
    const current = show("HEAD", built[0])
    add(current === null ? null : fileOf(current, source))
    for (const commit of commits) {
      for (const file of built) {
        const json = show(commit, file)
        if (json !== null) add(fileOf(json, source))
      }
      // Sources with cn-* placeholders were never installed as they are.
      const text = show(commit, source)
      if (text !== null && !/\bcn-[a-z]/.test(text)) add(text)
    }
    return out
  }
}

// Format with the site's Prettier config, so comparisons ignore formatting.
const createFormat = (cwd) => {
  const bin = path.join(cwd, "node_modules/.bin/prettier")
  const cache = new Map()
  const format = (text, file) => {
    if (!fs.existsSync(bin)) return text
    const key = `${file}\0${text}`
    if (!cache.has(key)) {
      try {
        cache.set(
          key,
          run(bin, ["--stdin-filepath", path.join(cwd, file)], cwd, {
            input: text,
            stdio: ["pipe", "pipe", "ignore"],
          })
        )
      } catch {
        cache.set(key, text)
      }
    }
    return cache.get(key)
  }
  format.bin = fs.existsSync(bin) ? bin : null
  return format
}

const repoName = (cwd) => {
  try {
    return git(["remote", "get-url", "origin"], cwd)
      .trim()
      .replace(/\.git$/, "")
      .split("/")
      .pop()
  } catch {
    return path.basename(cwd)
  }
}

// 1. Classify. Read-only.
export const classify = ({ cwd = process.cwd(), ui = UI } = {}) => {
  const registry = JSON.parse(
    fs.readFileSync(path.join(ui, "registry.json"), "utf8")
  )
  const config = JSON.parse(
    fs.readFileSync(path.join(cwd, "components.json"), "utf8")
  )
  const history = createHistory(ui)
  const format = createFormat(cwd)
  const installed = []
  const files = []
  const seen = new Set()
  for (const item of registry.items) {
    const present = (item.files ?? []).filter((f) =>
      fs.existsSync(path.join(cwd, f.target ?? f.path))
    )
    // Shared assets such as placeholder.svg do not mean the item is installed.
    if (
      ITEM_TYPES.includes(item.type) &&
      present.some((f) => /^src\/components\//.test(f.target ?? f.path))
    ) {
      installed.push(item.name)
    }
    // Still classify every file the install can write, also of dependencies.
    for (const f of present) {
      const file = f.target ?? f.path
      if (seen.has(file)) continue
      seen.add(file)
      const local = fs.readFileSync(path.join(cwd, file), "utf8")
      const formatted = history(item.name, f.path, config.style).map((v) =>
        format(v, file)
      )
      const match = formatted.findIndex((v) => norm(v) === norm(local))
      let status = "custom"
      if (match === 0) status = "current"
      else if (match > 0) status = "old"
      let base = null
      if (status === "custom" && formatted.length) {
        base = formatted.reduce((best, v) =>
          lineDiff(v, local) < lineDiff(best, local) ? v : best
        )
      }
      files.push({ item: item.name, file, status, local, base })
    }
  }
  return {
    report: {
      repo: repoName(cwd),
      ui: git(["rev-parse", "--short", "HEAD"], ui).trim(),
      style: config.style ?? null,
      items: installed,
      counts: Object.fromEntries(
        ["current", "old", "custom"].map((s) => [
          s,
          files.filter((f) => f.status === s).length,
        ])
      ),
      custom: files.filter((f) => f.status === "custom").map((f) => f.file),
    },
    files,
    format,
  }
}

// Reinstall from the live registry in the project's style.
const shadcnAdd = ({ cwd, items }) => {
  const file = path.join(cwd, "components.json")
  const config = JSON.parse(fs.readFileSync(file, "utf8"))
  config.registries = {
    ...config.registries,
    "@fulldev": /^base-/.test(config.style ?? "")
      ? "https://ui.full.dev/r/styles/{style}/{name}.json"
      : "https://ui.full.dev/r/{name}.json",
  }
  fs.writeFileSync(file, JSON.stringify(config, null, 2) + "\n")
  execFileSync(
    "npx",
    [
      "-y",
      "shadcn@latest",
      "add",
      ...items.map((n) => `@fulldev/${n}`),
      "--overwrite",
      "--yes",
    ],
    { cwd, stdio: "inherit" }
  )
}

const changed = (cwd) =>
  git(["diff", "--name-only", "-z", "HEAD"], cwd).split("\0").filter(Boolean)
const untracked = (cwd) =>
  git(["ls-files", "--others", "--exclude-standard", "-z"], cwd)
    .split("\0")
    .filter(Boolean)

// Keep the local file and put the new version next to it for review.
const keepLocal = (cwd, file, local, theirs) => {
  const target = path.join(cwd, file)
  fs.writeFileSync(target, local)
  fs.writeFileSync(`${target}.upstream`, theirs)
}

// 2 to 4. Writes to the site.
export const update = ({
  cwd = process.cwd(),
  ui = UI,
  install = shadcnAdd,
} = {}) => {
  if (git(["status", "--porcelain"], cwd).trim()) {
    throw new Error(
      "--write needs a clean git worktree, so every change shows in git. Commit or stash first."
    )
  }
  const { report, files, format } = classify({ cwd, ui })
  Object.assign(report, { merged: [], conflicts: [], added: [] })
  if (!report.items.length) return report

  install({ cwd, items: report.items })

  // 3. Re-apply local edits.
  for (const f of files.filter((f) => f.status === "custom")) {
    const target = path.join(cwd, f.file)
    const theirs = format(fs.readFileSync(target, "utf8"), f.file)
    if (norm(theirs) === norm(f.local)) continue
    const dir = fs.mkdtempSync(
      path.join(fs.realpathSync(os.tmpdir()), "fd-merge-")
    )
    fs.writeFileSync(`${dir}/ours`, f.local)
    fs.writeFileSync(`${dir}/base`, f.base ?? "")
    fs.writeFileSync(`${dir}/theirs`, theirs)
    let merged
    let conflict = false
    try {
      merged = run("git", [
        "merge-file",
        "-p",
        `${dir}/ours`,
        `${dir}/base`,
        `${dir}/theirs`,
      ])
    } catch (error) {
      conflict = true
      merged = error.stdout
    }
    fs.rmSync(dir, { recursive: true, force: true })
    if (conflict || !f.base) {
      keepLocal(cwd, f.file, f.local, theirs)
      report.conflicts.push(f.file)
    } else {
      fs.writeFileSync(target, merged)
      report.merged.push(f.file)
    }
  }

  // 4. Restore files that were not known unmodified registry files.
  const known = new Set(files.map((f) => f.file))
  for (const file of changed(cwd)) {
    if (known.has(file) || EXPECTED.has(file)) continue
    const target = path.join(cwd, file)
    if (!fs.existsSync(target)) continue
    const theirs = fs.readFileSync(target)
    keepLocal(
      cwd,
      file,
      execFileSync("git", ["show", `HEAD:${file}`], {
        cwd,
        maxBuffer: 1 << 28,
      }),
      theirs
    )
    report.conflicts.push(file)
  }

  report.added = untracked(cwd).filter((f) => !f.endsWith(".upstream"))

  // Format only what the update wrote, not the site's other files.
  const touched = [...changed(cwd), ...report.added].filter(
    (f) => !LOCKFILES.has(f)
  )
  if (format.bin && touched.length) {
    try {
      run(format.bin, ["--write", "--ignore-unknown", ...touched], cwd)
    } catch {
      // Formatting is a convenience; the report still lists every file.
    }
  }
  return report
}

// realpath, because /tmp and other paths can be symlinks.
if (
  process.argv[1] &&
  fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const args = process.argv.slice(2)
  const write = args.includes("--write")
  const reportFile = args.includes("--report")
    ? args[args.indexOf("--report") + 1]
    : null
  const unknown = args.filter(
    (a, i) => !["--write", "--report"].includes(a) && args[i - 1] !== "--report"
  )
  if (unknown.length || (args.includes("--report") && !reportFile)) {
    console.error(
      "Usage: node scripts/update-site.mjs [--write] [--report <file>]"
    )
    process.exit(1)
  }
  try {
    const report = write ? update() : { ...classify().report, dryRun: true }
    const json = JSON.stringify(report, null, 1)
    if (reportFile) fs.writeFileSync(reportFile, json + "\n")
    console.log(json)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
