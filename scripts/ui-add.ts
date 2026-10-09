// Installs registry items with the official shadcn CLI, then formats the
// project with its own Prettier config and ignores, the same pass as
// `pnpm fix`, so a later format run leaves the installed files unchanged.
//
//   pnpm ui:add @shadcn/card @fulldev/button
//
// Arguments go to `shadcn add` unchanged. --dry-run, --diff, --view and
// --help only preview, so they skip formatting. --cwd is rejected: run the
// command in the project instead. Files that --path places outside the
// project are not formatted.
import { spawnSync } from "node:child_process"

const args = process.argv.slice(2)
let cwd = false
let preview = false
for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg === "--") break
  if (/^--cwd(=|$)/.test(arg)) cwd = true
  if (/^--(dry-run|diff|view|help)(=|$)/.test(arg)) preview = true
  // --path takes the next argument as its value, even one starting with -.
  if (arg === "--path") i++
  // A short flag group like -yc: -c and -p take the rest of the group as
  // their value, or the next argument when nothing is left.
  if (/^-[^-]/.test(arg)) {
    for (let j = 1; j < arg.length; j++) {
      if (arg[j] === "c") cwd = true
      if (arg[j] === "h") preview = true
      if (arg[j] === "c" || arg[j] === "p") {
        if (j === arg.length - 1) i++
        break
      }
    }
  }
}
if (cwd) {
  console.error(
    "ui:add does not support --cwd; cd into that project and run it there."
  )
  process.exit(1)
}

const run = (command: string[]) => {
  const result = spawnSync("pnpm", command, { stdio: "inherit" })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

run(["dlx", "shadcn@latest", "add", ...args])
if (!preview) run(["exec", "prettier", "--write", ".", "--log-level", "warn"])
