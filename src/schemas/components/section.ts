import { reference } from 'astro:content'
import component from '../utils/component'
import buttons from './buttons'
import cards from './cards'
import image from './image'
import writeup from './writeup'

export default writeup
  .extend({
    component,
    image,
    buttons,
    cards,
    products: reference('products').array().optional(),
  })
  .partial()
  .passthrough()
