import { z } from 'astro:content'
import logo from '../components/logo'
import heading from './heading'
import links from './links'
import themer from './themer'

export const sidebarSchema = z
  .object({
    company: z.string().optional(),
    logo: logo,
    heading: heading,
    themer: themer,
    menu: z
      .object({
        heading: heading,
        links: links,
      })
      .array()
      .optional(),
  })
  .strict()

export type SidebarSchema = z.infer<typeof sidebarSchema>
