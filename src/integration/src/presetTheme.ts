import * as radixColors from '@radix-ui/colors'
import merge from 'deepmerge'
import type { Preset } from 'unocss'
import { presetRadix, type RadixColors } from 'unocss-preset-radix'

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
// TODO op deze manier wijzig je niet de afbeeldingen etc, maar echt alleen de kleuren in dit system.
// TODO kan ook voor hue, en noem maar op. ALLES OP BASIS VAN RADIX PALETTES!!
// TODO het kan ook met HSL denk ik

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
        bgHover: 'accent-2',
        bgActive: 'accent-3',
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
        bg: 'base-2',
        bgHover: 'base-2',
        bgActive: 'base-2',
        ring: 'base-6',
        ringHover: 'base-6',
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

export default function preset(passedConfig?: Config): Preset {
  let config: any = merge(defaultConfig, passedConfig || {}) as Config

  function getRadixColor(
    hueValue: HueValue,
    stepKey: StepKey,
    scheme: Scheme = 'light'
  ) {
    const isBright = [
      'orange',
      'amber',
      'yellow',
      'lime',
      'mint',
      'sky',
    ].includes(hueValue)
    if (isBright && stepKey === 'fg') return 'black'
    if (stepKey === 'fg') return 'white'
    const radixPaletteName = `${hueValue}${scheme == 'dark' ? 'Dark' : ''}P3`
    const radixStepName = `${hueValue}${stepKey}`
    const radixColor = (radixColors as any)[radixPaletteName][radixStepName]
    return radixColor
  }

  function generateHueProperties(hueKey: HueKey, scheme: Scheme = 'light') {
    const hueValue = config.hue[hueKey]
    return `
      --${hueKey}-1: ${getRadixColor(hueValue, 1)};
      --${hueKey}-2: ${getRadixColor(hueValue, 2)};
      --${hueKey}-3: ${getRadixColor(hueValue, 3)};
      --${hueKey}-4: ${getRadixColor(hueValue, 4)};
      --${hueKey}-5: ${getRadixColor(hueValue, 5)};
      --${hueKey}-6: ${getRadixColor(hueValue, 6)};
      --${hueKey}-7: ${getRadixColor(hueValue, 7)};
      --${hueKey}-8: ${getRadixColor(hueValue, 8)};
      --${hueKey}-9: ${getRadixColor(hueValue, 9)};
      --${hueKey}-10: ${getRadixColor(hueValue, 10)};
      --${hueKey}-11: ${getRadixColor(hueValue, 11)};
      --${hueKey}-12: ${getRadixColor(hueValue, 12)};
      --${hueKey}-fg: ${getRadixColor(hueValue, 'fg')};
    `
  }

  function generateProperties(key: string, impact: any): string {
    return `
      ${key === 'medium' ? ':root,' : ''}
      :where(.impact-${key}) {
        --bg: ${varValue(impact.bg)};
        --ring: ${varValue(impact.ring)};
        --text: ${varValue(impact.text)};
        --heading: ${varValue(impact.heading)};
        --panel-bg: ${varValue(impact.sectionBg)};
        --panel-ring: ${varValue(impact.sectionRing)};
        --panel-text: ${varValue(impact.sectionText)};
        --panel-heading: ${varValue(impact.sectionHeading)};
        --input-bg: ${varValue(impact.inputBg)};
        --input-ring: ${varValue(impact.inputRing)};
        --input-text: ${varValue(impact.inputText)};
        --primary-bg: ${varValue(impact.primaryBg)};
        --primary-bg-hover: ${varValue(impact.primaryBgHover)};
        --primary-bg-active: ${varValue(impact.primaryBgActive)};
        --primary-ring: ${varValue(impact.primaryRing)};
        --primary-ring-hover: ${varValue(impact.primaryRingHover)};
        --primary-text: ${varValue(impact.primaryText)};
        --secondary-bg: ${varValue(impact.secondaryBg)};
        --secondary-bg-hover: ${varValue(impact.secondaryBgHover)};
        --secondary-bg-active: ${varValue(impact.secondaryBgActive)};
        --secondary-ring: ${varValue(impact.secondaryRing)};
        --secondary-ring-hover: ${varValue(impact.secondaryRingHover)};
        --secondary-text: ${varValue(impact.secondaryText)};
      }
    `
  }

  return {
    name: 'unocss-preset-theme',
    presets: [
      presetRadix({
        darkSelector:
          config.colors.scheme === 'dark'
            ? ':root, .scheme-dark, .scheme-default'
            : '.scheme-dark, .scheme-reverse',
        lightSelector:
          config.colors.scheme === 'light'
            ? ':root, .scheme-light, .scheme-default'
            : '.scheme-light, .scheme-reverse',
        palette: [config.colors.base, config.colors.accent],
      }),
    ],
    preflights: [
      ...Object.entries(config.impacts).map(([key, value]) => ({
        getCSS: () => generateThemeCSS(key, value),
      })),
    ],
  }
}
