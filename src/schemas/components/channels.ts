import { z } from 'astro:content'

export const channelsSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
})
