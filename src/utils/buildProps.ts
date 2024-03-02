import type { AstroGlobal } from 'astro'
import type { HTMLTag, Polymorphic } from 'astro/types'
import merge from 'deepmerge'

type N<Name extends string> = Name | `_${Name}`
type T<Tag extends HTMLTag, Name extends string> = Omit<
  Polymorphic<{ as: Tag }>,
  Name | 'slot'
> // TODO slot gives ts errors, see issue: https://github.com/withastro/astro/issues/10277. Fix could be including polymorphic in THIS function and setting everhything directly in the function, instead of in a Base interface

export type BuildProps<
  Props extends AstroGlobal['props'],
  Name extends string,
  Tag extends HTMLTag = HTMLTag,
> = Omit<Props, Name> & {
  [Key in N<Name>]?: Name extends keyof Props
    ? (Props & T<Tag, Name>) | Props[Name] | null
    : (Props & T<Tag, Name>) | null
} & T<Tag, Name>

export const buildProps = <
  Props extends BuildProps<AstroGlobal['props'], Name, HTMLTag>,
  Name extends string,
>(
  Astro: { props: Props },
  name: Name
) => {
  const props = Astro.props
  const _key = `_${name}` as `_${Name}`
  const key = name
  // FIXME
  // @ts-ignore
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

  const merged = merge(props, mergedObject || {}) as any // FIXME
  merged.class
    ? (merged.class = merged.class += ` ${name}`)
    : (merged.class = name)

  // FIXME
  // @ts-ignore
  return merged as Omit<Props, Name | `_${Name}`> & {
    [Key in Name]?: Exclude<Props[Name], object & { length?: never }>
  }
}
