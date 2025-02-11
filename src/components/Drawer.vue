<script setup lang="ts">
import { Button } from 'fulldev-ui/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from 'fulldev-ui/components/ui/drawer'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  button?: {
    text?: string
    variant?: 'default' | 'secondary' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg'
  }
  title?: string
  description?: string
}

const { button, title, description, class: className } = defineProps<Props>()
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button
        :variant="button?.variant"
        :size="button?.size"
        :class="className"
        name="drawer-trigger"
      >
        {{ button?.text }}
        <slot name="trigger" />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{{ title }}</DrawerTitle>
        <DrawerDescription>{{ description }}</DrawerDescription>
        <slot name="header" />
      </DrawerHeader>
      <slot />
      <DrawerFooter>
        <slot name="footer" />
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
