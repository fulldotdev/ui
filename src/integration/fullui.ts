import type { AstroIntegration } from 'astro'
import merge from 'deepmerge'
import { dirname } from 'path'
import type { RadixColors } from 'unocss-preset-radix'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

// type Scheme = 'light' | 'dark'
// type HueKey = 'base' | 'accent'
// type HueValue = RadixColors
// type StepKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'fg'
// type StepValue = string
// type PropertyKey =
//   | 'bg'
//   | 'bgHover'
//   | 'bgActive'
//   | 'ring'
//   | 'ringHover'
//   | 'text'
//   | 'heading'
// type PropertyValue = `${HueKey}-${StepKey}` | null
// type AreaKey = 'default' | 'panel' | 'input' | 'primary' | 'secondary'
// type AreaValue = {
//   [key in PropertyKey]: PropertyValue
// }
// type ImpactKey = 'low' | 'medium' | 'high' | 'extreme'
// type ImpactValue = {
//   [key in AreaKey]: AreaValue
// }
// interface Config {
//   scheme: Scheme
//   hue: {
//     [key in HueKey]: HueValue
//   }
//   impact: {
//     [key in ImpactKey]: ImpactValue
//   }
// }

// // TODO intensity etc. Dit kan met css functions direct op de hex (of p3) codes.
// // op deze manier wijzig je niet de afbeeldingen etc, maar echt alleen de kleuren in dit system.
// // kan ook voor hue, en noem maar op. ALLES OP BASIS VAN RADIX PALETTES!!
// // het kan ook met HSL denk ik

// const defaultConfig: Config = {
//   scheme: 'light',
//   hue: {
//     base: 'slate',
//     accent: 'indigo',
//   },
//   impact: {
//     low: {
//       default: {
//         bg: 'var(--base-1)',
//         bgHover: 'var(--base-2)',
//         bgActive: 'var(--base-3)',
//         ring: 'var(--base-6)',
//         ringHover: 'var(--base-6)',
//         text: 'var(--base-11)',
//         heading: 'var(--base-12)',
//       },
//       panel: {
//         bg: 'var(--base-2)',
//         bgHover: 'var(--base-3)',
//         bgActive: 'var(--base-4)',
//         ring: 'var(--base-6)',
//         ringHover: 'var(--base-7)',
//         text: 'var(--base-11)',
//         heading: 'var(--base-12)',
//       },
//       input: {
//         bg: 'var(--base-2)',
//         bgHover: 'var(--base-3)',
//         bgActive: 'var(--base-4)',
//         ring: 'var(--base-7)',
//         ringHover: 'var(--base-8)',
//         text: 'var(--base-11)',
//         heading: 'var'
//       },
//       primary: {
//         bg: 'var(--accent-3)',
//         bgHover: 'var(--accent-4)',
//         bgActive: 'var(--accent-5)',
//         ring: 'var(--accent-7)',
//         ringHover: 'var(--accent-8)',
//         text: 'var(--accent-11)',
//         heading: 'var'
//       },
//       secondary: {
//         bg: null,
//         bgHover: 'accent-3',
//         bgActive: 'accent-4',
//         ring: null,
//         ringHover: null,
//         text: 'accent-11',
//         heading: null,
//       },
//     },
//     medium: {
//       default: {
//         bg: 'var(--base-1)',
//         bgHover: 'var(--base-1)',
//         bgActive: 'var(--base-1)',
//         ring: 'var(--base-6)',
//         ringHover: 'var(--base-6)',
//         text: 'var(--base-11)',
//         heading: 'var(--base-12)',
//       },
//       panel: {
//         bg: 'var(--base-2)',
//         bgHover: 'var(--base-3)',
//         bgActive: 'var(--base-4)',
//         ring: 'var(--base-6)',
//         ringHover: 'var(--base-7)',
//         text: 'var(--base-11)',
//         heading: 'var(--base-12)',
//       },
//       input: {
//         bg: 'var(--base-2)',
//         bgHover: 'var(--base-3)',
//         bgActive: 'var(--base-4)',
//         ring: 'var(--base-6)',
//         ringHover: 'var(--base-7)',
//         text: 'var(--base-11)',
//         heading: 'var'
//       },
//       primary: {
//         bg: 'var(--accent-9)',
//         bgHover: 'var(--accent-10)',
//         bgActive: 'var(--accent-10)',
//         ring: 'var'
//         ringHover: 'var'
//         text: 'var(--accent-fg)',
//         heading: 'var'
//       },
//       secondary: {
//         bg: 'var(--accent-3)',
//         bgHover: 'var(--accent-4)',
//         bgActive: 'var(--accent-5)',
//         ring: 'var(--accent-7)',
//         ringHover: 'var(--accent-8)',
//         text: 'var(--accent-11)',
//         heading: 'var'
//       },
//     },
//     high: {
//       default: {
//         bg: 'var(--accent-2)',
//         bgHover: 'var(--accent-2)',
//         bgActive: 'var(--accent-2)',
//         ring: 'var(--accent-6)',
//         ringHover: 'var(--accent-6)',
//         text: 'var(--base-11)',
//         heading: 'var(--base-12)',
//       },
//       panel: {
//         bg: 'var(--accent-2)',
//         bgHover: 'var(--accent-3)',
//         bgActive: 'var(--accent-4)',
//         ring: 'var(--accent-6)',
//         ringHover: 'var(--accent-7)',
//         text: 'var(--base-11)',
//         heading: 'var(--base-12)',
//       },
//       input: {
//         bg: 'var(--accent-3)',
//         bgHover: 'var(--accent-4)',
//         bgActive: 'var(--accent-5)',
//         ring: 'var(--accent-7)',
//         ringHover: 'var(--accent-8)',
//         text: 'var(--accent-fg)',
//         heading: 'var'
//       },
//       primary: {
//         bg: 'var(--accent-9)',
//         bgHover: 'var(--accent-10)',
//         bgActive: 'var(--accent-10)',
//         ring: 'var'
//         ringHover: 'var'
//         text: 'var(--accent-fg)',
//         heading: 'var'
//       },
//       secondary: {
//         bg: 'var(--accent-3)',
//         bgHover: 'var(--accent-4)',
//         bgActive: 'var(--accent-5)',
//         ring: 'var(--accent-7)',
//         ringHover: 'var(--accent-8)',
//         text: 'var(--accent-11)',
//         heading: 'var'
//       },
//     },
//     extreme: {
//       default: {
//         bg: 'var(--accent-9)',
//         bgHover: 'var(--accent-9)',
//         bgActive: 'var(--accent-9)',
//         ring: 'var(--accent-fg)',
//         ringHover: 'var(--accent-fg)',
//         text: 'var(--accent-fg)',
//         heading: 'var(--accent-fg)',
//       },
//       panel: {
//         bg: 'var(--accent-9)',
//         bgHover: 'var(--accent-10)',
//         bgActive: 'var(--accent-10)',
//         ring: 'var(--accent-fg)',
//         ringHover: 'var(--accent-fg)',
//         text: 'var(--accent-fg)',
//         heading: 'var(--accent-fg)',
//       },
//       input: {
//         bg: 'var(--accent-9)',
//         bgHover: 'var(--accent-10)',
//         bgActive: 'var(--accent-10)',
//         ring: 'var(--accent-fg)',
//         ringHover: 'var(--accent-fg)',
//         text: 'var(--accent-fg)',
//         heading: 'var'
//       },
//       primary: {
//         bg: 'var(--accent-fg)',
//         bgHover: 'var(--accent-fg)',
//         bgActive: 'var(--accent-fg)',
//         ring: 'var'
//         ringHover: 'var'
//         text: 'var(--accent-9)',
//         heading: 'var'
//       },
//       secondary: {
//         bg: null,
//         bgHover: null,
//         bgActive: null,
//         ring: 'accent-fg',
//         ringHover: 'accent-fg',
//         text: 'accent-fg',
//         heading: null,
//       },
//     },
//   },
// }

