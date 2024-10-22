import { z } from 'astro:content'
import buttons from './buttons'
import heading from './heading'

export default z.array(
  z
    .object({
      heading,
      buttons,
    })
    .partial()
    .passthrough()
)
