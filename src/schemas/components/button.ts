import { glob } from 'astro/loaders'
import { getEntry, z } from 'astro:content'
import pathSchema from '../utils/pathSchema'

export default z.preprocess(
  async (value) => {
    if (typeof value === 'string') {
      const reference = await pathSchema('pages').parseAsync(value)
      const myfile = glob({ pattern: '**/*.md', base: './src/content/pages' })
      console.log(myfile)
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
