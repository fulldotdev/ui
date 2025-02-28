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
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'

interface Props {
  class?: string
  action?: string
  method?: string
  submit?: string
  fields?: {
    type?: 'text' | 'number' | 'email' | 'checkbox' | 'select' | 'textarea'
    name?: string
    label?: string
    placeholder?: string
    description?: string
    required?: boolean
    options?: string[]
  }[]
}

function Form({ action, method, fields, submit, class: className }: Props) {
  const form = useForm()

  return (
    <FormRoot {...form}>
      <form
        action={action}
        method={method}
        className={cn('w-full flex flex-col gap-6 max-w-xl', className)}
      >
        {fields?.map(
          ({ type, name, label, placeholder, description, required }, index) =>
            (name || label) && (
              <FormField
                key={index}
                control={form.control}
                name={name || label || ''}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {(() => {
                        if (type === 'textarea') {
                          return (
                            <Textarea
                              required={required}
                              placeholder={placeholder || undefined}
                              {...field}
                            />
                          )
                        } else {
                          return (
                            <Input
                              type={type}
                              required={required}
                              placeholder={placeholder || undefined}
                              {...field}
                            />
                          )
                        }
                      })()}
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

export default Form
