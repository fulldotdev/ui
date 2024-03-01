import type { AstroGlobal } from 'astro'
import type { HTMLTag, Polymorphic } from 'astro/types'
import merge from 'deepmerge'

export type BuildProps<Base extends object, Name extends string> = Omit<
  Base,
  Name | `_${Name & string}` | 'slot' // TODO slot gives ts errors, see issue: https://github.com/withastro/astro/issues/10277. Fix could be including polymorphic in THIS function and setting everhything directly in the function, instead of in a Base interface
> & {
  [Key in Name | `_${Name & string}`]?: Name extends keyof Base
    ? Base | Base[Name]
    : Base
}

// interface ComponentConfig {
//   name: 'heading'
//   tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
//   props: {
//     heading: string
//     size: 'sm' | 'md' | 'lg'
//   }
// }

export type BuildMyProps<
  Name extends string,
  Tag extends HTMLTag,
  Props extends AstroGlobal['props'],
> = Omit<
  Props,
  Name | `_${Name & string}` | 'slot' // TODO slot gives ts errors, see issue: https://github.com/withastro/astro/issues/10277. Fix could be including polymorphic in THIS function and setting everhything directly in the function, instead of in a Base interface
> & {
  [Key in Name | `_${Name & string}`]?: Name extends keyof Props
    ? Props | Props[Name]
    : Props
} & Polymorphic<{ as: Tag }>

export const buildProps = <
  Props extends BuildProps<Record<string, any>, Name>,
  Name extends string,
>(
  Astro: { props: Props },
  name: Name
) => {
  const props = Astro.props
  const _key = `_${name}` as `_${Name}`
  const key = name
  const _value = props[_key]
  const value = props[key] || _value

  const isObject = (val: any): boolean =>
    typeof val === 'object' && !Array.isArray(val) && val !== null
  const toObject = (val: any) => (isObject(val) ? val : { [key]: val })

  const _object = toObject(_value)
  const object = toObject(value)
  const mergedObject = merge(_object, object)

  delete props[_key]
  delete props[key]

  const merged = merge(props, mergedObject || {})
  return merged as Omit<Props, Name | `_${Name}`> & {
    [Key in Name]?: Exclude<Props[Name], object & { length?: never }>
  }
}

// interface ComponentConfig {
//   name: 'heading'
//   tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
//   props: {
//     heading: string
//     size: 'sm' | 'md' | 'lg'
//   }
// }

// export type BuildMyProps<
//   Name extends Exclude<string, HTMLAttributes<HTMLTag>>,
//   Tag extends HTMLTag,
//   Props extends AstroGlobal['props'],
// > = Omit<
//   Props,
//   Name // TODO slot gives ts errors, see issue: https://github.com/withastro/astro/issues/10277. Fix could be including polymorphic in THIS function and setting everhything directly in the function, instead of in a Base interface
// > & {
//   [Key in Name | `_${Name & string}`]?: Name extends keyof Props
//     ? Props | Props[Name]
//     : Props
// } & Omit<Polymorphic<{ as: Tag }>, 'slot' | 'style' | 'class:list'>

// export const buildProps = <
//   Props extends BuildMyProps<Name, HTMLTag, Record<string, any>>,
//   Name extends Exclude<string, HTMLAttributes<HTMLTag>>,
// >(
//   Astro: { props: Props },
//   name: Name
// ) => {
//   const props = Astro.props
//   const _key = `_${name}` as `_${Name}`
//   const key = name
//   const _value = props[_key]
//   const value = props[key] || _value

//   const isObject = (val: any): boolean =>
//     typeof val === 'object' && !Array.isArray(val) && val !== null
//   const toObject = (val: any) => (isObject(val) ? val : { [key]: val })

//   const _object = toObject(_value)
//   const object = toObject(value)
//   const mergedObject = merge(_object, object)

//   delete props[_key]
//   delete props[key]

//   const merged = merge(props, mergedObject || {})
//   return merged as Omit<Props, Name | `_${Name}`>
// }
