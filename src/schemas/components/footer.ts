import { z } from 'astro:content'
import channels from './channels'
import logo from './logo'
import menu from './menu'
import socials from './socials'
import text from './text'

export default z
  .object({
    logo,
    text,
    socials,
    channels,
    menu,
  })
  .partial()
  .passthrough()
  .optional()
