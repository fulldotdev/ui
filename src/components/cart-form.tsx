import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Price from './Price.tsx'

export function CartForm({ options, variants }: any) {
  const form = useForm({
    defaultValues: options?.reduce(
      (acc, { name, values }) => ({ ...acc, [name]: values?.[0] || '' }),
      {} as Record<string, string>
    ),
  })

  const formValues = form.watch()

  const [foundVariant, setFoundVariant] = useState<any>(variants?.[0])

  useEffect(() => {
    const foundVariant = variants?.find((variant) =>
      variant.selectedOptions?.every((option) => formValues[option.name] === option.value)
    )
    setFoundVariant(foundVariant)
  }, [formValues])

  const handleSubmit = (data: any) => {
    console.log({ data, foundVariant })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {options?.map(({ name, values }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{name}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={values?.[0]}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {values?.map((value) => (
                        <SelectItem
                          key={value}
                          value={value}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Price
          className="text-xl"
          {...foundVariant?.price}
        />
        <Button size="lg">In winkelwagen</Button>
      </form>
    </Form>
  )
}
