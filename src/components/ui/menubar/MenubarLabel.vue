<script setup lang="ts">
import { cn } from 'fulldev-ui/lib/utils'
import { MenubarLabel, type MenubarLabelProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

const props = defineProps<MenubarLabelProps & { class?: HTMLAttributes['class']; inset?: boolean }>()
</script>

<template>
  <MenubarLabel :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', props.class)">
    <slot />
  </MenubarLabel>
</template>
