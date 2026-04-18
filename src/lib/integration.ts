import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import type { AstroIntegration } from "astro"
import { fontProviders } from "astro/config"
import favicons from "astro-favicons"
import robotsTxt from "astro-robots-txt"

const defaultWeights = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
]

interface Fonts {
  sans: string
  mono: string
}

export interface Options {
  site: string
  name: string
  i18n: {
    defaultLocale: string
    locales: string[]
  }
  favicon: string
  fonts?: Fonts
}

const tailwindPlugin = tailwindcss() as any

export default function (options: Options): AstroIntegration {
  return {
    name: "fulldev-integration",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        const fonts = options.fonts
          ? [
              {
                provider: fontProviders.fontsource(),
                cssVariable: "--font-sans",
                name: options.fonts.sans,
                weights: defaultWeights,
              },
              {
                provider: fontProviders.fontsource(),
                cssVariable: "--font-mono",
                name: options.fonts.mono,
                weights: defaultWeights,
              },
            ]
          : undefined

        const config = {
          site: options.site,
          ...(fonts ? { fonts } : {}),
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
            plugins: [tailwindPlugin],
          },
        } satisfies Parameters<typeof updateConfig>[0]

        updateConfig(config)
      },
    },
  }
}
