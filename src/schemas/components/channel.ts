import { z } from 'astro:content'
import buttonSchema from './button'
import heading from './heading'
import icon from './icon'
import text from './text'

export const channelSchema = z.object({
  icon: icon,
  heading: heading,
  text: text,
  href: buttonSchema.shape.href,
  size: buttonSchema.shape.size,
  variant: buttonSchema.shape.variant,
})

export type ChannelSchema = z.infer<typeof channelSchema>
