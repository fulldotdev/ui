import { z } from 'astro:content'

export const channelSchema = z
  .object({
    icon: z.string().optional(),
    heading: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
  })
  .strict()
