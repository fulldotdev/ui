import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import type { AstroIntegration } from "astro"
import favicons from "astro-favicons"
import robotsTxt from "astro-robots-txt"

export interface Options {
  site: string
  name: string
  i18n: {
    defaultLocale: string
    locales: string[]
  }
  favicon: string
}

export default function (options: Options): AstroIntegration {
  return {
    name: "starter/ui",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          site: options.site,
          image: {
            responsiveStyles: true,
            breakpoints: [640, 960, 1280, 1600, 1920],
          },
          prefetch: {
            prefetchAll: false,
          },
          i18n: {
            routing: {
              fallbackType: "redirect",
              prefixDefaultLocale: false,
              redirectToDefaultLocale: false,
            },
            ...options.i18n,
          },
          integrations: [
            robotsTxt(),
            sitemap({
              changefreq: "weekly",
              lastmod: new Date(),
              i18n: {
                defaultLocale: options.i18n?.defaultLocale,
                locales: Object.fromEntries(
                  options.i18n.locales.map((locale) => [locale, locale])
                ),
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
        })
      },
    },
  }
}
