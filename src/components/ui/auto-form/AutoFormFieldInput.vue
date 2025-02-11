<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from 'fulldev-ui/components/ui/form'
import { Input } from 'fulldev-ui/components/ui/input'
import { Textarea } from 'fulldev-ui/components/ui/textarea'
import { computed } from 'vue'
import AutoFormLabel from './AutoFormLabel.vue'
import type { FieldProps } from './interface'
import { beautifyObjectName } from './utils'

const props = defineProps<FieldProps>()
const inputComponent = computed(() => (props.config?.component === 'textarea' ? Textarea : Input))
</script>

<template>
  <FormField
    v-slot="slotProps"
    :name="fieldName"
  >
    <FormItem v-bind="$attrs">
      <AutoFormLabel
        v-if="!config?.hideLabel"
        :required="required"
      >
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <component
            :is="inputComponent"
            type="text"
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
