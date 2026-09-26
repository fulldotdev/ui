import { defineConfig } from "@playwright/test"

import config from "./playwright.config"

export default defineConfig({
  ...config,
  testMatch: "data-slot*.spec.ts",
  webServer: [
    ...(Array.isArray(config.webServer)
      ? config.webServer
      : [config.webServer!]),
    {
      command: "node scripts/check-data-slot-consumer.mjs --serve",
      url: "http://127.0.0.1:4176",
      timeout: 180_000,
      stdout: "pipe",
    },
  ],
  reporter: [["list"]],
  use: {
    ...config.use,
    reducedMotion: "no-preference",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { browserName: "chromium", viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "chromium-mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "webkit-desktop",
      use: { browserName: "webkit", viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "webkit-mobile",
      use: {
        browserName: "webkit",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
})
