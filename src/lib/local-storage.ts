export function setItem(key: string, value: unknown) {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

export function getItem(key: string) {
  if (typeof window === "undefined") return undefined
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : undefined
}
