<script setup lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <CollapsibleTrigger as-child>
      <div
        class="max-h-40 overflow-hidden bg-gradient-to-b from-foreground via-foreground text-transparent to-transparent bg-clip-text"
      >
        <slot />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent class="-mt-40">
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
