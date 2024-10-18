import button from './button'
import buttons from './buttons'
import icon from './icon'
import image from './image'
import images from './images'

import { getEntry, z } from 'astro:content'
import pathSchema from '../utils/pathSchema'
import writeup from './writeup'

export default z.preprocess(
  async (value) => {
    if (typeof value === 'string') {
      const reference = await pathSchema('pages')
        .or(pathSchema('records'))
        .parseAsync(value)
      const entry = (await getEntry(reference as any)) as any
      console.log(entry)
      const object = {
        text: entry.data.title,
        href: `/${entry.slug}/`,
      }
      return object
    } else return value
  },
  writeup
    .extend({
      image,
      images,
      buttons,
      button,
      icon,
    })
    .partial()
)
