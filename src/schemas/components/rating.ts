import { z } from 'astro:content'
import { avatarSchema } from './avatar'

export const ratingSchema = z.preprocess(
  (data: unknown) => (typeof data === 'number' ? { score: data } : data),
  z
    .object({
      score: z.number().optional(),
      avatar: avatarSchema.optional(),
      avatars: z.array(avatarSchema).optional(),
      text: z.string().optional(),
      size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
    })
    .strict()
)

export type RatingSchema = z.infer<typeof ratingSchema>
