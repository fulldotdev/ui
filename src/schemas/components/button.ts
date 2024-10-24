// import { z } from 'astro:content'
// import pathSchema from '../utils/pathSchema'

// export default z.union([pathSchema('pages'), z.object({}).passthrough()]).pipe(
//   z
//     .object({
//       slug: z
//         .string()
//         .refine(async (data) => await pathSchema('pages').parseAsync(data)),
//       text: z.string(),
//       href: z.string(),
//       icon: z.string(),
//     })
//     .partial()
//     .passthrough()
// )

import { z } from 'astro:content'
import pathSchema from '../utils/pathSchema'

export const buttonSchema = z
  .union([pathSchema('pages'), z.object({}).passthrough()])
  .pipe(
    z
      .object({
        slug: z
          .string()
          .refine(async (data) => await pathSchema('pages').parseAsync(data)),
        text: z.string(),
        href: z.string(),
        icon: z.string(),
      })
      .partial()
      .passthrough()
  )

export type ButtonSchema = z.infer<typeof buttonSchema>

export default buttonSchema
