import { z } from 'astro:content'

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
      [K in N | `_${N & string}`]?:
        | z.infer<S>[N]
        | z.infer<S>
        | null
        | undefined
    }
  >
