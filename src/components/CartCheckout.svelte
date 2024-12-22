<script lang="ts">
  import { cart } from 'fulldev-ui/stores/cart.svelte.ts'
  import Stripe from 'stripe'

  const { STRIPE_RESTRICTED_KEY, URL } = $props()

  async function handeClick() {
    if (!STRIPE_RESTRICTED_KEY) {
      console.error('Stripe key is missing')
      return
    }
    const stripe = new Stripe(STRIPE_RESTRICTED_KEY)
    const checkoutConfig = {
      success_url: `${URL}/checkout`,
      mode: 'payment',
      customer_creation: 'always',
      shipping_address_collection: {
        allowed_countries: ['NL'],
      },
      phone_number_collection: {
        enabled: true,
      },
    }

    const lineItems = $cart.map((item) => ({
      quantity: item.quantity,
      adjustable_quantity: {
        enabled: true,
        maximum: 999999,
      },
      price_data: {
        currency: 'eur',
        product_data: {
          name:
            item.variants && Object.values(item.variants || {}).length
              ? `${item.title} - ${Object.values(item.variants).join(' / ')}`
              : item.title,
          // images: [item.image ? URL + item.image : ''],
        },
        unit_amount: Math.round(item.price || 0 * 100),
      },
    }))

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      ...checkoutConfig,
    })

    checkoutSession.url && window.location.replace(checkoutSession.url)
  }
</script>

<button
  class="button variant-primary size-md"
  onclick={handeClick}
>
  Afrekenennn
</button>
