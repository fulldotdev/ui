import fs from "node:fs"

const changelog = fs.readFileSync("CHANGELOG.md", "utf8")
const version = JSON.parse(fs.readFileSync("package.json", "utf8")).version

const headings = [
  `## fulldev-ui@${version}`,
  `## ${version}`,
  `## v${version}`,
  `## [${version}]`,
]

const start = headings
  .map((heading) => changelog.indexOf(heading))
  .filter((index) => index >= 0)
  .sort((a, b) => a - b)[0]

if (start === undefined) {
  console.error(`Could not find CHANGELOG.md notes for ${version}.`)
  process.exit(1)
}

const next = changelog.indexOf("\n## ", start + 1)
const section = changelog.slice(start, next === -1 ? undefined : next).trim()
const body = section.replace(/^##[^\n]*\n?/, "").trim()

console.log(body || `Fulldev UI v${version}`)
