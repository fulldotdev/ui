import merge from 'deepmerge'

export type BuildProps<Base extends object, Name extends string> = Omit<
  Base,
  Name | `_${Name & string}` | 'slot' // TODO slot gives ts errors, see issue: https://github.com/withastro/astro/issues/10277. Fix could be including polymorphic in THIS function and setting everhything directly in the function, instead of in a Base interface
> & {
  [Key in Name | `_${Name & string}`]?: Name extends keyof Base
    ? Base | Base[Name]
    : Base
}

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
