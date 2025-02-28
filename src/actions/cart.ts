import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import config from '../data/config.json'

export const client = createStorefrontApiClient({
  storeDomain: config.shopify.storeDomain,
  apiVersion: '2025-01',
  publicAccessToken: config.shopify.publicAccessToken,
})

const FRAGMENT = `#graphql
  fragment cartFragment on Cart {
    id
    lines(first: 250) {
      nodes {
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
  ${FRAGMENT}
`

const CartLinesAddMutation = `#graphql
  mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFragment
      }
    }
  }
  ${FRAGMENT}
`

const CartLinesRemoveMutation = `#graphql
  mutation ($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartFragment
      }
    }
  }
  ${FRAGMENT}
`

const CartLinesUpdateMutation = `#graphql
  mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFragment
      }
    }
  }
  ${FRAGMENT}
`

export const cartCreate = defineAction({
  input: z.never(),
  handler: async (_, context) => {
    const response = await client.request(CartCreateMutation)
    console.log('response', response)
    return response.data.cartCreate.cart
  },
})
