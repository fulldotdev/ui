import { EditorContent, EditorContext, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Writeup from "@/components/elements/writeup"
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node"
import { HeadingButton } from "@/components/tiptap-ui/heading-button"
import { LinkPopover } from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"

function AutoFormWriteup<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  disabled,
  label,
  description,
}: {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  placeholder?: string
  disabled?: boolean
  label?: string
  description?: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const editor = useEditor({
          immediatelyRender: false,
          extensions: [
            StarterKit.configure({
              link: {
                openOnClick: false,
              },
            }),
            ImageUploadNode,
          ],
          content: field.value || "",
          onUpdate: ({ editor }) => {
            field.onChange(editor.getHTML())
          },
        })

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div>
                <EditorContext.Provider value={{ editor }}>
                  <div className="border-input w-full overflow-hidden rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
                    <div className="bg-background sticky top-0 z-10 flex flex-row gap-2 border-b px-2 py-2">
                      <HeadingButton editor={editor} level={1} />
                      <HeadingButton editor={editor} level={2} />
                      <HeadingButton editor={editor} level={3} />
                      <MarkButton editor={editor} type="bold" />
                      <MarkButton editor={editor} type="italic" />
                      <MarkButton editor={editor} type="strike" />
                      <MarkButton editor={editor} type="underline" />
                      <LinkPopover editor={editor} />
                    </div>
                    <Writeup className="px-3 py-1">
                      <EditorContent
                        className="mt-4 min-h-80 w-full *:outline-none"
                        editor={editor}
                      />
                    </Writeup>
                  </div>
                </EditorContext.Provider>
                <Input
                  className="hidden"
                  placeholder={placeholder}
                  disabled={disabled}
                  type="text"
                  {...field}
                />
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default AutoFormWriteup
