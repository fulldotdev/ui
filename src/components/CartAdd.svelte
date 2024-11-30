<script lang="ts">
  import { updateQuantity } from 'fulldev-ui/stores/cart.svelte.ts'
  import { tick } from 'svelte'

  let { uid, quantity } = $props()
  let inputElement: HTMLInputElement | null = $state(null)

  async function onQuantityChange(e: Event) {
    const target = e.target as HTMLInputElement
    const value = Number(target.value)
    updateQuantity(uid, value)

    if (value === 11) {
      await tick()
      inputElement?.focus()
    }
  }
</script>

<label
  class="quantity input select size-md"
  for="quantity"
>
  {#if quantity > 10}
    <input
      bind:this={inputElement}
      class="input-input"
      name="quantity"
      type="number"
      value={quantity}
      min={0}
      onchange={onQuantityChange}
    />
  {:else}
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
        d="m6 9l6 6l6-6"
      ></path>
    </svg>
    <select
      class="select-select"
      value={quantity}
      onchange={onQuantityChange}
    >
      {#each Array(10) as _, i}
        <option
          value={i + 1}
          selected={quantity === i + 1}
        >
          {i + 1}
        </option>
      {/each}
      <option
        value="11"
        selected={quantity > 10}
      >
        Meer
      </option>
    </select>
  {/if}
</label>

<style lang="postcss">
  .quantity {
    @apply w-24;
  }
</style>
