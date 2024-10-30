import { z } from 'astro:content'
import buttons from './buttons'
import links from './links'
import logo from './logo'

export default z
  .object({
    logo,
    buttons,
    links,
  })
  .partial()
  .passthrough()
