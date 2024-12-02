import { z } from 'astro:content'
import { headingSchema } from 'fulldev-ui/schemas/components/heading'
import { taglineSchema } from 'fulldev-ui/schemas/components/tagline'
import { channelSchema } from '../components/channel'
import { paragraphSchema } from '../components/paragraph'
import { socialSchema } from '../components/social'

export const contactSchema = z
  .object({
    tagline: taglineSchema.optional(),
    heading: headingSchema.optional(),
    paragraph: paragraphSchema.optional(),
    channels: channelSchema.array().optional(),
    socials: socialSchema.array().optional(),
  })
  .strict()

export type ContactSchema = z.infer<typeof contactSchema>
