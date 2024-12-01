import { z } from 'astro:content'
import { logoSchema } from '../components/logo'
import { menuSchema } from './menu'

export const sidebarSchema = z
  .object({
    company: z.string().optional(),
    logo: logoSchema.optional(),
    heading: z.string().optional(),
    themer: z.boolean().optional(),
    menus: menuSchema.array().optional(),
  })
  .strict()

export type SidebarSchema = z.infer<typeof sidebarSchema>
