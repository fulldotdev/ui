import type { ZodObject, ZodRawShape } from 'astro/zod'
import { z } from 'astro:content'

const zOriginal = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
})

const morph = <S extends ZodObject<ZodRawShape>>(schema: S) => {
  const shape = schema.shape
  const keys = Object.keys(shape) as (keyof z.infer<typeof schema>)[]
  let object: any = {}
  keys.forEach((key) => {
    object['hoi'] = z.string()
  })

  console.log('objj', object)
}

const zMorphed = morph(zOriginal)
console.log('zMorphed', zMorphed)
// const toObject = (name: string, value: any) => {
//   if (!value) return {}
//   if (typeof value === 'object' && !Array.isArray(value)) return value
//   return { [name]: value }
// }

// export const mergeProps = (name: string, val: any) => {
//   const stripped = { ...val }
//   delete stripped[name]
//   delete stripped[`_${name}`]

//   return merge(
//     stripped,
//     toObject(name, val[`_${name}`]),
//     toObject(name, val[name])
//   )
// }

// export const morph = <
//   N extends (keyof S & string) | string,
//   S extends ZodRawShape,
//   P extends AstroGlobal['props'],
// >(
//   name: N,
//   shape: S
// ) => {
//   const microSchema = z.object(shape)
//   const microParse = (props: P) =>
//     microSchema.parse(mergeProps(name, props)) as z.infer<typeof microSchema>

//   const mesoSchema = tag.merge(microSchema)
//   const mesoParse = (props: P) => {
//     try {
//       return mesoSchema.parse(mergeProps(name, props))
//     } catch (error) {
//       // @ts-ignore
//       throw new Error(fromZodError(error))
//     }
//   }

//   const value = microSchema.shape[name].or(mesoSchema).nullable()
//   // const value = microSchema.shape[name] // TODO: not sure if this fully works yet. is replacement of line above // TODO return any. see card in cards for example
//   //   ? microSchema.shape[name].or(mesoSchema).nullable()
//   //   : z.any().nullable()

//   const nested = {
//     [name]: value,
//     [`_${name}`]: value,
//   } as {
//     [K in N | `_${N}`]: typeof value
//   }

//   const macroSchema = mesoSchema.extend(nested)
//   const macroParse = (props: P | null) => macroSchema.parse(props)

//   return { micro: microParse, meso: mesoParse, macro: macroSchema }
// }
