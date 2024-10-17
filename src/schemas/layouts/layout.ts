import { z } from 'astro:content'
import footer from '../components/footer'
import header from '../components/header'
import sections from '../components/sections'

export default z.object({
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
  title: z.string(),
  description: z.string(),
  theme: z.enum(['light', 'dark']),
  lang: z.string(),
  header,
  sections,
  footer,
})
