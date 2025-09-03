import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  useForm,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

// Base interface for typed AutoForm components
// This provides type safety for all AutoForm components by ensuring:
// 1. The 'name' prop must be a valid field path in the form schema
// 2. The 'control' prop is properly typed for the form
// 3. IntelliSense support for field names
// 4. Compile-time errors when field names change in the schema
interface AutoFormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  description?: string
  required?: boolean
  disabled?: boolean
}

function AutoFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder,
  required,
  disabled,
  type,
  label,
  description,
}: AutoFormBaseProps<TFieldValues, TName> &
  Pick<React.ComponentProps<typeof Input>, "placeholder" | "type">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              type={type}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  required,
  disabled,
}: AutoFormBaseProps<TFieldValues, TName> &
  Pick<React.ComponentProps<typeof Textarea>, "placeholder">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              className="resize-vertical"
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  options,
  placeholder,
  required,
  disabled,
}: AutoFormBaseProps<TFieldValues, TName> & {
  options?: (string | { label: string; value: string })[]
  placeholder?: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            required={required}
            disabled={disabled}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option) => {
                const value = typeof option === "string" ? option : option.value
                const label = typeof option === "string" ? option : option.label
                return (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  options,
  required,
  disabled,
}: AutoFormBaseProps<TFieldValues, TName> & {
  options?: (string | { label: string; value: string; description?: string })[]
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col"
              disabled={disabled}
              required={required}
              name={name}
            >
              {options?.map((option) => {
                const value = typeof option === "string" ? option : option.value
                const label = typeof option === "string" ? option : option.label
                const description =
                  typeof option === "string" ? undefined : option.description
                return (
                  <FormItem key={value} className="flex items-start gap-3">
                    <FormControl>
                      <RadioGroupItem value={value} />
                    </FormControl>
                    <FormLabel className="flex flex-col items-start gap-1 font-normal">
                      <span>{label}</span>
                      {description && (
                        <FormDescription>{description}</FormDescription>
                      )}
                    </FormLabel>
                  </FormItem>
                )
              })}
            </RadioGroup>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  required,
  disabled,
}: AutoFormBaseProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start gap-3">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              required={required}
              name={name}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormChoice<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  options = [],
  required,
  disabled,
}: AutoFormBaseProps<TFieldValues, TName> & {
  options?: (string | { label: string; value: string; description?: string })[]
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-2"
              disabled={disabled}
              required={required}
              name={name}
            >
              {options.map((option) => {
                const value = typeof option === "string" ? option : option.value
                const label = typeof option === "string" ? option : option.label
                const description =
                  typeof option === "string" ? undefined : option.description
                return (
                  <FormLabel
                    key={value}
                    htmlFor={`${name}-${value}`}
                    className="hover:bg-accent/50 has-[[aria-checked=true]]:border-ring has-[[aria-checked=true]]:bg-ring/5 flex items-start gap-3 rounded-lg border p-3"
                  >
                    <RadioGroupItem value={value} id={`${name}-${value}`} />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">
                        {label}
                      </p>
                      {description && (
                        <FormDescription>{description}</FormDescription>
                      )}
                    </div>
                  </FormLabel>
                )
              })}
            </RadioGroup>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormMultiChoice<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  options = [],
  required,
  disabled,
}: AutoFormBaseProps<TFieldValues, TName> & {
  options?: (string | { label: string; value: string; description?: string })[]
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-2">
              {options.map((option) => {
                const value = typeof option === "string" ? option : option.value
                const label = typeof option === "string" ? option : option.label
                const description =
                  typeof option === "string" ? undefined : option.description
                return (
                  <FormLabel
                    key={value}
                    htmlFor={`${name}-${value}`}
                    className="hover:bg-accent/50 has-[[aria-checked=true]]:border-ring has-[[aria-checked=true]]:bg-ring/5 flex items-start gap-3 rounded-lg border p-3"
                  >
                    <Checkbox
                      id={`${name}-${value}`}
                      checked={field.value?.includes(value)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...(field.value || []), value])
                          : field.onChange(
                              field.value?.filter(
                                (value: string) => value !== value
                              )
                            )
                      }}
                      disabled={disabled}
                      required={required}
                      name={name}
                    />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">
                        {label}
                      </p>
                      {description && (
                        <FormDescription>{description}</FormDescription>
                      )}
                    </div>
                  </FormLabel>
                )
              })}
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = (min + max) / 2,
  required,
  disabled,
}: AutoFormBaseProps<TFieldValues, TName> &
  Pick<React.ComponentProps<typeof Slider>, "min" | "max" | "step"> & {
    defaultValue?: number
  }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} ({field.value ?? defaultValue})
          </FormLabel>
          <FormControl>
            <Slider
              min={min}
              max={max}
              step={step}
              value={[field.value ?? defaultValue]}
              onValueChange={(value) => field.onChange(value[0])}
              className="w-full"
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
          <input
            className="pointer-events-none absolute opacity-0"
            type="number"
            name={name}
            required={required}
            min={min}
            max={max}
            step={step}
            value={field.value ?? defaultValue}
          />
        </FormItem>
      )}
    />
  )
}

