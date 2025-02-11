import { z } from 'astro:content'
import { channelSchema } from '../fields/channel'

export const contactSchema = z
  .object({
    writeup: z.string().optional(),
    channels: channelSchema.array().optional(),
    socials: z.string().array().optional(),
    form: z.any(),
  })
  .strict()

export type ContactSchema = z.infer<typeof contactSchema>
