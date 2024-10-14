import { z } from 'astro:content'
import { pathSchema } from './utils'

const button = pathSchema('pages').or(
  z
    .object({
      text: z.string(),
      href: z.string(),
      heading: z.never(),
      buttons: z.never(),
    })
    .partial()
    .passthrough()
)

const group = z
  .object({
    heading: z.string(),
    buttons: z.array(button),
    text: z.never(),
    href: z.never(),
  })
  .partial()
  .passthrough()

export const navigation = z
  .object({
    logo: z.string(),
    search: z.boolean(),
    sidebar: z.boolean(),
    toc: z.boolean(),
    buttons: z.array(button.or(group)),
  })
  .partial()
  .passthrough()
