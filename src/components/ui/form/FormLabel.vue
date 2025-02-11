<script lang="ts" setup>
import { Label } from 'fulldev-ui/components/ui/label'
import { cn } from 'fulldev-ui/lib/utils'
import type { LabelProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
</script>

<template>
  <Label
    :class="cn(error && 'text-destructive', props.class)"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
