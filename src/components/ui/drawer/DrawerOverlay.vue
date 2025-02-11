<script lang="ts" setup>
import { cn } from 'fulldev-ui/lib/utils'
import type { DialogOverlayProps } from 'radix-vue'
import { DrawerOverlay } from 'vaul-vue'
import { computed, type HtmlHTMLAttributes } from 'vue'

const props = defineProps<DialogOverlayProps & { class?: HtmlHTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DrawerOverlay
    v-bind="delegatedProps"
    :class="cn('fixed inset-0 z-50 bg-black/80', props.class)"
  />
</template>