type HueKey = 'base' | 'accent'
type HueValue = RadixColors
interface Config {
  scheme?: 'light' | 'dark'
  hue?: {
    [key in HueKey]?: HueValue
  }
}

const defaultConfig: Config = {
  scheme: 'light',
  hue: {
    base: 'slate',
    accent: 'indigo',
  },
}

export const fulluiIntegration = (passedConfig: Config): AstroIntegration => ({
  name: 'fullui-integration',
  hooks: {
    'astro:config:setup': async ({ injectScript }) => {
      let { scheme, hue }: Config = merge(defaultConfig, passedConfig || {})

      const hueCSS = Object.entries(hue)
        .map(
          ([hueKey, hueValue]) => `:root, .hue-${hueKey} {
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
}`
        )
        .join(' ')

      // const impactCSS = Object.entries(impact)
      //   .map(([impactKey, impactValue]) =>
      //     Object.entries(impactValue)
      //       .map(
      //         ([areaKey, areaValue]) => `
      //           ${impactKey === 'medium' && areaKey === 'default' ? ':root,' : ''}
      //           ${impactKey === 'medium' ? `:root .area${areaKey},` : ''}
      //           .impact-${impactKey}.area-${areaKey},
      //           .impact-${impactKey} .area-${areaKey}
      //           {
      //             --bg: var(--${areaValue.bg});
      //             --bg-hover: var(--${areaValue.bgHover});
      //             --bg-active: var(--${areaValue.bgActive});
      //             --ring: var(--${areaValue.ring});
      //             --ring-hover: var(--${areaValue.ringHover});
      //             --text: var(--${areaValue.text});
      //             --heading: var(--${areaValue.heading});

      //             --background: ;
      //             --background-hover: ;
      //             --background-active: ;
      //             --border: ;
      //             --border-hover: ;
      //             --border-active: ;
      //             --color: ;
      //             --color-heading: ;
      //             --font: ;
      //             --font-heading: ;
      //             --radius: ;
      //             --transition: ;
      //           }
      //         `
      //       )
      //       .join(' ')
      //   )
      //   .join(' ')

      // const huePath = join(__dirname, '../css/hue.css')
      // const impactPath = join(__dirname, './dist/impact.css')
      // await writeFile(huePath, hueCSS, 'utf8')
      // await writeFile(impactPath, impactCSS, 'utf8')

      // import '@unocss/reset/tailwind.css'
      // injectScript('page-ssr', `import "@unocss/reset/tailwind.css";`)

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

      // TODO: add auto dark mode to hue file
      injectScript('page-ssr', `import "src/css/hue.css";`)
      // injectScript('page-ssr', `import "src/integration/dist/impact.css";`)
      injectScript('page-ssr', `import "src/css/flow.css";`)
      injectScript('page-ssr', `import "src/css/theme.css";`)
    },
  },
})
