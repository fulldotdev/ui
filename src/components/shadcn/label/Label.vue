<script setup lang="ts">
import { cn } from 'fulldev-ui/lib/utils'
import { Label, type LabelProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { labelVariants } from '.'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="cn(labelVariants(), props.class)"
  >
    <slot />
  </Label>
</template>
