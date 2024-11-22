import { z } from 'astro:content'
import buttons from './buttons'
import links from './links'
import logo from './logo'
import menu from './menu'
import subheader from './subheader'
import themer from './themer'

export default z
  .object({
    themer,
    subheader,
    logo,
    buttons,
    links,
    menu,
  })
  .partial()
  .passthrough()
