<script lang="ts">
  import { cart } from 'fulldev-ui/stores/cart.svelte.ts'
  import { formatPrice } from 'fulldev-ui/utils/cart'
  import CartQuantity from './CartQuantity.svelte'

  function removeItem(index: number) {
    cart.update((currentCart) => {
      currentCart.splice(index, 1)
      return [...currentCart]
    })
  }
</script>

<div class="cart-list">
  {#each $cart as item, index}
    <div
      class="cart-list-card"
      data-slug={item.slug}
    >
      <img
        class="image"
        src={item.image}
        alt={item.title}
      />
      <div class="cart-list-card-segment">
        <div class="cart-list-card-content">
          <h3 class="heading">{item.title}</h3>
          {#if item.price}
            <div class="price">{formatPrice(item.price)}</div>
          {/if}
        </div>
        <div class="cart-list-card-actions">
          <CartQuantity bind:value={item.quantity} />
          <button
            class="button variant-outline size-sm"
            type="button"
            aria-label="trash"
            on:click={() => removeItem(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon size-md"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
  @layer fulldev {
    .cart-list {
      @apply flex flex-col text-foreground;

      .cart-list-card {
        @apply flex w-full gap-5;

        &:not(:first-child) {
          @apply mt-5 border-t pt-5;
        }
      }

      .image {
        @apply block h-auto w-24;
      }

      .cart-list-card-segment {
        @apply flex h-full w-full flex-col justify-between gap-4;
      }

      .cart-list-card-content,
      .cart-list-card-actions {
        @apply flex justify-between gap-2;
      }
    }
  }
</style>
