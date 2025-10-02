import type { Control, FieldPath, FieldValues } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function AutoSelect<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  disabled,
  label,
  description,
  options,
}: {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  placeholder?: string
  disabled?: boolean
  label?: string
  description?: string
  options: (string | { value: string; label: string })[]
}) {
  const optionsArray = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  )
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {optionsArray.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default AutoSelect
