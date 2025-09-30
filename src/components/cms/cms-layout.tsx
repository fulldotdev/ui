import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { actions } from "astro:actions"
import { z } from "astro:schema"
import { useForm } from "react-hook-form"

import { pageProps, pageSchema, type PageSchema } from "@/schemas/page"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import CmsEditor from "@/components/cms/cms-editor"
import AutoFormImage from "@/components/elements/auto-form/auto-form-image"
import AutoFormInput from "@/components/elements/auto-form/auto-form-input"
import AutoFormTextarea from "@/components/elements/auto-form/auto-form-textarea"
import { Page } from "@/components/page"

export default function CmsLayout({
  filePath,
  data,
  body,
}: {
  filePath?: string
  data: PageSchema
  body?: string
}) {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        data: pageSchema,
        body: z.string().optional(),
      })
    ),
    defaultValues: {
      data,
      body,
    },
  })

  const formValues = form.watch()
  const props = pageProps.parse(formValues.data)

  async function onSubmit() {
    if (!filePath) return
    const { data: result, error } = await actions.updatePage({
      filePath,
      data: formValues.data,
      body: formValues.body,
    })

    if (error) throw error
    return result
  }

  async function handleUpload(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    const { data, error } = await actions.uploadImage(formData)

    if (error) {
      throw error
    }

    return data
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "32rem",
          "--sidebar-width-mobile": "100%",
        } as React.CSSProperties
      }
    >
      <Sidebar>
        <SidebarContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {"title" in data && (
                <AutoFormInput
                  control={form.control}
                  name="data.title"
                  label="Title"
                />
              )}
              {"description" in data && (
                <AutoFormTextarea
                  control={form.control}
                  name="data.description"
                  label="Description"
                />
              )}
              {"image" in data && (
                <AutoFormImage
                  control={form.control}
                  name="data.image.src"
                  label="Image"
                  upload={handleUpload}
                />
              )}
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                {data.sections?.map((section, sectionIndex) => (
                  <AccordionItem
                    key={sectionIndex}
                    value={`section-${sectionIndex}`}
                  >
                    <AccordionTrigger className="flex w-full items-center justify-between">
                      Section {sectionIndex + 1} ({section.type || "unknown"})
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 py-4">
                      {"title" in section && (
                        <AutoFormInput
                          control={form.control}
                          name={`data.sections.${sectionIndex}.title`}
                          label="Title"
                        />
                      )}
                      {"description" in section && (
                        <AutoFormTextarea
                          control={form.control}
                          name={`data.sections.${sectionIndex}.description`}
                          label="Description"
                        />
                      )}
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="item-1"
                      >
                        {"features" in section &&
                          section.features?.map((feature, featureIndex) => (
                            <AccordionItem
                              key={featureIndex}
                              value={`section-${sectionIndex}-feature-${featureIndex}`}
                            >
                              <AccordionTrigger className="flex w-full items-center justify-between">
                                Feature {featureIndex + 1}
                              </AccordionTrigger>
                              <AccordionContent className="space-y-4 py-4">
                                {"title" in feature && (
                                  <AutoFormInput
                                    control={form.control}
                                    name={`data.sections.${sectionIndex}.features.${featureIndex}.title`}
                                    label="Title"
                                  />
                                )}
                                {"description" in feature && (
                                  <AutoFormTextarea
                                    control={form.control}
                                    name={`data.sections.${sectionIndex}.features.${featureIndex}.description`}
                                    label="Description"
                                  />
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Page {...props}>
          <CmsEditor
            content={body}
            onUpdate={(content) => {
              // Handle body content updates if needed
              console.log("Body updated:", content)
            }}
          />
        </Page>
      </SidebarInset>
    </SidebarProvider>
  )
}
