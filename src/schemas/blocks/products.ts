import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const productsSchema = z
  .object({
    type: z.literal('Products').default('Products'),
    content: z.string(),
    button: buttonSchema,
    products: pathSchema('products').array(),
  })
  .partial()
  .strict()
