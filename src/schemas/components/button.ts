import { getEntry, z } from 'astro:content'
import pathSchema from '../utils/pathSchema'

const button = z
  .object({
    text: z.string(),
    href: z.string(),
    icon: z.string(),
  })
  .partial()
  .passthrough()

// export default button.or(
//   pathSchema('pages').transform(async (value) => {
//     const entry = (await getEntry(value)) as any
//     console.log(entry)
//     return {
//       text: entry.data.title,
//       href: `/${entry.slug}/`,
//     }
//   })
// )

export default z.preprocess(
  async (value) => {
    if (typeof value === 'string') {
      const reference = await pathSchema('pages').parseAsync(value)
      const entry = (await getEntry(reference)) as any
      const object = {
        text: entry.data.title,
        href: `/${entry.slug}/`,
      }
      return object
    } else return value
  },
  z
    .object({
      text: z.string(),
      href: z.string(),
      icon: z.string(),
    })
    .partial()
    .passthrough()
)
