import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"

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

function AutoFormInput({
  control,
  name,
  placeholder,
  required,
  disabled,
  type,
  label,
  description,
}: Pick<React.ComponentProps<typeof FormField>, "control" | "name"> &
  Pick<
    React.ComponentProps<typeof Input>,
    "placeholder" | "required" | "disabled" | "type"
  > & {
    label?: string
    description?: string
  }) {
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

function AutoFormTextarea({
  control,
  name,
  label,
  description,
  placeholder,
  required,
  disabled,
}: Pick<React.ComponentProps<typeof FormField>, "control" | "name"> &
  Pick<
    React.ComponentProps<typeof Textarea>,
    "placeholder" | "required" | "disabled"
  > & {
    label?: string
    description?: string
  }) {
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

function AutoFormSelect({
  control,
  name,
  label,
  description,
  options,
  placeholder,
  required,
  disabled,
}: Pick<React.ComponentProps<typeof FormField>, "control" | "name"> &
  Pick<React.ComponentProps<typeof Select>, "required" | "disabled"> & {
    label?: string
    description?: string
    options?: string[]
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
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormRadio({
  control,
  name,
  label,
  description,
  options,
  required,
  disabled,
}: Pick<React.ComponentProps<typeof FormField>, "control" | "name"> & {
  label?: string
  description?: string
  options?: string[]
  required?: boolean
  disabled?: boolean
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
              {options?.map((option) => (
                <FormItem key={option} className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={option} />
                  </FormControl>
                  <FormLabel className="font-normal">{option}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormCheckbox({
  control,
  name,
  label,
  description,
  required,
  disabled,
}: Pick<React.ComponentProps<typeof FormField>, "control" | "name"> & {
  label?: string
  description?: string
  required?: boolean
  disabled?: boolean
}) {
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

function AutoFormChoice({
  control,
  name,
  label,
  description,
  options = [],
  required,
  disabled,
}: Pick<React.ComponentProps<typeof FormField>, "control" | "name"> & {
  label?: string
  description?: string
  options?: string[]
  required?: boolean
  disabled?: boolean
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
              className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2"
              disabled={disabled}
              required={required}
              name={name}
            >
              {options.map((option) => (
                <FormLabel
                  key={option}
                  htmlFor={`${name}-${option}`}
                  className="hover:bg-accent/50 has-[[aria-checked=true]]:border-ring has-[[aria-checked=true]]:bg-ring/5 flex items-start gap-3 rounded-lg border p-3"
                >
                  <RadioGroupItem value={option} id={`${name}-${option}`} />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">{option}</p>
                  </div>
                </FormLabel>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormMultiChoice({
  control,
  name,
  label,
  description,
  options = [],
  required,
  disabled,
}: Pick<React.ComponentProps<typeof FormField>, "control" | "name"> & {
  label?: string
  description?: string
  options?: string[]
  required?: boolean
  disabled?: boolean
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
              {options.map((option) => (
                <FormLabel
                  key={option}
                  htmlFor={`${name}-${option}`}
                  className="hover:bg-accent/50 has-[[aria-checked=true]]:border-ring has-[[aria-checked=true]]:bg-ring/5 flex items-start gap-3 rounded-lg border p-3"
                >
                  <Checkbox
                    id={`${name}-${option}`}
                    checked={field.value?.includes(option)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...(field.value || []), option])
                        : field.onChange(
                            field.value?.filter(
                              (value: string) => value !== option
                            )
                          )
                    }}
                    disabled={disabled}
                    required={required}
                    name={name}
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">{option}</p>
                  </div>
                </FormLabel>
              ))}
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AutoFormSlider({
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
}: Pick<React.ComponentProps<typeof FormField>, "control" | "name"> &
  Pick<React.ComponentProps<typeof Slider>, "min" | "max" | "step"> & {
    label?: string
    description?: string
    defaultValue?: number
    required?: boolean
    disabled?: boolean
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

function AutoFormDate({
  control,
  name,
  label,
  description,
  placeholder = "Pick a date",
  required,
  disabled,
}: Pick<React.ComponentProps<typeof FormField>, "control" | "name"> & {
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
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
      } & React.ComponentProps<typeof AutoFormInput>)
    | ({
        type: "textarea"
      } & React.ComponentProps<typeof AutoFormTextarea>)
    | ({
        type: "select"
      } & React.ComponentProps<typeof AutoFormSelect>)
    | ({
        type: "radio"
      } & React.ComponentProps<typeof AutoFormRadio>)
    | ({
        type: "checkbox"
      } & React.ComponentProps<typeof AutoFormCheckbox>)
    | ({
        type: "choice"
      } & React.ComponentProps<typeof AutoFormChoice>)
    | ({
        type: "multichoice"
      } & React.ComponentProps<typeof AutoFormMultiChoice>)
    | ({
        type: "slider"
      } & React.ComponentProps<typeof AutoFormSlider>)
    | ({
        type: "date"
      } & React.ComponentProps<typeof AutoFormDate>)
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
        <Button className="flex" type="submit">
          {submit}
        </Button>
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
