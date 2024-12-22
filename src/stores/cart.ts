import { persistentAtom } from '@nanostores/persistent'
import { computed } from 'nanostores'

type Item = {
  slug: string
  title: string
  price: number
  image: string
  quantity: number
  variants: string[]
}

type Cart = Item[] | []

export const $cart = persistentAtom<Cart>('cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})

// for svelte files
export const cart = $cart

export const getCart = () => $cart.get()

export const setCart = (cart: Cart) => $cart.set(cart)

export const removeItem = (slug: string) => {
  const currentCart = getCart()
  const newCart = [...currentCart]
  const index = currentCart.findIndex((item) => item.slug === slug)
  newCart.splice(index, 1)
  $cart.set(newCart)
}

export const addItem = (item: Item) => {
  const currentCart = getCart()
  const newCart = [...currentCart]
  const index = currentCart.findIndex(
    (i) => i.slug === item.slug && i.variants.join() === item.variants.join()
  )
  if (index === -1) newCart.push(item)
  else {
    let newItem = { ...newCart[index] } as Item
    newItem.quantity += item.quantity
    newCart[index] = newItem
  }
  setCart(newCart)
}

export const updateQuantity = (slug: string, quantity: number) => {
  const currentCart = getCart()
  const newCart = [...currentCart]
  const index = currentCart.findIndex((item) => item.slug === slug)
  let newItem = { ...newCart[index] } as Item
  newItem.quantity = quantity
  newCart[index] = newItem
  setCart(newCart)
}

export const $totalPrice = computed($cart, ($cart) =>
  $cart.reduce((a, b) => +a + b.price * b.quantity, 0)
)

export const openCart = () => {
  const cartDialog = document.querySelector('dialog#cart')
  if (cartDialog instanceof HTMLDialogElement) cartDialog.showModal()
}

export const closeCart = () => {
  const cartDialog = document.querySelector('dialog#cart')
  if (cartDialog instanceof HTMLDialogElement) cartDialog.close()
}

// export const totalQuantity = computed(cart, ($cart) =>
//   $cart.reduce((a, b) => +a + b.quantity, 0)
// )
