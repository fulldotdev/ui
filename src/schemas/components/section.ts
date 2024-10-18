import component from '../utils/component'
import pathSchema from '../utils/pathSchema'
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
    pages: pathSchema('pages').array(),
    records: pathSchema('records').array(),
  })
  .partial()
  .passthrough()
