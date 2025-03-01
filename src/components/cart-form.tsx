import { Price } from '@/components/price'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cartLineAdd } from '@/stores/cart'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  options?: {
    name: string
    values: string[]
  }[]
  variants?: {
    selectedOptions: {
      name: string
      value: string
    }[]
  }[]
}

function CartForm({ options, variants }: Props) {
  const form = useForm({
    defaultValues: options?.reduce(
      (acc, { name, values }) => ({ ...acc, [name]: values?.[0] || '' }),
      {} as Record<string, string>
    ),
  })

  const formValues = form.watch()
  const [loading, setLoading] = useState(false)
  const [variant, setVariant] = useState<any>(variants?.[0])

  useEffect(() => {
    setVariant(
      variants?.find((variant) =>
        variant.selectedOptions?.every((option) => formValues[option?.name ?? ''] === option?.value)
      )
    )
  }, [formValues])

  const handleSubmit = async (data: any) => {
    setLoading(true)
    await cartLineAdd(variant.id, 1)
    setLoading(false)
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
              <FormItem className={values.length === 1 ? 'hidden' : ''}>
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
          {...variant?.price}
        />
        <Button size="lg">{loading ? <Loader2 className="animate-spin" /> : 'In winkelwagen'}</Button>
      </form>
    </Form>
  )
}

export { CartForm }
