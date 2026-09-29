import { defineConfig } from "@playwright/test"

import config from "./playwright.config"

export default defineConfig({
  ...config,
  workers: process.env.CI ? 1 : config.workers,
  testMatch: ["data-slot.spec.ts", "clipboard.spec.ts"],
  reporter: [["list"]],
  use: {
    ...config.use,
    launchOptions: {},
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
