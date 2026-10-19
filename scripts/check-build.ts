import { execSync } from "node:child_process"

// Validate both galleries after Astro and React have written their output.
execSync("html-validate dist && linkinator dist", { stdio: "inherit" })
execSync("vp run og -- --check", { stdio: "inherit" })
