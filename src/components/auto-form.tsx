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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  )[]
  submit?: string
  description?: string
}

const fieldComponents = {
  text: AutoFormInput,
  email: AutoFormInput,
  tel: AutoFormInput,
  number: AutoFormInput,
  textarea: AutoFormTextarea,
  select: AutoFormSelect,
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
  console.log(inbox)
  return (
    <FormRoot {...form}>
      <form
        data-netlify="true"
        method="POST"
        className={cn("flex w-full max-w-2xl flex-col gap-6", className)}
        {...props}
      >
        {/* Cloudcannon fields */}
        {inbox && <input type="hidden" name="inbox_key" value={inbox} />}
        <input type="text" name="_gotcha" style={{ display: "none" }} />
        {/* Always include the page path in the form data */}
        <input
          type="text"
          name="Pagina"
          value={typeof window !== "undefined" ? window.location.pathname : ""}
          style={{ display: "none" }}
        />
        {/* Fields definitions */}
        {fields?.map(({ type, ...field }) => {
          const Field = fieldComponents[type]
          return <Field control={form.control} {...field} />
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

export { AutoFormInput, AutoFormTextarea, AutoFormSelect, AutoForm }
