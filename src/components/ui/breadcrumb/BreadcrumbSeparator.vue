<script lang="ts" setup>
import { cn } from 'fulldev-ui/lib/utils'
import { ChevronRight } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:w-3.5 [&>svg]:h-3.5', props.class)"
  >
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>
