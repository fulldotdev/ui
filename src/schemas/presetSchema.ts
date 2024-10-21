import { z } from 'astro:content'
import footer from './components/footer'
import header from './components/header'
import image from './components/image'
import sections from './components/sections'
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
    header,
    footer,
    navigation,
    toc: z.any(),
    sidebar: z.any(),
  })
  .partial()
  .passthrough()
