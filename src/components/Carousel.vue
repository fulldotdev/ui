<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { parse } from 'node-html-parser'
import { renderToString } from 'vue/server-renderer'

interface Props {
  itemClass?: string
}

const { itemClass } = defineProps<Props>()

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
  <Carousel v-slot="{ canScrollNext }">
    <CarouselContent>
      <CarouselItem
        v-for="(htmlItem, index) in htmlItems"
        :key="index"
        :class="itemClass"
      >
        <div v-html="htmlItem" />
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext v-if="canScrollNext" />
  </Carousel>
</template>
