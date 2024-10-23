import { z } from 'astro:content'
import logo from '../components/logo'
import menu from '../components/menu'
import heading from './heading'
import toc from './toc'

export default z
  .object({
    logo,
    heading,
    menu,
    toc,
  })
  .partial()
  .passthrough()
