import { z } from 'astro:content'
import pathSchema from '../utils/pathSchema'
import globalSchema from './global'

export const buttonSchema = z
  .union([pathSchema('pages'), z.object({}).passthrough()])
  .pipe(
    globalSchema
      .extend({
        slug: z
          .string()
          .refine(async (data) => await pathSchema('pages').parseAsync(data)),
        text: z.string(),
        href: z.string(),
        icon: z.string(),
      })
      .partial()
      .passthrough()
      .merge(globalSchema)
  )

export type ButtonSchema = z.infer<typeof buttonSchema>

export default buttonSchema
