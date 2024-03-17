import merge from 'deepmerge'
import { type Preset } from 'unocss'

interface Config {
  scale: number
  radius: number
  slope: number
}

const defaultConfig: Config = {
  scale: 1,
  radius: 1,
  slope: 1,
}

export default function preset(userConfig?: Partial<Config>): Preset {
  const config: Config = merge(defaultConfig, userConfig || {})
  return {
    name: 'unocss-preset-fullui-flow',
    preflights: [
      {
        getCSS: () => `
        :root, .flow, .compact, .small, .medium, .large {
          --gutter: calc(5vw);
          --scale: ${config.scale};
          --slope: ${config.slope};
          --vw: max(0px, calc((100vw - 360px) / 700));
          --fluidddd: calc(var(--slope) * var(--vw));
    
          --space-x: 1;
          --space-1: calc(4px  * var(--size,1) * var(--fluid,1) * var(--scale,1) * var(--space-x,1));
          --space-2: calc(8px  * var(--size,1) * var(--fluid,1) * var(--scale,1) * var(--space-x,1));
          --space-3: calc(16px * var(--size,1) * var(--fluid,1) * var(--scale,1) * var(--space-x,1));
          --space-4: calc(24px * var(--size,1) * var(--fluid,1) * var(--scale,1) * var(--space-x,1));
          --space-5: calc(32px * var(--size,1) * var(--fluid,1) * var(--scale,1) * var(--space-x,1));
          --space-6: calc(48px * var(--size,1) * var(--fluid,1) * var(--scale,1) * var(--space-x,1));
          --space-7: calc(64px * var(--size,1) * var(--fluid,1) * var(--scale,1) * var(--space-x,1));

          --radius-x: 1;
          --radius-1: calc(4px  * var(--size, 1) * var(--fluid, 1) * var(--scale) * var(--radius-x, 1));
          --radius-2: calc(8px  * var(--size, 1) * var(--fluid, 1) * var(--scale) * var(--radius-x, 1));
          --radius-3: calc(16px * var(--size, 1) * var(--fluid, 1) * var(--scale) * var(--radius-x, 1));
        }
    
        .small {
          --size: 0.75;
          --text-1: calc(12px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-2: calc(14px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-3: calc(24px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
        }

        :root, .medium {
          --size: 1;
          --text-1: calc(14px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-2: calc(16px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-3: calc(32px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
        }

        .large {
          --size: 1.25;
          --text-1: calc(16px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-2: calc(18px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-3: calc(48px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
        }

        .compact.small, .compact .small, .small .compact {
          --size: 0.625;
          --text-1: calc(12px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-2: calc(13px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-3: calc(15px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
        }

        .compact, .compact .medium, .medium .compact {
          --size: 0.75;
          --text-1: calc(13px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-2: calc(14px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-3: calc(16px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
        }

        .compact.large, .compact .large, .large .compact {
          --size: 0.875;
          --text-1: calc(14px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-2: calc(15px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
          --text-3: calc(17px * var(--fluid,1) * var(--scale,1) * var(--text-x,1));
        }
      `,
      },
    ],
  }
}

export type FlowConfig = Config
// const base = [4, 8, 16, 32, 64]
// const compact = [4, 7, 12, 25, 21.44, 37.51]

// 4 8 16 32 64
// 4 7 12 25 21.44 37.51

// 4 8 12 16 24 32 40 56 84 90
// 4 6 8 10 14 18 22 30 38 46

// GO

// ALL SPACE: 4 6 8 12 16 20 24 28 32 44 60
// 4 8 12 20 28 44 60
// 4 6 8 12 16 24 32

// ALL SPACE: 4 6 8 12 16 24 32 48 64
// 8 12 16 24 32 48 64
// 4 6  8  12 16 24 32

// 8 12 16 24 32 48 64
// 6 8  10 14 18 24 32

// 4 8 16 32 64
// 4 6 8 12 16 24 32 48 64

// 4 8 12 20 28 44 60
// 4 6 8 12 16 24 32

// compact: small: -1 / 6(1, 66666)
// large: +1 / 6(1, 66666)

// base: small: -0, 25x(1, 66666)
// large: +1 / 6(1, 66666)

// BASE      4 8 16 24 32 48 64
// COMPACT   3 6 12 18 24 36 48
