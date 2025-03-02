import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const productsSchema = z
  .object({
    content: z.string(),
    buttons: buttonSchema.array(),
    products: pathSchema('products').array(),
  })
  .partial()
  .strict()
