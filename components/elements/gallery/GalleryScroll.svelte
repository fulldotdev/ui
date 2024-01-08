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

<div class="relative grid w-full grid-flow-row auto-rows-fr">
  <div
    id="gallery-large-carousel"
    class="border-hue6 bg-hue2 [&_img]:(h-auto object-contain) flex h-auto snap-y snap-mandatory overflow-x-auto border [&_img]:w-full"
  >
    <slot />
  </div>
  <div
    id="gallery-small-carousel"
    class="gap-sm pt-sm [&_img]:border-hue7 hover:[&_img]:border-hue8 [&_img]:(h-full w-auto) flex h-40 shrink snap-x snap-mandatory flex-row overflow-x-auto scroll-smooth object-contain [&_img]:cursor-pointer [&_img]:snap-start [&_img]:border hover:[&_img]:opacity-75"
  >
    <slot />
  </div>
</div>
