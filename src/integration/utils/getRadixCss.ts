import type { RadixColors } from 'unocss-preset-radix'

export const getRadixAliases = (
  palettes: [key: string, value: RadixColors][]
) =>
  palettes
    .flatMap(
      ([key, value]): string => `
      :root, .${key}, .light, .dark {
        --${key}-1: var(--${value}-1);
        --${key}-2:  var(--${value}-2);
        --${key}-3:  var(--${value}-3);
        --${key}-4:  var(--${value}-4);
        --${key}-5:  var(--${value}-5);
        --${key}-6:  var(--${value}-6);
        --${key}-7:  var(--${value}-7);
        --${key}-8:  var(--${value}-8);
        --${key}-9:  var(--${value}-9);
        --${key}-10:  var(--${value}-10);
        --${key}-11:  var(--${value}-11);
        --${key}-12:  var(--${value}-12);
        --${key}-fg: ${['amber', 'yellow', 'lime', 'mint', 'sky'].includes(value) ? 'black' : 'white'};
      }
      .${key} {
      --hue-1: var(--${key}-1);
      --hue-2:  var(--${key}-2);
      --hue-3:  var(--${key}-3);
      --hue-4:  var(--${key}-4);
      --hue-5:  var(--${key}-5);
      --hue-6:  var(--${key}-6);
      --hue-7:  var(--${key}-7);
      --hue-8:  var(--${key}-8);
      --hue-9:  var(--${key}-9);
      --hue-10:  var(--${key}-10);
      --hue-11:  var(--${key}-11);
      --hue-12:  var(--${key}-12);
      --hue-fg: var(--${key}-fg);
      }
    `
    )
    .join(' ')
