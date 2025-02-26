import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormRoot,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

interface Props {
  submit?: string
  items?:
    | {
        type?: 'text' | 'number' | 'email' | 'checkbox' | 'select' | 'textarea'
        name?: string | null
        label?: string | null
        placeholder?: string | null
        description?: string | null
        required?: boolean
        options?: string[]
      }[]
    | null
}

export function Form({ items, submit }: Props) {
  const form = useForm()

  return (
    <FormRoot {...form}>
      {items?.map(
        ({ type, name, label, placeholder, description, required }) =>
          name && (
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    {(type === 'text' || type === 'number' || type === 'email') && (
                      <Input
                        type={type}
                        required={required}
                        placeholder={placeholder || undefined}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormDescription>{description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
      )}
      <Button type="submit">{submit}</Button>
    </FormRoot>
  )
}
