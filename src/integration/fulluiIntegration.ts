import type { AstroIntegration } from 'astro'
import merge from 'deepmerge'
import type { RadixColors } from 'unocss-preset-radix'
import createVirtualModule from './createVirtualCss'

// type HueKey = 'base' | 'accent'
type HueValue = RadixColors
interface Config {
  scheme?: 'light' | 'dark'
  hue?: {
    base: HueValue
    accent: HueValue
    // [key in HueKey]?: HueValue
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
    'astro:config:setup': async ({ injectScript, updateConfig }) => {
      let { scheme, hue }: Config = merge(defaultConfig, passedConfig || {})

      const hueCSS = Object.entries(hue)
        .map(
          ([hueKey, hueValue]) => `:root, .${hueKey}, .light, .dark {
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

.${hueKey} {
  --hue-1: var(--${hueKey}-1);
  --hue-2:  var(--${hueKey}-2);
  --hue-3:  var(--${hueKey}-3);
  --hue-4:  var(--${hueKey}-4);
  --hue-5:  var(--${hueKey}-5);
  --hue-6:  var(--${hueKey}-6);
  --hue-7:  var(--${hueKey}-7);
  --hue-8:  var(--${hueKey}-8);
  --hue-9:  var(--${hueKey}-9);
  --hue-10:  var(--${hueKey}-10);
  --hue-11:  var(--${hueKey}-11);
  --hue-12:  var(--${hueKey}-12);
  --hue-fg: var(--${hueKey}-fg);
}

`
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
      //             --border-color-hover: ;
      //             --border-color-active: ;
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

      const injectRadix = (name: string) =>
        injectScript('page-ssr', `import "@radix-ui/colors/${name}.css";`)
      injectRadix(`${hue.base}`)
      injectRadix(`${hue.base}-alpha`)
      injectRadix(`${hue.base}-dark`)
      injectRadix(`${hue.base}-dark-alpha`)
      injectRadix(`${hue.accent}`)
      injectRadix(`${hue.accent}-alpha`)
      injectRadix(`${hue.accent}-dark`)
      injectRadix(`${hue.accent}-dark-alpha`)

      injectScript('page-ssr', `import "@unocss/reset/tailwind.css";`)
      injectScript('page-ssr', `import "src/css/flow.css";`)
      injectScript('page-ssr', `import "src/css/theme.css";`)

      updateConfig({
        vite: {
          plugins: [createVirtualModule('hue', hueCSS)],
        },
      })

      injectScript('page-ssr', `import "virtual:hue.css";`)
    },
  },
})
