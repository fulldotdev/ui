import { z } from 'astro:content'
import buttons from './buttons'
import links from './links'
import logo from './logo'
import menu from './menu'
import themer from './themer'

export default z
  .object({
    themer,
    logo,
    buttons,
    links,
    menu,
  })
  .partial()
  .passthrough()
