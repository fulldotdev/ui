import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts"],
    exclude: ["node_modules", "dist", ".astro"],
  },
})
