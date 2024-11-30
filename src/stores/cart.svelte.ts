import { derived, writable } from 'svelte/store'

export type CartItem = {
  uid: string
  quantity: number
  slug: string
  title: string
  price?: number | undefined
  image?: string | undefined
  variants?:
    | {
        [k: string]: string | undefined
      }
    | undefined
}

export type Cart = CartItem[]

const isServer = import.meta.env.SSR
const storageJson = !isServer && localStorage.getItem('cart')
const storageData = storageJson ? JSON.parse(storageJson) : []

export const cart = writable<Cart>(storageData)

cart.subscribe((newCart) => {
  if (isServer) return
  const json = JSON.stringify(newCart)
  localStorage.setItem('cart', json)
})

export const getUid = (
  slug: CartItem['slug'],
  variants?: CartItem['variants']
) => (variants ? `${slug}-${Object.values(variants)?.join('-')}` : slug)

export const getItemIndex = (currentCart: Cart, uid: CartItem['uid']) => {
  const index = currentCart.findIndex((i) => i.uid === uid)
  if (index === -1) throw new Error(`Item with uid ${uid} not found`)
  return index
}

export const addItem = (item: CartItem) =>
  cart.update((currentCart) => [...currentCart, item])

export const removeItem = (uid: CartItem['uid']) =>
  cart.update((currentCart) => {
    const index = getItemIndex(currentCart, uid)
    currentCart.splice(index, 1)
    return [...currentCart]
  })

export const updateQuantity = (
  uid: CartItem['uid'],
  quantity: CartItem['quantity']
) =>
  cart.update((currentCart) => {
    const index = getItemIndex(currentCart, uid)
    if (currentCart[index]) currentCart[index].quantity = quantity
    return [...currentCart]
  })

export const openCart = () => {
  const cartDialog = document.querySelector('dialog#cart')
  if (cartDialog instanceof HTMLDialogElement) cartDialog.showModal()
}

export const closeCart = () => {
  const cartDialog = document.querySelector('dialog#cart')
  if (cartDialog instanceof HTMLDialogElement) cartDialog.close()
}

export const totalPrice = derived(cart, ($cart) => {
  console.log('DERIVED', $cart)
  return $cart.length
  // return $cart.reduce(
  //   (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
  //   0
  // )
})
