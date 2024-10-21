// import { z } from 'astro:content'
// import button from '../components/button'
// import buttons from '../components/buttons'
// import heading from '../components/heading'
// import logo from '../components/logo'

// export default z.object({
//   logo,
//   buttons: z.array(
//     button.or(
//       z.object({
//         heading,
//         buttons,
//       })
//     )
//   ),
// })

import { z } from 'astro:content'
import pathSchema from '../utils/pathSchema'

const button = pathSchema('pages').or(
  z
    .object({
      text: z.string(),
      href: z.string(),
      heading: z.never(),
      buttons: z.never(),
    })
    .partial()
    .passthrough()
)

const group = z
  .object({
    heading: z.string(),
    buttons: z.array(button),
    text: z.never(),
    href: z.never(),
  })
  .partial()
  .passthrough()

export default z
  .object({
    logo: z.string(),
    search: z.boolean(),
    sidebar: z.boolean(),
    toc: z.boolean(),
    buttons: z.array(button.or(group)),
  })
  .partial()
  .passthrough()
