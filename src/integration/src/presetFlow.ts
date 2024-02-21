// import merge from 'deepmerge'
// import type { Preset } from 'unocss'

// interface Config {
//   scale: number
//   borderWidth: number
//   rounded: number
// }

// const defaultConfig: Config = {
//   scale: 1,
//   borderWidth: 1,
//   rounded: 1,
// }

// export default function preset(passedConfig?: Config): Preset {
//   let config = merge(defaultConfig, passedConfig || {}) as Config

//   return {
//     name: 'unocss-preset-flow',
//     preflights: [
//       {
//         getCSS: () => `
//           :root,
//           :where(.flow) {
//             --scale: ${config.scale};
//             --rounded: ${config.rounded};
//             --borderWidth: ${config.borderWidth}px;
//             --gutter: calc(12px + 4.8vw);
//             --spacing-5: calc(64px + 3.2vw);

//             --spacing-1: calc((4px + min(0.1vw, 0.2cqw)) * var(--scale));
//             --spacing-2: calc((8px + min(0.2vw, 0.4cqw)) * var(--scale));
//             --spacing-3: calc((16px + min(0.4vw, 0.8cqw)) * var(--scale));
//             --spacing-4: calc((32px + min(0.8vw, 1.6cqw)) * var(--scale));
//             --spacing-5: calc((64px + min(1.6vw, 3.2cqw)) * var(--scale));
//             --spacing-6: calc((128px + min(3.2vw, 6.4cqw)) * var(--scale));

//             --flow-self1: calc((4px + min(0.1vw, 0.2%)) * var(--scale));
//             --flow-self2: calc((8px + min(0.2vw, 0.4%)) * var(--scale));
//             --flow-self3: calc((16px + min(0.4vw, 0.8%)) * var(--scale));
//             --flow-self4: calc((32px + min(0.8vw, 1.6%)) * var(--scale));
//             --flow-self5: calc((64px + min(1.6vw, 3.2%)) * var(--scale));
//             --flow-self6: calc((128px + min(3.2vw, 6.4%)) * var(--scale));

//             --rounded1: calc((4px + min(0.1vw, 0.2cqw)) * var(--scale) * var(--rounded));
//             --rounded2: calc((8px + min(0.2vw, 0.4cqw)) * var(--scale) * var(--rounded));
//             --rounded3: calc((16px + min(0.4vw, 0.8cqw)) * var(--scale) * var(--rounded));

//             --font-size-1: calc((15px + min(0.125vw, 0.25cqw)) * var(--scale));
//             --font-size-2: calc((17px + min(0.125vw, 0.25cqw)) * var(--scale));
//             --font-size-3: calc((26px + min(1vw, 2cqw)) * var(--scale));
//           }

//           :where(.flow-compact) {
//             --spacing-1: calc((4px + min(0.1vw, 0.2cqw)) * var(--scale));
//             --spacing-2: calc((6px + min(0.2vw, 0.4cqw)) * var(--scale));
//             --spacing-3: calc((9px + min(0.4vw, 0.8cqw)) * var(--scale));
//             --spacing-4: calc((13.5px + min(0.8vw, 1.6cqw)) * var(--scale));
//             --spacing-5: calc((20.25px + min(1.6vw, 3.2cqw)) * var(--scale));
//             --spacing-6: calc((30.375px + min(3.2vw, 6.4cqw)) * var(--scale));

//             --flow-self1: calc((4px + min(0.1vw, 0.2%)) * var(--scale));
//             --flow-self2: calc((6px + min(0.2vw, 0.4%)) * var(--scale));
//             --flow-self3: calc((9px + min(0.4vw, 0.8%)) * var(--scale));
//             --flow-self4: calc((13.5px + min(0.8vw, 1.6%)) * var(--scale));
//             --flow-self5: calc((20.25px + min(1.6vw, 3.2%)) * var(--scale));
//             --flow-self6: calc((30.375px + min(3.2vw, 6.4%)) * var(--scale));

//             --font-size-1: calc((13px + min(0.125vw, 0.25cqw)) * var(--scale));
//             --font-size-2: calc((15px + min(0.125vw, 0.25cqw)) * var(--scale));
//             --font-size-3: calc((19px + min(0.25vw, 0.5cqw)) * var(--scale));
//           }
//         `,
//       },
//     ],
//     safelist: ['flow', 'flow-compact'],
//   }
// }
