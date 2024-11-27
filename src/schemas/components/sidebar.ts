import { z } from 'astro:content'
import logo from '../components/logo'
import menu from '../components/menu'
import heading from './heading'
import themer from './themer'

export default z
  .object({
    themer,
    logo,
    heading,
    menu,
  })
  .partial()
  .passthrough()
  .optional()
