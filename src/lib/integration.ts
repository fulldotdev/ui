import type { AstroIntegration } from "astro"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"
import robotsTxt from "astro-robots-txt"

export interface Options {
  site: string
  name: string
  i18n: {
    defaultLocale: string
    locales: string[]
    prefixDefaultLocale?: boolean
  }
  // Sitemap path or URL to advertise in robots.txt, for example "/sitemap.xml"
  // once the page foundation's endpoint is installed. Off by default.
  sitemap?: string
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
              prefixDefaultLocale: options.i18n.prefixDefaultLocale ?? false,
              redirectToDefaultLocale: false,
            },
            defaultLocale: options.i18n.defaultLocale,
            locales: options.i18n.locales,
          },
          integrations: [
            robotsTxt({
              sitemap: options.sitemap
                ? new URL(options.sitemap, options.site).href
                : false,
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
