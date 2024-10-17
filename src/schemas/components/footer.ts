import { z } from 'astro:content'
import buttons from './buttons'
import channels from './channels'
import heading from './heading'
import logo from './logo'
import socials from './socials'
import text from './text'

export default z
  .object({
    logo,
    text,
    socials,
    channels,
    columns: z.array(
      z
        .object({
          heading,
          buttons,
        })
        .partial()
    ),
  })
  .partial()
