import { z } from 'astro:content'
import image from './components/image'
import sections from './components/sections'
import component from './utils/component'
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
    header: z.any(),
    footer: z.any(),
    navigation: z.any(),
    toc: z.any(),
    sidebar: z.any(),
  })
  .partial()
