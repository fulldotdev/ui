"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import Bold from "@tiptap/extension-bold"
import Document from "@tiptap/extension-document"
import Heading from "@tiptap/extension-heading"
import Italic from "@tiptap/extension-italic"
import Paragraph from "@tiptap/extension-paragraph"
import Strike from "@tiptap/extension-strike"
import Text from "@tiptap/extension-text"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import type { CollectionEntry } from "astro:content"
import { z } from "astro:schema"
import {
  BoldIcon,
  ChevronDown,
  ItalicIcon,
  PencilIcon,
  Section,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import CmsEditorBody from "@/components/cms/cms-editor-body"
import Prose from "@/components/elements/prose"

const FormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  body: z.string().optional(),
})

export default function CmsPage(entry: CollectionEntry<"pages">) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: entry.data.title || "",
      description: entry.data.description || "",
      body: entry.rendered?.html || "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form data:", data)
  }

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
    content: entry.rendered?.html || "",
    onUpdate: ({ editor }) => {
      form.setValue("body", editor.getHTML())
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[95vh] w-full !max-w-screen-md flex-col justify-start overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit this page</DialogTitle>
          <DialogDescription>
            Make sure to click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <img
                  className="bg-muted rounded-md"
                  src={entry.data.image?.src}
                  alt={entry.data.image?.alt}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-4 mb-2">Body</FormLabel>
                      <FormControl>
                        <div className="flex w-full flex-col gap-2">
                          <div className="flex gap-2">
                            <ToggleGroup variant="outline" type="single">
                              <ToggleGroupItem
                                value="p"
                                onClick={() =>
                                  editor.chain().focus().setParagraph().run()
                                }
                                data-state={
                                  editor.isActive("paragraph") ? "on" : "off"
                                }
                              >
                                p
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="h1"
                                onClick={() =>
                                  editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run()
                                }
                                data-state={
                                  editor.isActive("heading", { level: 1 })
                                    ? "on"
                                    : "off"
                                }
                              >
                                h1
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="h2"
                                onClick={() =>
                                  editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 2 })
                                    .run()
                                }
                                data-state={
                                  editor.isActive("heading", { level: 2 })
                                    ? "on"
                                    : "off"
                                }
                              >
                                h2
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="h3"
                                onClick={() =>
                                  editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run()
                                }
                                data-state={
                                  editor.isActive("heading", { level: 3 })
                                    ? "on"
                                    : "off"
                                }
                              >
                                h3
                              </ToggleGroupItem>
                            </ToggleGroup>
                            <ToggleGroup variant="outline" type="multiple">
                              <ToggleGroupItem
                                value="bold"
                                onClick={() =>
                                  editor.chain().focus().toggleBold().run()
                                }
                                data-state={
                                  editor.isActive("bold") ? "on" : "off"
                                }
                              >
                                <BoldIcon />
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="italic"
                                onClick={() =>
                                  editor.chain().focus().toggleItalic().run()
                                }
                                data-state={
                                  editor.isActive("italic") ? "on" : "off"
                                }
                              >
                                <ItalicIcon />
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="strikethrough"
                                onClick={() =>
                                  editor.chain().focus().toggleStrike().run()
                                }
                                data-state={
                                  editor.isActive("strike") ? "on" : "off"
                                }
                              >
                                <StrikethroughIcon />
                              </ToggleGroupItem>
                              <ToggleGroupItem
                                value="underline"
                                onClick={() =>
                                  editor.chain().focus().toggleUnderline().run()
                                }
                                data-state={
                                  editor.isActive("underline") ? "on" : "off"
                                }
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
                          <Input type="text" className="hidden" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="sections" className="space-y-4">
                <p className="text-muted-foreground py-4 text-center text-base">
                  Coming soon...
                </p>
                {entry.data.sections?.map((section, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-auto w-full justify-between p-4"
                      >
                        <div className="flex items-center gap-2">
                          <Section className="h-4 w-4" />
                          <span>
                            {section.data.type || `Section ${index + 1}`}
                          </span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <pre className="bg-muted rounded p-4 text-sm">
                          {JSON.stringify(section.data, null, 2)}
                        </pre>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-auto pt-8">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
