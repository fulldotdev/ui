import { z } from 'astro:content'

// export default z.string().refine(
//   (value) => {
//     const packageLayouts = import.meta.glob('../layouts/**/*.astro')
//     const userLayouts = import.meta.glob('/src/layouts/**/*.astro')
//     const mapBlockKeys = (blocks: any) =>
//       mapKeys(blocks, (key: any) => key.split('/').pop().split('.').shift())
//     const mergedLayoutComponents = {
//       ...mapBlockKeys(packageLayouts),
//       ...mapBlockKeys(userLayouts),
//     }
//     return mergedLayoutComponents[value] !== undefined
//   },
//   (value) => ({ message: `component: the layout "${value}" does not exist` })
// )

// export default z.string().transform((value) => {
//   if (!value) return value
//   return value
// const packageComponents = import.meta.glob('../../**/*.astro')
// const userComponents = import.meta.glob('/src/**/*.astro')
// const mergedComponents = {
//   ...packageComponents,
//   ...userComponents,
// }
// const path = Object.keys(mergedComponents).find((key) => {
//   const componentName = key.split('/').pop()?.split('.').shift()
//   return componentName === value
// })
// console.log('PATH', path)
// return path
// })

export default z.string()
