import { default as UnoCSS } from '@unocss/astro'
import type { AstroIntegration } from 'astro'
import type { UnoConfig } from './uno'
import preset from './uno'

interface Config extends UnoConfig {}

export function fullui(config?: Partial<Config>): AstroIntegration {
  return UnoCSS({
    injectReset: true,
    content: {
      pipeline: {
        include: [
          // the default
          /\.(vue|svelte|[jt]sx|md|mdx?|astro|elm|php|phtml|html)($|\?)/,
          // include js/ts files
          'src/**/*.{js,ts,md,mdx}',
        ],
      },
      filesystem: ['src/**/*.md'],
    },
    presets: [preset(config)],
  })
}

// VITE
export function vite(config?: Partial<Config>): AstroIntegration {
  return {
    name: 'fullui-theming',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              UnoCSS({
                injectReset: true,
                content: {
                  pipeline: {
                    include: [
                      // the default
                      /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
                      // include js/ts files
                      'src/**/*.{js,ts,md}',
                    ],
                  },
                  filesystem: ['src/**/*.md'],
                },
                presets: [preset(config)],
              }),
            ],
          },
        })
      },
    },
  }
}

export function inject(config?: Partial<Config>): AstroIntegration {
  return {
    name: 'fullui-theming-inject',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        injectScript('page-ssr', 'import "virtual:uno.css";')
      },
    },
  }
}
