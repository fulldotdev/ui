import { z } from 'astro:content'
import { pathSchema } from './utils'

const link = pathSchema('pages').or(
  z
    .object({
      text: z.string(),
      href: z.string(),
      heading: z.never(),
      links: z.never(),
    })
    .partial()
    .passthrough()
)

const group = z
  .object({
    heading: z.string(),
    links: z.array(link),
    text: z.never(),
    href: z.never(),
  })
  .partial()
  .passthrough()

export const sidebar = z
  .object({
    heading: z.string(),
    search: z.boolean(),
    links: z.array(link.or(group)),
  })
  .partial()
  .passthrough()
