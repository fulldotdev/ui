import { buttonSchema } from '@/schemas/components/button'
import { reference, z } from 'astro:content'

export const postsSchema = z
  .object({
    type: z.literal('Posts').default('Posts'),
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    posts: reference('posts').array().nullish(),
  })
  .strict()
