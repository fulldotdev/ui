import { execFileSync, execSync } from "node:child_process"

// Validate both galleries after Astro and React have written their output.
execSync("fulldev-check dist", { stdio: "inherit" })
execFileSync(process.execPath, ["scripts/og.ts", "--check"], {
  stdio: "inherit",
})
