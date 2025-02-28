import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const productsSchema = z
  .object({
    type: z.literal('Products').default('Products'),
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    products: pathSchema('products').array().nullish(),
  })
  .strict()
