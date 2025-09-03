import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import type { AstroIntegration } from "astro"
import favicons from "astro-favicons"
import robotsTxt from "astro-robots-txt"
import { fontProviders } from "astro/config"
import { mapToObj } from "remeda"

export interface FulldevOptions {
  name: string
  site: string
  fonts: {
    base: string
    heading: string
  }
  defaultLocale: string
  locales: string[]
  favicon: string
}

export default function (options: FulldevOptions): AstroIntegration {
  return {
    name: "fulldev",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          site: options.site,
          i18n: {
            defaultLocale: options.defaultLocale,
            locales: options.locales,
            routing: {
              prefixDefaultLocale: false,
              redirectToDefaultLocale: false,
              fallbackType: "redirect",
            },
          },
          // image: {
          //   responsiveStyles: true,
          //   layout: "constrained",
          //   objectFit: "cover",
          //   objectPosition: "center",
          //   breakpoints: [320, 768, 1024, 1280, 1536, 1920],
          // },
          trailingSlash: "always",
          experimental: {
            fonts: [
              {
                provider: fontProviders.google(),
                cssVariable: "--font-base",
                name: options.fonts.base,
                weights: [
                  "100",
                  "200",
                  "300",
                  "400",
                  "500",
                  "600",
                  "700",
                  "800",
                  "900",
                ],
              },
              {
                provider: fontProviders.google(),
                cssVariable: "--font-heading",
                name: options.fonts.heading,
                weights: [
                  "100",
                  "200",
                  "300",
                  "400",
                  "500",
                  "600",
                  "700",
                  "800",
                  "900",
                ],
              },
            ],
          },
          integrations: [
            robotsTxt(),
            react(),
            sitemap({
              changefreq: "weekly",
              lastmod: new Date(),
              i18n: {
                defaultLocale: options.defaultLocale,
                locales: mapToObj(options.locales, (locale) => [
                  locale,
                  locale,
                ]),
              },
            }),
            favicons({
              input: {
                favicons: [options.favicon],
              },
              name: options.name,
              short_name: options.name,
            }),
          ],
          vite: {
            plugins: [tailwindcss()],
          },
          prefetch: {
            prefetchAll: true,
          },
        })
      },
    },
  }
}
