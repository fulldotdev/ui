import { Upload } from "lucide-react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function AutoFormImage<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  disabled,
  label,
  description,
  upload,
  className,
}: {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  placeholder?: string
  disabled?: boolean
  label?: string
  description?: string
  className?: string
  upload?: (file: File) => Promise<string>
}) {
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
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="flex gap-2">
              <Input
                placeholder={placeholder}
                disabled={disabled}
                type="text"
                className={className}
                {...field}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="relative"
                  >
                    <Upload />
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0"
                      onChange={(e) => handleChange(e, field.onChange)}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upload a new image</TooltipContent>
              </Tooltip>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default AutoFormImage
