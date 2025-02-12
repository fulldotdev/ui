<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { HTMLAttributes } from 'vue'
import type { SelectRootEmits, SelectRootProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'

interface Props extends SelectRootProps {
  class?: HTMLAttributes['class']
  options?: {
    label: string
    value: string
  }[]
  placeholder?: string
}

const { options, placeholder, class: className, ...props } = defineProps<Props>()

const emits = defineEmits<SelectRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Select
    :id="name"
    v-bind="forwarded"
  >
    <SelectTrigger " :class="className">
      <SelectValue :placeholder="placeholder || options?.[0]?.label" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="option in options"
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
