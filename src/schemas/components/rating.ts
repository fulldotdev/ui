import { z } from 'astro:content'
import avatar from './avatar'
import avatars from './avatars'
import text from './text'

export default z.number().or(
  z
    .object({
      value: z.number(),
      avatar,
      avatars,
      text,
    })
    .partial()
)
