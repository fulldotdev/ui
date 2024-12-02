import { z } from 'astro:content'
import { logoSchema } from '../components/logo'
import { headingSchema } from './heading'
import { linkSchema } from './link'
import { menuSchema } from './menu'

export const sidebarSchema = z
  .object({
    company: z.string().optional(),
    logo: logoSchema.optional(),
    heading: headingSchema.shape.text,
    themer: z.boolean().optional(),
    menus: menuSchema.array().optional(),
    links: linkSchema.array().optional(),
  })
  .strict()

export type SidebarSchema = z.infer<typeof sidebarSchema>
