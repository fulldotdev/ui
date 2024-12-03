import { z } from 'astro:content'
import { headerSchema } from './header'
import { sidebarSchema } from './sidebar'

export const navigationSchema = headerSchema.merge(sidebarSchema).extend({
  header: z.boolean().optional(),
  sidebar: z.boolean().optional(),
})

export type NavigationSchema = z.infer<typeof navigationSchema>
