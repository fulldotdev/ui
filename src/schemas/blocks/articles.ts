import { buttonSchema } from '@/schemas/components/button'
import { reference, z } from 'astro:content'

export const articlesSchema = z
  .object({
    type: z.literal('Articles').default('Articles'),
    variant: z.number().default(1),
    content: z.string(),
    button: buttonSchema,
    articles: reference('articles').array(),
  })
  .partial()
  .strict()
