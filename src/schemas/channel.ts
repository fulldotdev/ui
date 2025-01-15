import { z } from 'astro:content'

export const channelSchema = z
  .object({
    icon: z.string().optional(),
    heading: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['secondary', 'outline']).optional(),
    target: z.enum(['_blank', '_self', '_parent', '_top']).optional(),
  })
  .strict()
