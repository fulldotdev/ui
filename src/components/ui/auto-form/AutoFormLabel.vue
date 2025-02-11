<script setup lang="ts">
import { FormLabel } from 'fulldev-ui/components/ui/form'

defineProps<{
  required?: boolean
}>()
</script>

<template>
  <FormLabel>
    <slot />
    <span
      v-if="required"
      class="text-destructive"
    >
      *</span
    >
  </FormLabel>
</template>
