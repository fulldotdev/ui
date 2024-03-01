import type { AstroIntegration } from 'astro'
import autoprefixer from 'autoprefixer'
import merge from 'deepmerge'
import postcssPresetEnv from 'postcss-preset-env'
import type { RadixColors } from 'unocss-preset-radix'
import { getFlowCss } from './utils/getFlowCss'
import { getRadixAliases } from './utils/getRadixCss'
import { getRadixImports } from './utils/getRadixImports'
import { getThemeCss } from './utils/getThemeCss'
import getVirtualModule from './utils/getVirtualModule'

interface Config {
  scale?: number
  radius?: number
  slope?: number
  borderWidth?: number
  palettes?: {
    base: RadixColors
    accent: RadixColors
  }
}

const defaultConfig: Config = {
  scale: 1,
  radius: 1,
  slope: 1,
  borderWidth: 1,
  palettes: {
    base: 'slate',
    accent: 'indigo',
  },
}

export const fullui = (passedConfig: Config): AstroIntegration =>
  ({
    name: 'fullui-integration',
    hooks: {
      'astro:config:setup': async ({ injectScript, updateConfig }) => {
        let { scale, radius, slope, borderWidth, palettes }: Config = merge(
          defaultConfig,
          passedConfig || {}
        )

        const radixCss = getRadixAliases(Object.entries(palettes))
        const flowCss = getFlowCss({ scale, slope, radius })
        const themeCss = getThemeCss({ borderWidth })

        const fulluiCss = [radixCss, flowCss, themeCss].join(' ')

        updateConfig({
          vite: {
            plugins: [getVirtualModule('fullui.css', fulluiCss)],
            css: {
              postcss: {
                plugins: [autoprefixer, postcssPresetEnv],
              },
            },
          },
        })

        injectScript('page-ssr', 'import "virtual:fullui.css";')
        injectScript('page-ssr', 'import "@unocss/reset/tailwind.css";')

        getRadixImports(Object.values(palettes)).forEach((importString) => {
          injectScript('page-ssr', importString)
        })
      },
    },
  }) as AstroIntegration
