import { merge } from 'merge-anything'
import type { Preset } from 'unocss'

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
  const config = merge(defaultConfig, userConfig || {}) as Config
  return {
    name: 'unocss-preset-fullui-flow',
    // TODO differentiate between numbers and names, where names change automatically and numbers do not
    // example: size-1, size-2, size-3, size-4, but also small, medium, large.
    // above certain breakpoint, large becomes size-4 instead of size-3, etc.
    // Also for text. We want a text-scaling system of like 7 or something steps (see radix)
    preflights: [
      {
        getCSS: () => `
        :root {
          --scale: ${config.scale};
        }

         :root, .size-1, .size-2, .size-3, .compact {
          --gutter: calc(5vw);
          --spacer: calc(var(--space-7) + 4vw);

          --space-x: 1;
          --space-1: calc(4px  * var(--space-x,1) * var(--scale,1));
          --space-2: calc(8px  * var(--space-x,1) * var(--scale,1));
          --space-3: calc(16px * var(--space-x,1) * var(--scale,1));
          --space-4: calc(24px * var(--space-x,1) * var(--scale,1));
          --space-5: calc(32px * var(--space-x,1) * var(--scale,1));
          --space-6: calc(48px * var(--space-x,1) * var(--scale,1));
          --space-7: calc(64px * var(--space-x,1) * var(--scale,1));

          --radius-x: 1;
          --radius-0: 0px;
          --radius-1: calc(var(--space-1) * var(--radius-x, 1));
          --radius-2: calc(var(--space-2) * var(--radius-x, 1));
          --radius-3: calc(var(--space-3) * var(--radius-x, 1));
          --radius-full: 9999px;
        }
    
        .size-1 {
          --space-x: 0.75;
          --text-1: calc(12px * var(--scale,1));
          --text-2: calc(14px * var(--scale,1));
          --text-3: calc(22px * var(--scale,1));
        }

        :root, .size-2 {
          --space-x: 1;
          --text-1: calc(14px * var(--scale,1));
          --text-2: calc(16px * var(--scale,1));
          --text-3: calc(28px * var(--scale,1));
        }

        .size-3 {
          --space-x: 1.25;
          --text-1: calc(16px * var(--scale,1));
          --text-2: calc(18px * var(--scale,1));
          --text-3: calc(48px * var(--scale,1));
        }

        .compact.size-1, .compact .size-1, .size-1 .compact {
          --space-x: 0.625;
          --text-1: calc(12px * var(--scale,1));
          --text-2: calc(13px * var(--scale,1));
          --text-3: calc(15px * var(--scale,1));
        }

        .compact, .compact.size-2, .compact .size-2, .size-2 .compact {
          --space-x: 0.75;
          --text-1: calc(13px * var(--scale,1));
          --text-2: calc(14px * var(--scale,1));
          --text-3: calc(16px * var(--scale,1));
        }

        .compact.size-3, .compact .size-3, .size-3 .compact {
          --space-x: 0.875;
          --text-1: calc(14px * var(--scale,1));
          --text-2: calc(15px * var(--scale,1));
          --text-3: calc(17px * var(--scale,1));
        }

        @media (min-width: 1024px) {
          .size-1 {
            --space-x: 1;
            --text-1: calc(14px * var(--scale,1));
            --text-2: calc(16px * var(--scale,1));
            --text-3: calc(32px * var(--scale,1));
          }
  
          :root, .size-2 {
            --space-x: 1.25;
            --text-1: calc(16px * var(--scale,1));
            --text-2: calc(18px * var(--scale,1));
            --text-3: calc(35px * var(--scale,1));
          }
  
          .size-3 {
            --space-x: 1.5;
            --text-1: calc(18px * var(--scale,1));
            --text-2: calc(20px * var(--scale,1));
            --text-3: calc(60px * var(--scale,1));
          }
  
          .compact.size-1, .compact .size-1, .size-1 .compact {
            --space-x: 0.75;
            --text-1: calc(13px * var(--scale,1));
            --text-2: calc(14px * var(--scale,1));
            --text-3: calc(16px * var(--scale,1));
          }
  
          .compact, .compact.size-2, .compact .size-2, .size-2 .compact  {
            --space-x: 0.875;
            --text-1: calc(14px * var(--scale,1));
            --text-2: calc(15px * var(--scale,1));
            --text-3: calc(17px * var(--scale,1));
          }
  
          .compact.size-3, .compact .size-3, .size-3 .compact {
            --space-x: 1;
            --text-1: calc(15px * var(--scale,1));
            --text-2: calc(16px * var(--scale,1));
            --text-3: calc(18px * var(--scale,1));
          }
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
