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
      <form
        action=""
        className="w-full flex flex-col gap-6 max-w-xl"
      >
        {items?.map(
          ({ type, name, label, placeholder, description, required }, index) =>
            name && (
              <FormField
                key={index}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="w-full">
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
        <Button
          className="flex"
          type="submit"
        >
          {submit}
        </Button>
      </form>
    </FormRoot>
  )
}
