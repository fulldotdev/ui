import { z } from 'astro:content'
import footer from './components/footer'
import header from './components/header'
import image from './components/image'
import sections from './components/sections'
import sidebar from './components/sidebar'
import toc from './components/toc'
import component from './utils/component'
import navigation from './utils/navigation'
import parents from './utils/parents'

export default z
  .object({
    component,
    parents,
    theme: z.enum(['light', 'dark']),
    lang: z.string(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    title: z.string(),
    description: z.string().optional(),
    image,
    sections,
    footer,
    header: z.boolean().or(header),
    sidebar: z.boolean().or(sidebar),
    navigation,
    toc,
  })
  .partial()
  .passthrough()
