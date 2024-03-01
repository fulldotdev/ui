export const sortByIndex = (
  array: any[] | undefined | null
): any[] | undefined | null => {
  if (!array) return array
  // const increased = array?.map((item) => ({ ...item, index: item.index + 1 }))
  // const indexed = increased?.map((item, i) => ({ index: i + 0.99, ...item }))
  const indexed = array?.map((item, i) => ({ index: i, ...item }))
  const sorted = indexed?.sort((a, b) => {
    const index = (i: number) => (i < 0 ? indexed.length + 1 + i : i)
    return index(a.index) - index(b.index)
  })
  return sorted
}
