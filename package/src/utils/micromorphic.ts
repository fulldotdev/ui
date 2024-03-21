import type { AstroGlobal } from 'astro'
import { z } from 'astro:content'
import { zTag } from '../components/Tag.astro'

const omitObject = zTag.parse

export const micromorphic = <
  N extends keyof P,
  S extends z.ZodObject<any, any, any>,
  P extends AstroGlobal['props'],
>(
  name: N & string,
  schema: S,
  props: P
) => schema.omit(zTag.keyof).parse(props) as Pick<P, N | `_${N & string}`>
