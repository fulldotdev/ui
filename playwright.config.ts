import { createArgosReporterOptions } from "@argos-ci/playwright/reporter"
import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  workers: 2,
  reporter: [
    ["list"],
    [
      "@argos-ci/playwright/reporter",
      createArgosReporterOptions({
        uploadToArgos: !!process.env.CI,
      }),
    ],
  ],
  use: {
    baseURL: "http://127.0.0.1:4174",
    colorScheme: "light",
    reducedMotion: "reduce",
    locale: "en-US",
    timezoneId: "Europe/Amsterdam",
    screenshot: "only-on-failure",
    launchOptions: {
      args: ["--disable-lcd-text", "--font-render-hinting=none"],
    },
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "pnpm exec astro preview --host 127.0.0.1 --port 4174",
    url: "http://127.0.0.1:4174",
  },
})
