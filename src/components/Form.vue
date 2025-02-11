<script setup lang="ts">
import { AutoForm } from 'fulldev-ui/components/ui/auto-form'
import { Button } from 'fulldev-ui/components/ui/button'
import type { FormHTMLAttributes } from 'vue'
import { z } from 'zod'

interface Props extends /* @vue-ignore */ FormHTMLAttributes {
  fields?: {
    label: string
    type: 'text' | 'email' | 'checkbox' | 'select'
    optional?: boolean
    options?: string[]
  }[]
  submit?: string
}

const { fields, action, method } = defineProps<Props>()

// Conditionally add the optional flag to the zod schema
const withOptional = (optional: boolean | undefined, schema: z.ZodSchema) => (optional ? schema.optional() : schema)

// Get the correct zod schema for the field
const getFieldSchema = ({ type, optional, options }: any) => {
  switch (type) {
    case 'text':
      return withOptional(optional, z.string())
    case 'email':
      return withOptional(optional, z.string().email())
    case 'checkbox':
      return withOptional(optional, z.boolean())
    case 'select':
      return withOptional(optional, z.enum(options))
    case 'date':
      return withOptional(optional, z.coerce.date())
    case 'textarea':
      return withOptional(optional, z.string())
    default:
      return withOptional(optional, z.string())
  }
}

// Get the correct config object the field
const getFieldConfig = ({ type }: any) => {
  switch (type) {
    case 'textarea':
      return {
        component: 'textarea',
      }
    default:
      return {}
  }
}

// Loop over fields array and create on object using getFieldSchema for each field
const schema = z.object(
  (fields || []).reduce((acc: any, field) => {
    acc[field.label] = getFieldSchema(field)
    return acc
  }, {})
)

// Loop over fields array and create on object using getFieldSchema for each field
const config = (fields || []).reduce((acc: any, field) => {
  acc[field.label] = getFieldConfig(field)
  return acc
}, {})
</script>

<template>
  <AutoForm
    class="w-full space-y-6 [&>div>p[role='alert']]:hidden"
    :field-config="config"
    :schema="schema"
    :action
    :method
  >
    <slot />
    <Button type="submit">
      {{ submit }}
    </Button>
  </AutoForm>
</template>
