import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const productsSchema = z
  .object({
    variant: z.number().default(1),
    content: z.string(),
    button: buttonSchema,
    products: pathSchema('products').array(),
  })
  .partial()
  .strict()
