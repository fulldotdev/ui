<script setup lang="ts">
import { PopoverRoot, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover/index.ts'
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger as-child>
      <div>
        <slot name="trigger" />
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <slot name="content" />
    </PopoverContent>
  </PopoverRoot>
</template>
