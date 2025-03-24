import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormRoot,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  submit?: string
  fields?: {
    type?:
      | "text"
      | "email"
      | "tel"
      | "number"
      | "checkbox"
      | "select"
      | "textarea"
    name?: string
    label?: string
    placeholder?: string
    description?: string
    required?: boolean
    options?: string[]
  }[]
}

function Form({ fields, submit, className, ...props }: Props) {
  const form = useForm()

  return fields ? (
    <FormRoot {...form}>
      <form
        className={cn("flex w-full max-w-2xl flex-col gap-6", className)}
        {...props}
      >
        {fields?.map(
          ({ type, name, label, placeholder, description, required }, index) =>
            (name || label) && (
              <FormField
                key={index}
                control={form.control}
                name={name || label || ""}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {(() => {
                        if (type === "textarea") {
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
        <Button className="flex" type="submit">
          {submit}
        </Button>
      </form>
    </FormRoot>
  ) : null
}

export { Form }
