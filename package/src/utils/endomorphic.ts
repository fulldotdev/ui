import type { AstroGlobal } from 'astro'
import { z } from 'astro:content'
import { merge } from 'merge-anything'

// Recursively add entire schema under name and _name
export const endomorphic = <
  N extends keyof z.infer<S>,
  S extends z.ZodObject<any, any, any>,
>(
  name: N & string,
  schema: S
) =>
  schema.omit({ [name]: true }).extend({
    [name]: schema.shape[name].or(schema).nullish(),
    [`_${name}`]: schema.shape[name].or(schema).nullish(),
  }) as z.ZodType<
    Omit<z.infer<S>, N> & {
      [K in N | `_${N & string}`]?: z.infer<S> | null | undefined
    }
  >

// Merges flat, name and _name properties
export const ectomorphic = <
  N extends keyof P,
  S extends ReturnType<typeof endomorphic<N, z.ZodObject<any, any, any>>>,
  P extends AstroGlobal['props'],
>(
  name: N & string,
  schema: S,
  props: P
) =>
  schema
    .transform((val) => {
      const stripped = { ...val }
      delete val[name]
      delete val[`_${name}`]
      return merge(val[`_${name}`], val[name], stripped)
    })
    .parse(props) as P[`_${N & string}`] & P[N] & Omit<P, N | `_${N & string}`>
