import { execSync } from "node:child_process"
import type { AstroIntegration } from "astro"

export default function checkBuild(): AstroIntegration {
  return {
    name: "check-build",
    hooks: {
      // Keep this integration last so every generated file is checked.
      "astro:build:done": () => {
        execSync("html-validate dist && linkinator dist", { stdio: "inherit" })
      },
    },
  }
}
