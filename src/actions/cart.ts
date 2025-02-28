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
  mutation ($variantId: ID!, $quantity: Int!) {
    cartCreate(input: { variantId: $variantId, quantity: $quantity }) {
      cart {
        ...cartFragment
      }
    }
  }
  ${FRAGMENT}
`
// export const cartCreate = defineAction({
//   input: z.object({
//     variantId: z.string(),
//     quantity: z.number(),
//   }),
//   handler: async (input) => {
//     return `Hello, ${input.name}!`
//   },
// })
