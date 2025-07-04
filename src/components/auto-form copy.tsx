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
  inbox?: string
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

function AutoForm({ inbox, fields, submit, className, ...props }: Props) {
  const form = useForm()

  return fields ? (
    <FormRoot {...form}>
      <form
        data-netlify="true"
        method="POST"
        className={cn("flex w-full max-w-2xl flex-col gap-6", className)}
        {...props}
      >
        {inbox && <input type="hidden" name="inbox_key" value={inbox} />}
        <input type="text" name="_gotcha" style={{ display: "none" }} />
        <input
          type="text"
          name="page"
          value={typeof window !== "undefined" ? window.location.pathname : ""}
          style={{ display: "none" }}
        />
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
                            <>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "LLL dd, yyyy")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
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
                                      const day = date.getDay()
                                      const today = new Date()
                                      today.setHours(0, 0, 0, 0)

                                      const formatDate = (d: Date) =>
                                        d.toISOString().split("T")[0]

                                      return Boolean(
                                        (disabled?.mon && day === 1) ||
                                          (disabled?.tue && day === 2) ||
                                          (disabled?.wed && day === 3) ||
                                          (disabled?.thu && day === 4) ||
                                          (disabled?.fri && day === 5) ||
                                          (disabled?.sat && day === 6) ||
                                          (disabled?.sun && day === 0) ||
                                          (disabled?.future && date > today) ||
                                          (disabled?.past && date < today) ||
                                          (disabled?.today &&
                                            date.getTime() ===
                                              today.getTime()) ||
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
                              {field.value && (
                                <input
                                  type="hidden"
                                  name={name || label || ""}
                                  value={
                                    field.value.toISOString().split("T")[0]
                                  }
                                />
                              )}
                            </>
                          )
                        } else if (type === "select") {
                          return (
                            <>
                              <Select onValueChange={field.onChange}>
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
                              {field.value && (
                                <input
                                  type="hidden"
                                  name={name || label || ""}
                                  value={field.value}
                                />
                              )}
                            </>
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

export { AutoForm }
