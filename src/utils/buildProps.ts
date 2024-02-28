import merge from 'deepmerge'

export type BuildProps<Base extends object, Name extends string> = Omit<
  Base,
  Name | `_${Name & string}`
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

  // type Base = Omit<Props, keyof Props | `_${keyof Props}`>
  // return value as Extract<Props[keyof Props], Props>

  // const nested = key in value
  // return nested
  // return value
  // return typeof value === 'string'
  //   ? value
  //   : (value[name] as Extract<Props[Name], Props>)

  // type Base = Omit<Props, typeof key | typeof _key> & {
  //   [Key in typeof key]?: Props[Name]
  // }
  // const isBase = (val: unknown): val is Record<string, unknown> => {
  //   return typeof val === 'object' && val !== null && !Array.isArray(val)
  // }

  //   // type Base = Omit<Props, Name | `_${Name}`>
  // // // type Flat = Exclude<Props[Name], Props>

  // // // FIXME below does not work. When Props[Name] is equal to Props, it will delete everything.
  // // // This problem arised when using in component that have only one prop (which was an array in case of the Socials component)
  // // // Temporary fix is adding extra placeholder prop in the component, so it's not equal to Props
  // // // See Socials component for example
  // // type Flat = Exclude<Props[Name], Props>

  // const object:
  //   | (Omit<Props, typeof key | typeof _key> & {
  //       [Key in typeof key]?: Extract<Props[Name], Props>
  //     })
  //   | undefined = isBase(value) ? value : undefined

  // return object

  // const isObject: Props[Name][Name] = (v: typeof _value | typeof value) =>
  //   v[name] as Props[Name][Name]

  // type Base = Omit<Props, Name | `_${Name}`>
  // const isBase = (x: typeof _value | typeof value) =>
  //   typeof x === 'object' && !Array.isArray(x) && x !== null

  // const getBase = (x: typeof _value | typeof value) => (true ? (x as Base) : {})

  // const _base = getBase(_value)
  // const mergedBase = merge(getBase(_value), getBase(value))

  // return value

  // // TODO de key is niet getypes, in simperlweg string. Ander manier zoeken, i kdenk zoner er een object van te maken

  // const toObject = (value: Props[Name]) =>
  //   isObject(value) ? value : { [key as Name]: value }
  // const object = isObject ? value : ({ [key]: value } as Base)
  // const _object = {
  //   [_key]: _value,
  // }
  // return _object
  // const object = toObject(value)
  // const mergedObject = merge(_object, object)
  // console.log('mergedObject', object)
  // console.log('props', props)

  // // FIXME alle buttons etc komen dubbel. Ze staan namelik in de props EN in de mergedObject
  // const merged = merge(props ?? {}, mergedObject ?? {})

  // type Base = Omit<Props, Name | `_${Name}`>
  // // type Flat = Exclude<Props[Name], Props>

  // // FIXME below does not work. When Props[Name] is equal to Props, it will delete everything.
  // // This problem arised when using in component that have only one prop (which was an array in case of the Socials component)
  // // Temporary fix is adding extra placeholder prop in the component, so it's not equal to Props
  // // See Socials component for example
  // type Flat = Exclude<Props[Name], Props>

  // return merged as Base & {
  //   [Key in Name]?: Flat
  // }
}
