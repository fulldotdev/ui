import { z } from 'astro:content'
import pathSchema from '../utils/pathSchema'
import button from './button'
import buttons from './buttons'
import icon from './icon'
import image from './image'
import images from './images'

export const cardSchema = z
  .union([pathSchema('pages'), z.object({}).passthrough()])
  .pipe(
    z
      .object({
        slug: z
          .string()
          .refine(async (data) => await pathSchema('pages').parseAsync(data)),
        image: image,
        images: images,
        position: z.enum(['background', 'cover', 'inset']),
        buttons: buttons,
        button: button,
        variant: z.string(),
        align: z.string(),
        icon: icon,
        price: z.number(),
        panel: z.boolean(),
        title: z.string(),
        heading: z.string(),
        level: z.enum(['1', '2', '3', '4', '5', '6']),
        badge: z.any(),
        tagline: z.string(),
        rating: z.number(),
        text: z.string(),
        list: z.array(z.any()),
      })
      .partial()
      .passthrough()
  )

export type CardSchema = z.infer<typeof cardSchema>

export default cardSchema
