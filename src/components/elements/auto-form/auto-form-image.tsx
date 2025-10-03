import { Upload, UploadIcon } from "lucide-react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { useWatch } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

function AutoFormImage<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder = "Describe your image...",
  label,
  description,
  upload,
}: {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  placeholder?: string
  label?: string
  description?: string
  className?: string
  upload?: (file: File) => Promise<string>
}) {
  const srcName = `${name}.src` as FieldPath<TFieldValues>
  const altName = `${name}.alt` as FieldPath<TFieldValues>

  const srcValue = useWatch({ control, name: srcName })
  const altValue = useWatch({ control, name: altName })

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (upload) {
      try {
        const result = await upload(file)
        console.log("File uploaded successfully:", result)
        onChange(result)
      } catch (error) {
        console.error("Error uploading file:", error)
        onChange(file.name)
      }
    } else {
      onChange(file.name)
    }
  }

  return (
    <div className="space-y-2">
      {label && <FormLabel>{label}</FormLabel>}
      <div className="flex gap-2">
        <FormField
          control={control}
          name={srcName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <button className="group/image relative size-[75px]">
                  <input
                    disabled={true}
                    className="absolute inset-0 opacity-0"
                    {...field}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0"
                    onChange={(e) => handleChange(e, field.onChange)}
                  />
                  <UploadIcon className="text-primary pointer-events-none absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/image:opacity-100" />
                  <img
                    src={srcValue}
                    alt={altValue}
                    className="pointer-events-none size-full cursor-pointer rounded-md border object-cover transition group-hover/image:opacity-25"
                  />
                </button>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={altName}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {description && <FormDescription>{description}</FormDescription>}
    </div>
  )
}

export default AutoFormImage
