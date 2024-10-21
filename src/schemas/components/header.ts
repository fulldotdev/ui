import { z } from 'astro:content'
import buttons from './buttons'
import logo from './logo'

export default z.boolean().or(
  z
    .object({
      logo,
      buttons,
    })
    .partial()
    .passthrough()
)
