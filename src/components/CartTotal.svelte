<script lang="ts">
  import { cart } from 'fulldev-ui/stores/cart.svelte.ts'
  import { formatPrice } from 'fulldev-ui/utils/cart'

  let total = $derived(
    $cart.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
      0
    )
  )
</script>

<div>
  {formatPrice(total)}
</div>
