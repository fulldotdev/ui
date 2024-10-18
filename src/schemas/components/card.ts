import button from './button'
import buttons from './buttons'
import icon from './icon'
import image from './image'
import images from './images'

import { z } from 'astro:content'
import pathSchema from '../utils/pathSchema'
import writeup from './writeup'

export default z
  .union([
    pathSchema('pages'),
    pathSchema('records'),
    z.object({}).passthrough(),
  ])
  .pipe(
    writeup
      .extend({
        slug: z
          .string()
          .refine(async (data) => await pathSchema('pages').parseAsync(data)),
        id: z
          .string()
          .refine(async (data) => await pathSchema('records').parseAsync(data)),
        image,
        images,
        buttons,
        button,
        icon,
      })
      .partial()
      .passthrough()
  )
