<script setup lang="ts">
import Select from 'fulldev-ui/components/Select.vue'
import type { SelectRootProps } from 'radix-vue'

interface Props extends SelectRootProps {
  options: {
    label: string
    value: string
  }[]
}

const { options } = defineProps<Props>()

const handleChange = (value: string) => {
  const container = document.querySelector('[data-sort]')
  if (!container) throw new Error('Container not found')

  const childElements = container.querySelectorAll(`[data-sort-${value}]`)
  const childrenArray = Array.from(childElements)

  const sortedChildrenArray = childrenArray.sort((a, b) => {
    const aValue = a.getAttribute(`data-sort-${value}`)
    const bValue = b.getAttribute(`data-sort-${value}`)
    if (!aValue || !bValue) return 0

    const aNum = parseFloat(aValue)
    const bNum = parseFloat(bValue)

    //
    if (isNaN(aNum) || isNaN(bNum)) throw new Error('Sort value is not a number')

    return aNum - bNum
  })

  // Append the sorted children to the container
  sortedChildrenArray.forEach((child) => container.appendChild(child))
}
</script>

<template>
  <Select
    class="w-auto"
    :options="options"
    @update:modelValue="handleChange"
  />
</template>
