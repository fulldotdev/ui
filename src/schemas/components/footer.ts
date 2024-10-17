import { z } from 'astro:content'
import channels from './channels'
import logo from './logo'
import socials from './socials'
import text from './text'

export default z.object({
  logo,
  text,
  socials,
  channels,
  columns: z.array(
    z.object({
      heading: z.string(),
      buttons: z.array(
        z.object({
          href: z.string(),
          text: z.string(),
        })
      ),
    })
  ),
})
