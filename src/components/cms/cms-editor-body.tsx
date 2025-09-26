import { useState } from "react"
import Bold from "@tiptap/extension-bold"
import Document from "@tiptap/extension-document"
import Heading from "@tiptap/extension-heading"
import Italic from "@tiptap/extension-italic"
import Paragraph from "@tiptap/extension-paragraph"
import Strike from "@tiptap/extension-strike"
import Text from "@tiptap/extension-text"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Prose from "@/components/elements/prose"

export default (input: React.ComponentProps<"input">) => {
  console.log({ input })
  const [editorState, setEditorState] = useState(0)

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph,
      Bold,
      Italic,
      Strike,
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    immediatelyRender: false,
    content: (input.defaultValue as string) || "",
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML())
      setEditorState((prev) => prev + 1)
    },
    onSelectionUpdate: () => {
      setEditorState((prev) => prev + 1)
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        <ToggleGroup variant="outline" type="single">
          <ToggleGroupItem
            value="p"
            onClick={() => editor.chain().focus().setParagraph().run()}
            data-state={editor.isActive("paragraph") ? "on" : "off"}
          >
            p
          </ToggleGroupItem>
          <ToggleGroupItem
            value="h1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            data-state={editor.isActive("heading", { level: 1 }) ? "on" : "off"}
          >
            h1
          </ToggleGroupItem>
          <ToggleGroupItem
            value="h2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            data-state={editor.isActive("heading", { level: 2 }) ? "on" : "off"}
          >
            h2
          </ToggleGroupItem>
          <ToggleGroupItem
            value="h3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            data-state={editor.isActive("heading", { level: 3 }) ? "on" : "off"}
          >
            h3
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup variant="outline" type="multiple">
          <ToggleGroupItem
            value="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-state={editor.isActive("bold") ? "on" : "off"}
          >
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-state={editor.isActive("italic") ? "on" : "off"}
          >
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-state={editor.isActive("strike") ? "on" : "off"}
          >
            <StrikethroughIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            data-state={editor.isActive("underline") ? "on" : "off"}
          >
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Prose>
        <EditorContent
          className="mt-4 min-h-80 w-full *:outline-none"
          editor={editor}
        />
      </Prose>
      <Input type="text" value={editor.getHTML()} />
    </div>
  )
}
