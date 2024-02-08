import type { AstroIntegration } from 'astro'
import merge from 'deepmerge'
import { writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import type { RadixColors } from 'unocss-preset-radix'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

type Scheme = 'light' | 'dark'
type HueKey = 'base' | 'accent'
type HueValue = RadixColors
type StepKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'fg'
type StepValue = string
type PropertyKey =
  | 'bg'
  | 'bgHover'
  | 'bgActive'
  | 'ring'
  | 'ringHover'
  | 'text'
  | 'heading'
type PropertyValue = `${HueKey}-${StepKey}` | null
type AreaKey = 'default' | 'panel' | 'input' | 'primary' | 'secondary'
type AreaValue = {
  [key in PropertyKey]: PropertyValue
}
type ImpactKey = 'low' | 'medium' | 'high' | 'extreme'
type ImpactValue = {
  [key in AreaKey]: AreaValue
}
interface Config {
  scheme: Scheme
  hue: {
    [key in HueKey]: HueValue
  }
  impact: {
    [key in ImpactKey]: ImpactValue
  }
}

// TODO intensity etc. Dit kan met css functions direct op de hex (of p3) codes.
// op deze manier wijzig je niet de afbeeldingen etc, maar echt alleen de kleuren in dit system.
// kan ook voor hue, en noem maar op. ALLES OP BASIS VAN RADIX PALETTES!!
// het kan ook met HSL denk ik

const defaultConfig: Config = {
  scheme: 'light',
  hue: {
    base: 'slate',
    accent: 'indigo',
  },
  impact: {
    low: {
      default: {
        bg: 'base-1',
        bgHover: 'base-2',
        bgActive: 'base-3',
        ring: 'base-6',
        ringHover: 'base-6',
        text: 'base-11',
        heading: 'base-12',
      },
      panel: {
        bg: 'base-2',
        bgHover: 'base-3',
        bgActive: 'base-4',
        ring: 'base-6',
        ringHover: 'base-7',
        text: 'base-11',
        heading: 'base-12',
      },
      input: {
        bg: 'base-2',
        bgHover: 'base-3',
        bgActive: 'base-4',
        ring: 'base-7',
        ringHover: 'base-8',
        text: 'base-11',
        heading: null,
      },
      primary: {
        bg: 'accent-3',
        bgHover: 'accent-4',
        bgActive: 'accent-5',
        ring: 'accent-7',
        ringHover: 'accent-8',
        text: 'accent-11',
        heading: null,
      },
      secondary: {
        bg: null,
        bgHover: 'accent-3',
        bgActive: 'accent-4',
        ring: null,
        ringHover: null,
        text: 'accent-11',
        heading: null,
      },
    },
    medium: {
      default: {
        bg: 'base-1',
        bgHover: 'base-1',
        bgActive: 'base-1',
        ring: 'base-6',
        ringHover: 'base-6',
        text: 'base-11',
        heading: 'base-12',
      },
      panel: {
        bg: 'base-2',
        bgHover: 'base-3',
        bgActive: 'base-4',
        ring: 'base-6',
        ringHover: 'base-7',
        text: 'base-11',
        heading: 'base-12',
      },
      input: {
        bg: 'base-2',
        bgHover: 'base-3',
        bgActive: 'base-4',
        ring: 'base-6',
        ringHover: 'base-7',
        text: 'base-11',
        heading: null,
      },
      primary: {
        bg: 'accent-9',
        bgHover: 'accent-10',
        bgActive: 'accent-10',
        ring: null,
        ringHover: null,
        text: 'accent-fg',
        heading: null,
      },
      secondary: {
        bg: 'accent-3',
        bgHover: 'accent-4',
        bgActive: 'accent-5',
        ring: 'accent-7',
        ringHover: 'accent-8',
        text: 'accent-11',
        heading: null,
      },
    },
    high: {
      default: {
        bg: 'accent-2',
        bgHover: 'accent-2',
        bgActive: 'accent-2',
        ring: 'accent-6',
        ringHover: 'accent-6',
        text: 'base-11',
        heading: 'base-12',
      },
      panel: {
        bg: 'accent-2',
        bgHover: 'accent-3',
        bgActive: 'accent-4',
        ring: 'accent-6',
        ringHover: 'accent-7',
        text: 'base-11',
        heading: 'base-12',
      },
      input: {
        bg: 'accent-3',
        bgHover: 'accent-4',
        bgActive: 'accent-5',
        ring: 'accent-7',
        ringHover: 'accent-8',
        text: 'accent-fg',
        heading: null,
      },
      primary: {
        bg: 'accent-9',
        bgHover: 'accent-10',
        bgActive: 'accent-10',
        ring: null,
        ringHover: null,
        text: 'accent-fg',
        heading: null,
      },
      secondary: {
        bg: 'accent-3',
        bgHover: 'accent-4',
        bgActive: 'accent-5',
        ring: 'accent-7',
        ringHover: 'accent-8',
        text: 'accent-11',
        heading: null,
      },
    },
    extreme: {
      default: {
        bg: 'accent-9',
        bgHover: 'accent-9',
        bgActive: 'accent-9',
        ring: 'accent-fg',
        ringHover: 'accent-fg',
        text: 'accent-fg',
        heading: 'accent-fg',
      },
      panel: {
        bg: 'accent-9',
        bgHover: 'accent-10',
        bgActive: 'accent-10',
        ring: 'accent-fg',
        ringHover: 'accent-fg',
        text: 'accent-fg',
        heading: 'accent-fg',
      },
      input: {
        bg: 'accent-9',
        bgHover: 'accent-10',
        bgActive: 'accent-10',
        ring: 'accent-fg',
        ringHover: 'accent-fg',
        text: 'accent-fg',
        heading: null,
      },
      primary: {
        bg: 'accent-fg',
        bgHover: 'accent-fg',
        bgActive: 'accent-fg',
        ring: null,
        ringHover: null,
        text: 'accent-9',
        heading: null,
      },
      secondary: {
        bg: null,
        bgHover: null,
        bgActive: null,
        ring: 'accent-fg',
        ringHover: 'accent-fg',
        text: 'accent-fg',
        heading: null,
      },
    },
  },
}

export const fulluiIntegration = (passedConfig: Config): AstroIntegration => ({
  name: 'fullui-integration',
  hooks: {
    'astro:config:setup': async ({ injectScript }) => {
      let { hue, impact }: Config = merge(defaultConfig, passedConfig || {})

      const hueCSS = Object.entries(hue)
        .map(
          ([hueKey, hueValue]) => `
          :root, [class*=" impact-"] {
            --${hueKey}-1: var(--${hueValue}-1);
            --${hueKey}-2:  var(--${hueValue}-2);
            --${hueKey}-3:  var(--${hueValue}-3);
            --${hueKey}-4:  var(--${hueValue}-4);
            --${hueKey}-5:  var(--${hueValue}-5);
            --${hueKey}-6:  var(--${hueValue}-6);
            --${hueKey}-7:  var(--${hueValue}-7);
            --${hueKey}-8:  var(--${hueValue}-8);
            --${hueKey}-9:  var(--${hueValue}-9);
            --${hueKey}-10:  var(--${hueValue}-10);
            --${hueKey}-11:  var(--${hueValue}-11);
            --${hueKey}-12:  var(--${hueValue}-12);
            --${hueKey}-fg: ${['amber', 'yellow', 'lime', 'mint', 'sky'].includes(hueValue) ? 'black' : 'white'};
          }
        `
        )
        .join(' ')

      const impactCSS = Object.entries(impact)
        .map(([impactKey, impactValue]) =>
          Object.entries(impactValue)
            .map(
              ([areaKey, areaValue]) => `
                ${impactKey === 'medium' && areaKey === 'default' ? ':root,' : ''}
                ${impactKey === 'medium' ? `:root .area${areaKey},` : ''}
                .impact-${impactKey}.area-${areaKey},
                .impact-${impactKey} .area-${areaKey}
                {
                  --bg: var(--${areaValue.bg});
                  --bg-hover: var(--${areaValue.bgHover});
                  --bg-active: var(--${areaValue.bgActive});
                  --ring: var(--${areaValue.ring});
                  --ring-hover: var(--${areaValue.ringHover});
                  --text: var(--${areaValue.text});
                  --heading: var(--${areaValue.heading});
                }
              `
            )
            .join(' ')
        )
        .join(' ')

      const huePath = join(__dirname, './dist/hue.css')
      const impactPath = join(__dirname, './dist/impact.css')
      await writeFile(huePath, hueCSS, 'utf8')
      await writeFile(impactPath, impactCSS, 'utf8')

      // import '@unocss/reset/tailwind.css'
      injectScript('page-ssr', `import "@unocss/reset/tailwind.css";`)

      injectScript('page-ssr', `import "@radix-ui/colors/${hue.base}.css";`)
      injectScript(
        'page-ssr',
        `import "@radix-ui/colors/${hue.base}-alpha.css";`
      )
      injectScript(
        'page-ssr',
        `import "@radix-ui/colors/${hue.base}-dark.css";`
      )
      injectScript(
        'page-ssr',
        `import "@radix-ui/colors/${hue.base}-dark-alpha.css";`
      )

      injectScript('page-ssr', `import "@radix-ui/colors/${hue.accent}.css";`)
      injectScript(
        'page-ssr',
        `import "@radix-ui/colors/${hue.accent}-alpha.css";`
      )
      injectScript(
        'page-ssr',
        `import "@radix-ui/colors/${hue.accent}-dark.css";`
      )
      injectScript(
        'page-ssr',
        `import "@radix-ui/colors/${hue.accent}-dark-alpha.css";`
      )

      injectScript('page-ssr', `import "src/integration/dist/hue.css";`)
      injectScript('page-ssr', `import "src/integration/dist/impact.css";`)
      injectScript('page-ssr', `import "src/integration/dist/flow.css";`)
      injectScript('page-ssr', `import "src/integration/dist/base.css";`)
    },
  },
})
