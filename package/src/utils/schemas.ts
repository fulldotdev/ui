import type { ZodRawShape } from 'astro/zod'
import { z } from 'astro:content'
import { schema as tag } from '../components/Tag.astro'

export const schemas = <
  N extends (keyof S & string) | string,
  S extends ZodRawShape,
>(
  name: N,
  shape: S
) => {
  const micro = z.object(shape)
  const meso = tag.merge(micro)

  const value = shape[name].or(meso).nullable()
  const nested = {
    [name]: value,
    [`_${name}`]: value,
  } as {
    [K in N | `_${N}`]: typeof value
  }

  const macro = meso.extend(nested)

  return { micro, meso, macro }
}
