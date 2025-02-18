import { buttonSchema } from '@/schemas/fields/button'
import { reference, z } from 'astro:content'

export const postSelectionSchema = z
  .object({
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    posts: reference('posts').array().nullish(),
  })
  .strict()

export type PostSelectionSchema = z.infer<typeof postSelectionSchema>
