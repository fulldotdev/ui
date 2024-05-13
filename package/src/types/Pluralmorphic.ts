import type { AstroGlobal } from 'astro'

export type Pluralmorphic<P extends AstroGlobal['props']> =
  | (P & {
      [key: number]: P | string
    })
  | (P | string)[]
