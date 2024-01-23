<script lang="ts">
  import { onMount } from 'svelte'

  let className = ''
  export { className as class }

  onMount(() => {
    const small = document.getElementById('gallery-small-carousel')
    const large = document.getElementById('gallery-large-carousel')
    const images = small?.querySelectorAll('img')

    images?.forEach((image: HTMLImageElement, index: number) => {
      image.addEventListener('click', () => {
        large?.scrollTo({
          top: large.clientHeight * index,
        })
      })
    })
  })
</script>

<div
  class="pt-80% relative flex h-0 w-full items-center justify-center {className}"
>
  <div class="absolute inset-0 grid h-full w-full auto-cols-fr grid-flow-col">
    <div
      id="gallery-small-carousel"
      class="gap-sm pr-sm [&_img]:border-hue7 hover:[&_img]:border-hue8 col-span-1 flex h-full shrink snap-y snap-mandatory flex-col overflow-y-scroll scroll-smooth [&_img]:cursor-pointer [&_img]:snap-start [&_img]:border hover:[&_img]:opacity-75"
    >
      <slot />
    </div>

    <div
      id="gallery-large-carousel"
      class="image border-hue6 bg-hue2 col-span-4 flex snap-y snap-mandatory flex-col overflow-y-auto border [&_img]:h-full [&_img]:w-full [&_img]:shrink-0 [&_img]:snap-start [&_img]:object-contain"
    >
      <slot />
    </div>
  </div>
</div>
