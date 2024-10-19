import { z } from 'astro:content'
import image from './components/image'
import sections from './components/sections'
import categories from './utils/categories'
import component from './utils/component'

export default z
  .object({
    component,
    categories,
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
