import { Image } from "@tiptap/extension-image"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Prose from "@/components/elements/prose"
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node"
import { HeadingButton } from "@/components/tiptap-ui/heading-button"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { LinkPopover } from "@/components/tiptap-ui/link-popover"
import { ListButton } from "@/components/tiptap-ui/list-button"
import { MarkButton } from "@/components/tiptap-ui/mark-button"

function AutoFormProse<TFieldValues extends FieldValues>({
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
            Image,
            ImageUploadNode.configure({
              accept: "image/*",
              maxSize: MAX_FILE_SIZE,
              limit: 3,
              upload: handleImageUpload,
            }),
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
                  <div className="flex flex-col gap-4">
                    <div className="bg-background sticky top-0 z-10 mt-4 flex flex-row gap-2 border-b py-2">
                      <HeadingButton editor={editor} level={1} />
                      <HeadingButton editor={editor} level={2} />
                      <HeadingButton editor={editor} level={3} />
                      <MarkButton editor={editor} type="bold" />
                      <MarkButton editor={editor} type="italic" />
                      <MarkButton editor={editor} type="strike" />
                      <MarkButton editor={editor} type="underline" />
                      <ListButton editor={editor} type="bulletList" />
                      <ListButton editor={editor} type="orderedList" />
                      <LinkPopover editor={editor} />
                      <ImageUploadButton editor={editor} />
                    </div>
                    <Prose>
                      <EditorContent
                        className="mt-4 min-h-80 w-full *:outline-none"
                        editor={editor}
                      />
                    </Prose>
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

export default AutoFormProse
