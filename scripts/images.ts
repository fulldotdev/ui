// Keeps source photographs in src as WebP, quality 90, at most 3840 pixels on
// the longest edge. It reads the real format of each file, not its extension.
//
//   pnpm images                      fix everything under src
//   pnpm images <file>               also convert this file, such as a PNG photo
//   node scripts/images.ts --check   check src, part of pnpm check
//
// Fix mode converts JPEG content and PNG content saved as .jpg, .jpeg or .webp
// to WebP, renames WebP content saved as .jpg without encoding it again,
// resizes photos over the limit, and updates references in src. Real WebP
// files within the limit stay as they are, so they are never compressed
// twice. PNG, SVG and GIF files are graphics and keep their format.
//
// --check fails only on what a CloudCannon upload with the image options in
// AGENTS.md cannot produce: JPEG content in a .jpg or .jpeg file, and photos
// over the limit. Any other mismatch, such as a PNG saved as .webp by Safari
// on an iPhone, which cannot encode WebP, is a warning, so an editor's upload
// never fails a publish pull request.
import {
  existsSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, extname, join, relative, sep } from "node:path"
import sharp from "sharp"

const maxSize = 3840
const photoExtensions = [".jpg", ".jpeg", ".webp"]
const check = process.argv.includes("--check")
// Paths use forward slashes on every system, as references in src do.
const slash = (path: string) => path.split(sep).join("/")
const extra = process.argv
  .slice(2)
  .filter((arg) => !arg.startsWith("--"))
  .map((arg) => slash(relative(".", arg)))
for (const path of extra)
  if (!path.startsWith("src/")) throw new Error(`${path} is not in src`)

const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = slash(join(dir, entry.name))
    return entry.isDirectory() ? files(path) : [path]
  })
const sources = files("src")

type Task = {
  path: string
  target: string
  problem: string
  fail: boolean
  encode: boolean
}

async function inspect(path: string): Promise<Task | undefined> {
  const ext = extname(path).toLowerCase()
  if (!extra.includes(path) && !photoExtensions.includes(ext)) return
  const {
    format,
    width = 0,
    height = 0,
    pages = 1,
  } = await sharp(path)
    .metadata()
    .catch((error: unknown) => {
      throw new Error(`${path}: ${error}`, { cause: error })
    })
  if (pages > 1) return
  const oversized = Math.max(width, height) > maxSize
  const jpeg = format === "jpeg"
  const target = (ext ? path.slice(0, -ext.length) : path) + ".webp"
  if (format === "webp" && !oversized)
    return ext === ".webp"
      ? undefined
      : { path, target, problem: "is WebP", fail: false, encode: false }
  if (format !== "webp" && !jpeg && format !== "png") return
  const problem = oversized
    ? `is larger than ${maxSize} pixels`
    : `is ${jpeg ? "JPEG" : "PNG"}`
  const fail = oversized || (jpeg && [".jpg", ".jpeg"].includes(ext))
  return { path, target, problem, fail, encode: true }
}

const tasks: Task[] = []
for (const path of new Set([...sources, ...extra])) {
  const task = await inspect(path)
  if (task) tasks.push(task)
}

if (check) {
  for (const { path, problem, fail } of tasks)
    if (!fail) console.warn(`Warning: ${path} ${problem}; run pnpm images.`)
  const failures = tasks.filter((task) => task.fail)
  if (failures.length) {
    console.error(
      `Run pnpm images to convert:\n${failures.map((task) => `${task.path} ${task.problem}`).join("\n")}`
    )
    process.exit(1)
  }
  process.exit(0)
}

const targets = tasks.map((task) => task.target)
for (const { path, target } of tasks) {
  if (target === path) continue
  // /assets/<name> can mean src/assets or public/assets, so a WebP name that
  // public/assets already has would make a rewritten reference ambiguous.
  const taken = [
    target,
    path.startsWith("src/assets/") ? `public/${target.slice(4)}` : "",
  ].find((file) => file && existsSync(file))
  if (taken || targets.indexOf(target) !== targets.lastIndexOf(target))
    throw new Error(`${path}: ${taken ?? target} already exists`)
}

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
// Matches text in which any character but / may be URL-encoded, in either
// case, as Markdown writes my photo.jpg as my%20photo.jpg.
const encodable = (text: string) =>
  [...text]
    .map((char) => {
      if (char === "/") return char
      const bytes = [...new TextEncoder().encode(char)]
      const hex = bytes.map((byte) => `%${byte.toString(16).padStart(2, "0")}`)
      return `(?:${escape(char)}|(?i:${hex.join("")}))`
    })
    .join("")
// Write to a temporary file first, so a failed run never leaves half a file.
const write = (path: string, data: string | Buffer) => {
  const temp = `${path}.${process.pid}.tmp`
  try {
    writeFileSync(temp, data)
    renameSync(temp, path)
  } catch (error) {
    rmSync(temp, { force: true })
    throw error
  }
}
const textFiles = sources.filter((file) =>
  /\.(mdx?|ya?ml|json|astro|[jt]sx?|css)$/.test(file)
)
let before = 0
let after = 0
for (const { path, target, encode } of tasks) {
  const size = readFileSync(path).length
  if (encode) {
    // rotate() applies the EXIF orientation; metadata is not copied.
    const image = await sharp(path)
      .rotate()
      .resize(maxSize, maxSize, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90 })
      .toBuffer()
    write(target, image)
  } else write(target, readFileSync(path))
  const newSize = readFileSync(target).length
  before += size
  after += newSize
  console.log(`${path} -> ${target} (${size} -> ${newSize} bytes)`)
  if (target === path) continue

  // Point references such as ../../assets/photo.jpg, ./photo.jpg,
  // @/assets/photo.jpg, /src/assets/photo.jpg and, for uploads in src/assets,
  // /assets/photo.jpg at the WebP file, URL-encoded or not. A reference must
  // be a whole path, so photo.jpg does not match my-photo.jpg,
  // ../other/photo.jpg or photo.jpg.webp. Only the extension changes, so a
  // reference keeps its encoding.
  const ext = path.slice(target.length - ".webp".length)
  const paths = [`@/${path.slice(4)}`, `/${path}`]
  if (path.startsWith("src/assets/") && !existsSync(`public/${path.slice(4)}`))
    paths.push(`/${path.slice(4)}`)
  for (const file of textFiles) {
    const text = readFileSync(file, "utf8")
    const local = slash(relative(dirname(file), path))
    const updated = [local, ...paths].reduce((text, from) => {
      const stem = encodable(from.slice(0, from.length - ext.length))
      return text.replace(
        new RegExp(
          `(?<![\\w@./-])(\\./)?${stem}${escape(ext)}(?![\\w%-]|\\.\\w)`,
          "g"
        ),
        (match) => match.slice(0, match.length - ext.length) + ".webp"
      )
    }, text)
    if (updated !== text) write(file, updated)
  }
  // Delete the original last, so a failed update leaves it in place.
  rmSync(path)
}
if (tasks.length) console.log(`Total: ${before} -> ${after} bytes`)