function AutoFormDate<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  placeholder = "Pick a date",
  required,
  disabled,
}: AutoFormBaseProps<TFieldValues, TName> & {
  placeholder?: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={disabled}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                required={required}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
          <input
            className="pointer-events-none absolute opacity-0"
            type="date"
            required={required}
            name={name}
            value={field.value}
          />
        </FormItem>
      )}
    />
  )
}

interface Props extends React.ComponentProps<"form"> {
  inbox?: string
  fields?: (
    | ({
        type: "text" | "email" | "tel" | "number"
      } & Omit<React.ComponentProps<typeof AutoFormInput>, "control">)
    | ({
        type: "textarea"
      } & Omit<React.ComponentProps<typeof AutoFormTextarea>, "control">)
    | ({
        type: "select"
      } & Omit<React.ComponentProps<typeof AutoFormSelect>, "control">)
    | ({
        type: "radio"
      } & Omit<React.ComponentProps<typeof AutoFormRadio>, "control">)
    | ({
        type: "checkbox"
      } & Omit<React.ComponentProps<typeof AutoFormCheckbox>, "control">)
    | ({
        type: "choice"
      } & Omit<React.ComponentProps<typeof AutoFormChoice>, "control">)
    | ({
        type: "multichoice"
      } & Omit<React.ComponentProps<typeof AutoFormMultiChoice>, "control">)
    | ({
        type: "slider"
      } & Omit<React.ComponentProps<typeof AutoFormSlider>, "control">)
    | ({
        type: "date"
      } & Omit<React.ComponentProps<typeof AutoFormDate>, "control">)
  )[]
  submit?: string
  description?: string
}

function AutoForm({
  inbox,
  fields,
  submit,
  className,
  description,
  ...props
}: Props) {
  const form = useForm()
  return (
    <FormRoot {...form}>
      <form
        data-netlify="true"
        method="POST"
        className={cn("flex w-full max-w-2xl flex-col gap-6", className)}
        {...props}
      >
        {/* Cloudcannon fields */}
        {inbox && <input type="hidden" name="inbox_key" defaultValue={inbox} />}
        <input type="text" name="_gotcha" className="hidden" />
        {/* Always include the page path in the form data */}
        <input
          type="text"
          name="Pagina"
          className="hidden"
          defaultValue={
            typeof window !== "undefined" ? window.location.pathname : ""
          }
        />
        {/* Fields definitions */}
        {fields?.map(({ type, ...field }, i) => {
          const fieldComponents = {
            text: AutoFormInput,
            email: AutoFormInput,
            tel: AutoFormInput,
            number: AutoFormInput,
            textarea: AutoFormTextarea,
            select: AutoFormSelect,
            radio: AutoFormRadio,
            checkbox: AutoFormCheckbox,
            choice: AutoFormChoice,
            multichoice: AutoFormMultiChoice,
            slider: AutoFormSlider,
            date: AutoFormDate,
          }
          const Field = fieldComponents[type]
          return <Field key={i} control={form.control} {...field} />
        })}
        {submit && (
          <Button className="flex" type="submit">
            {submit}
          </Button>
        )}
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </form>
    </FormRoot>
  )
}

export {
  AutoFormInput,
  AutoFormTextarea,
  AutoFormSelect,
  AutoFormRadio,
  AutoFormDate,
  AutoFormSlider,
  AutoFormCheckbox,
  AutoFormChoice,
  AutoFormMultiChoice,
  AutoForm,
}
