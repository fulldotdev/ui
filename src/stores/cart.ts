import { persistentAtom } from '@nanostores/persistent'
import type { Cart } from '@shopify/hydrogen/storefront-api-types'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { atom } from 'nanostores'
import config from '../data/config.json'

// Client
export const client = createStorefrontApiClient({
  storeDomain: config.shopify.storeDomain,
  apiVersion: '2025-01',
  publicAccessToken: config.shopify.publicAccessToken,
})

// Stores
export const isCartOpen = atom(false)

export const cartId = persistentAtom<string>('cartId', '', {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const cart = atom<Partial<Cart>>({})

// GraphQL
const CART_FRAGMENT = `#graphql
  fragment cartFragment on Cart {
    id
    totalQuantity
    lines(first: 250) {
      nodes {
        id
        merchandise {
          ... on ProductVariant {
            image {
              url
              altText
            }
            title
          }
        }
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
    checkoutUrl
  }
`

const CartCreateMutation = `#graphql
  mutation {
    cartCreate {
      cart {
        ...cartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`

async function cartCreate() {
  const response = await client.request(CartCreateMutation)
  const cart = response.data.cartCreate.cart
  cartId.set(cart.id)
  cart.set(cart)
}

const GetCartQuery = `#graphql
  query ($cartId: ID!) {
    cart(id: $cartId) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`

async function getCart() {
  const response = await client.request(GetCartQuery, {
    variables: { cartId: cartId.get() },
  })
  const data = response.data.cart
  cart.set(data)
}

async function initCart() {
  if (cartId.get()) {
    await getCart()
  } else {
    await cartCreate()
  }
}

const CartLinesAddMutation = `#graphql
  mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`

export async function cartLineAdd(merchandiseId: string, quantity: number) {
  const response = await client.request(CartLinesAddMutation, {
    variables: {
      cartId: cartId.get(),
      lines: [{ merchandiseId, quantity }],
    },
  })
  const data = response.data.cartLinesAdd.cart
  cart.set(data)
}

const CartLinesRemoveMutation = `#graphql
  mutation ($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`

export async function cartLineRemove(lineId: string) {
  const response = await client.request(CartLinesRemoveMutation, {
    variables: {
      cartId: cartId.get(),
      lineIds: [lineId],
    },
  })
  const data = response.data.cartLinesRemove.cart
  cart.set(data)
}

initCart()
