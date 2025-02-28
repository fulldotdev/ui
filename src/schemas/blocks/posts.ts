import { buttonSchema } from '@/schemas/components/button'
import { reference, z } from 'astro:content'

export const postsSchema = z
  .object({
    type: z.literal('Posts').default('Posts'),
    content: z.string(),
    button: buttonSchema,
    posts: reference('posts').array(),
  })
  .partial()
  .strict()
