import { merge } from 'merge-anything'
import { type Preset } from 'unocss'

interface Config {
  border: number
}

const defaultConfig: Config = {
  border: 1,
}

export default function preset(userConfig?: Partial<Config>): Preset {
  const config = merge(defaultConfig, userConfig || {}) as Config
  return {
    name: 'unocss-preset-fullui-theme',
    preflights: [
      {
        getCSS: () => `
        :root, *  {
          --border-width: ${config.border}px;
          --border-color: var(--hue6);
          --border-style: solid;
          --border: var(--border-width) var(--border-style) var(--border-color);
          --font-weight: 400;
          --font-size: var(--text-2);
          --line-height: 1.625;
          --font-family: 'Open Sans', sans-serif;
          --font: var(--font-weight) var(--font-size)/var(--line-height) var(--font-family);
          --transition-property: all;
          --transition-duration: 150ms;
          --transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          --transition: var(--transition-property) var(--transition-duration) var(--transition-timing-function);
        }
      `,
      },
    ],
  }
}

export type ThemeConfig = Config
