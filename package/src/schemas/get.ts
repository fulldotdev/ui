import { z } from 'zod'

const collections = ['posts', 'pages', 'projects', 'snippets']

const getSchema = z
  .string()
  .refine(async (val) => {
    if (typeof val !== 'string') return
    if (!val.startsWith('$')) return
    const collection = val.split('.')[0]
    if (!collection) return
    if (!collections.includes(collection)) return
    return true
  })
  .transform(async (val) => {
    const slug = val.split('.')[1]
    if (!slug) return

    const key = val.split('.').slice(2).join('.')
  })

// export const entrySchema = z
// .any().nullish()
// .transform((val) => {
//   if (typeof val !== 'string') return val
//   val = val.split('content/').pop()
//   val = val.startsWith('/') ? val.slice(1) : val //shorter
//   const collection = val?.split('/').shift()
//   const slug = val?.split('/').slice(1).join('/')
//   return { collection, slug }
// })
// .pipe(
//   z.object({
//     collection,
//     slug,
//   })
// )
