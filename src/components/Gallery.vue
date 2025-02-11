<script setup lang="ts">
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { watchOnce } from '@vueuse/core'
import { parse } from 'node-html-parser'
import { ref } from 'vue'
import { renderToString } from 'vue/server-renderer'

const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})

const slots = defineSlots<{
  default(): any
}>()

const slot = slots['default']()[0]
const html = await renderToString(slot)
const root = parse(html)
const container = root.querySelector('astro-static-slot') || root.querySelector('astro-slot') || root
const children = container.children
const htmlItems = children.map((child) => child.outerHTML)
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <Carousel
      class="relative"
      @init-api="(val) => (emblaMainApi = val)"
    >
      <CarouselContent>
        <CarouselItem
          v-for="(htmlItem, index) in htmlItems"
          :key="index"
          class="rounded-md overflow-hidden"
        >
          <div v-html="htmlItem" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="left-2" />
      <CarouselNext class="right-2" />
    </Carousel>
    <Carousel
      class="relative w-full"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <CarouselContent class="flex gap-2 ml-0">
        <CarouselItem
          v-for="(htmlItem, index) in htmlItems"
          :key="index"
          class="pl-0 basis-1/5 cursor-pointer border rounded-md"
          :class="index === selectedIndex ? 'border-ring' : ''"
          @click="onThumbClick(index)"
        >
          <div v-html="htmlItem" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
