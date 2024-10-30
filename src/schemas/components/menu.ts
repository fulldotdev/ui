import { z } from 'astro:content'
import buttons from './buttons'
import heading from './heading'
import links from './links'

export default z.array(
  z
    .object({
      heading,
      buttons,
      links,
    })
    .partial()
    .passthrough()
)
