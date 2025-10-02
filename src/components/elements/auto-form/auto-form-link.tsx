import type { Control, FieldPath, FieldValues } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function AutoFormLink<TFieldValues extends FieldValues>({
  control,
  name,
  disabled,
  label,
  description,
  className,
}: {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  disabled?: boolean
  label?: string
  description?: string
  className?: string
}) {
  const textName = `${name}.text` as FieldPath<TFieldValues>
  const hrefName = `${name}.href` as FieldPath<TFieldValues>

  return (
    <div className="space-y-2">
      {label && <FormLabel>{label}</FormLabel>}
      <div className="flex gap-2">
        <FormField
          control={control}
          name={textName}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Link text"
                  disabled={disabled}
                  className={className}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={hrefName}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="/link-href/"
                  disabled={disabled}
                  className={className}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {description && <FormDescription>{description}</FormDescription>}
    </div>
  )
}

export default AutoFormLink
