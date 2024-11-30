<script lang="ts">
  import { tick } from 'svelte'

  interface Props {
    value: number
    size?: 'sm' | 'md' | 'lg'
    change?: (quantity: number) => void
  }

  let { value = $bindable(), size = 'md', change }: Props = $props()
  let inputElement: HTMLInputElement | null = $state(null)

  let quantity = $state(value)

  async function handleChange() {
    value = quantity
    if (change) change(value)
    if (value === 11) {
      await tick()
      inputElement?.focus()
    }
  }
</script>

<label
  class="quantity input select size-{size}"
  for="quantity"
>
  {#if value > 10}
    <input
      bind:this={inputElement}
      bind:value={quantity}
      class="input-input"
      name="quantity"
      type="number"
      min={1}
      onchange={handleChange}
    />
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="icon size-{size}"
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
      bind:value={quantity}
      onchange={handleChange}
    >
      {#each Array(10) as _, i}
        <option
          value={i + 1}
          selected={value === i + 1}
        >
          {i + 1}
        </option>
      {/each}
      <option
        value={11}
        selected={value > 10}
      >
        Meer
      </option>
    </select>
  {/if}
</label>

<style lang="postcss">
  .quantity {
    @apply w-20;
  }
</style>
