<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from 'fulldev-ui/components/ui/form'
import { Input } from 'fulldev-ui/components/ui/input'
import AutoFormLabel from './AutoFormLabel.vue'
import type { FieldProps } from './interface'
import { beautifyObjectName } from './utils'

defineOptions({
  inheritAttrs: false,
})

defineProps<FieldProps>()
</script>

<template>
  <FormField
    v-slot="slotProps"
    :name="fieldName"
  >
    <FormItem>
      <AutoFormLabel
        v-if="!config?.hideLabel"
        :required="required"
      >
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Input
            type="number"
            v-bind="{ ...slotProps.componentField, ...config?.inputProps }"
            :disabled="config?.inputProps?.disabled ?? disabled"
          />
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
