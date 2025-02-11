<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'fulldev-ui/components/ui/accordion'

interface Props {
  items?: {
    title?: string
    description?: string
  }[]
}

const { items } = defineProps<Props>()
</script>

<template v-if="items">
  <Accordion
    type="single"
    class="w-full"
    collapsible
  >
    <AccordionItem
      v-for="item in items"
      :key="item.title"
      :value="item.title ?? ''"
    >
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        {{ item.description }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
