"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "astro:schema"
import { useForm } from "react-hook-form"

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
import CmsEditor from "@/components/cms/cms-editor"

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  body: z.string().optional(),
})

export default function CmsPageEdit(entry: any) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: entry.data.title || "",
      description: entry.data.description || "",
      body: entry.rendered?.html || "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form data:", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6 space-y-6">
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
          </TabsContent>
          <TabsContent value="content">
            <CmsEditor
              content={entry.rendered?.html}
              onUpdate={(content) => form.setValue("body", content)}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" className="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
