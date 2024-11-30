<script lang="ts">
  import { cart, getUid, openCart } from 'fulldev-ui/stores/cart.svelte'

  import { capitalize } from 'radash'
  import CartQuantity from './CartQuantity.svelte'
  import { formatPrice } from 'fulldev-ui/utils/cart'
  import type { CollectionEntry } from 'astro:content'

  interface Props {
    product: CollectionEntry<'products'>
  }

  const { product }: Props = $props()
  const { slug, data } = product

  const form = $state({
    slug: slug,
    title: data.title,
    price: data.price,
    image: data.images?.[0]?.src || `/${data.images?.[0]?.id}`,
    variants: Object.fromEntries(
      Object.entries(data.variants ?? {}).map(([key, value]) => [key, value[0]])
    ),
    quantity: 1,
  })

  function handleSubmit(event: Event) {
    event.preventDefault()

    const variants = { ...form.variants }
    const uid = getUid(slug, variants)
    const item = { ...form, uid, variants }

    const index = $cart.findIndex((i) => i.uid === item.uid)
    if (index === -1) $cart = [...$cart, item]
    else if ($cart[index]) $cart[index].quantity += form.quantity

    openCart()
  }
</script>

<form
  class="cart-form"
  onsubmit={handleSubmit}
>
  <input
    name="slug"
    type="hidden"
    bind:value={form.slug}
  />
  <input
    name="title"
    type="hidden"
    bind:value={form.title}
  />
  <input
    name="price"
    type="hidden"
    bind:value={form.price}
  />
  <input
    name="image"
    type="hidden"
    bind:value={form.image}
  />
  {#if form.variants}
    {#each Object.entries(data.variants ?? {}) as [key, options]}
      <label
        class="select size-md"
        for={`variant-${key}`}
      >
        <p class="label">
          {capitalize(key)}
        </p>
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
          name={key}
          disabled={data.soldout}
          bind:value={form.variants[key]}
        >
          {#each options as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
      </label>
    {/each}
  {/if}
  {#if data.price}
    <div class="price">
      {formatPrice(data.price)}
    </div>
  {/if}

  <div class="inputs">
    <CartQuantity bind:value={form.quantity} />
    <button
      class="variant-primary button size-md cart-add"
      type="submit"
      disabled={data.soldout}
    >
      {data.soldout ? 'Uitverkocht' : 'Toevoegen aan winkelwagen'}
    </button>
  </div>
</form>

<style lang="postcss">
  @layer fulldev {
    .cart-form {
      @apply flex flex-col gap-4;

      .inputs {
        @apply flex gap-2;
      }
    }
  }
</style>
