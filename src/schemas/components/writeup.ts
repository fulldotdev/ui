import { z } from 'astro:content'
import badge from './badge'
import heading from './heading'
import list from './list'
import price from './price'
import rating from './rating'
import tagline from './tagline'
import text from './text'

export default z.object({
  rating,
  badge,
  tagline,
  heading,
  text,
  list,
  price,
})
