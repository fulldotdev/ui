import type { RadixColors } from 'unocss-preset-radix'

export const getRadixImports = (names: RadixColors[]): string[] =>
  names.flatMap((name) => [
    `import "@radix-ui/colors/${name}.css";`,
    `import "@radix-ui/colors/${name}-alpha.css";`,
    `import "@radix-ui/colors/${name}-dark.css";`,
    `import "@radix-ui/colors/${name}-dark-alpha.css";`,
  ])
