import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  submit?: string
  fields?: {
    name?: string
    label?: string
    placeholder?: string
    description?: string
    required?: boolean
    options?: string[]
    redirect?: string
    type?:
      | "text"
      | "email"
      | "tel"
      | "number"
      | "date"
      | "checkbox"
      | "select"
      | "textarea"
      | "address"
    disabled?: {
      mon?: boolean
      tue?: boolean
      wed?: boolean
      thu?: boolean
      fri?: boolean
      sat?: boolean
      sun?: boolean
      future?: boolean
      past?: boolean
      today?: boolean
      dates?: string[]
    }
  }[]
}

function Form({ fields, submit, className, ...props }: Props) {
  const form = useForm()

  return fields ? (
    <FormRoot {...form}>
      <form
        className={cn("flex w-full max-w-2xl flex-col gap-6", className)}
        method="POST"
        {...props}
      >
        {fields?.map(
          ({
            type,
            name,
            label,
            placeholder,
            description,
            required,
            options,
            disabled,
          }) =>
            (name || label) && (
              <FormField
                key={name}
                control={form.control}
                name={name || label || ""}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {(() => {
                        if (type === "date") {
                          return (
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Input
                                    name={name || label}
                                    className="text-left"
                                    placeholder={placeholder}
                                    value={
                                      field.value
                                        ? format(field.value, "dd-MM-yyyy")
                                        : ""
                                    }
                                  />
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    // Check all conditions and return true if any of them match
                                    const day = date.getDay()
                                    const today = new Date()
                                    today.setHours(0, 0, 0, 0)

                                    const formatDate = (d: Date) =>
                                      d.toISOString().split("T")[0]

                                    return Boolean(
                                      // Day of week checks
                                      (disabled?.mon && day === 1) ||
                                        (disabled?.tue && day === 2) ||
                                        (disabled?.wed && day === 3) ||
                                        (disabled?.thu && day === 4) ||
                                        (disabled?.fri && day === 5) ||
                                        (disabled?.sat && day === 6) ||
                                        (disabled?.sun && day === 0) ||
                                        // Date checks
                                        (disabled?.future && date > today) ||
                                        (disabled?.past && date < today) ||
                                        (disabled?.today &&
                                          date.getTime() === today.getTime()) ||
                                        // Specific dates check
                                        (disabled?.dates &&
                                          disabled.dates.includes(
                                            formatDate(date)
                                          ))
                                    )
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          )
                        } else if (type === "select") {
                          return (
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {options?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )
                        } else if (type === "textarea") {
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
