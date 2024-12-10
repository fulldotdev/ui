import { z } from 'astro:content'
import { headingSchema } from 'fulldev-ui/schemas/heading.ts'
import { iconSchema } from 'fulldev-ui/schemas/icon.ts'

export const channelSchema = z
  .object({
    icon: iconSchema.shape.name,
    heading: headingSchema.shape.text,
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
