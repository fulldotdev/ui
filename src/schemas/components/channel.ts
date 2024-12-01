import { z } from 'astro:content'

export const channelSchema = z
  .object({
    icon: z.string().optional(),
    heading: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
    variant: z
      .enum(['primary', 'secondary', 'outline', 'ghost'])
      .default('secondary')
      .optional(),
  })
  .strict()

export type ChannelSchema = z.infer<typeof channelSchema>
