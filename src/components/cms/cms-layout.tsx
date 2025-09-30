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
import { Block } from "@/components/block"
import AutoFormImage from "@/components/elements/auto-form/auto-form-image"
import AutoFormInput from "@/components/elements/auto-form/auto-form-input"
import AutoFormProse from "@/components/elements/auto-form/auto-form-prose"
import AutoFormTextarea from "@/components/elements/auto-form/auto-form-textarea"
import AutoFormWriteup from "@/components/elements/auto-form/auto-form-writeup"
import { Page } from "@/components/page"

export default function CmsLayout({
  filePath,
  digest,
  data,
  body,
}: {
  filePath?: string
  digest?: string
  data: PageSchema
  body?: string
}) {
  const stored =
    typeof window !== "undefined" && sessionStorage.getItem(filePath || "")
  const storedData = stored ? JSON.parse(stored) : undefined
  const myData = storedData?.digest === digest ? storedData.data : data

  const form = useForm({
    resolver: zodResolver(
      z.object({
        data: pageSchema,
        body: z.string().optional(),
      })
    ),
    defaultValues: {
      data: myData,
      body,
    },
  })

  const formValues = form.watch()
  const props = pageProps.parse(formValues.data)

  async function handleSubmit() {
    if (!filePath) return
    const { data: result, error } = await actions.updatePage({
      filePath,
      data: formValues.data,
      body: formValues.body,
    })
    if (error) throw error

    if (window !== undefined) {
      sessionStorage.setItem(
        filePath,
        JSON.stringify({
          digest: digest,
          data: formValues.data,
          body: formValues.body,
        })
      )
    }

    return result
  }

  // Auto-save before page unload if there are unsaved changes
  // React.useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     const hasChanged =
  //       JSON.stringify({ data: formValues.data, body: formValues.body }) !==
  //       JSON.stringify({ data, body })

  //     if (hasChanged) {
  //       handleSubmit()
  //     }
  //   }

  //   window.addEventListener("beforeunload", handleBeforeUnload)
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  // }, [formValues.data, formValues.body, data, body, handleSubmit])

  async function handleUpload(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    const { data, error } = await actions.uploadImage(formData)
    if (error) throw error
    return data
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                      {"html" in section && (
                        <AutoFormWriteup
                          control={form.control}
                          name={`data.sections.${sectionIndex}.html`}
                          label="writeup"
                        />
                      )}
                      {"links" in section &&
                        section.links?.map((_, linkIndex) => (
                          <div
                            key={linkIndex}
                            className="grid grid-cols-2 gap-2"
                          >
                            <AutoFormInput
                              control={form.control}
                              name={`data.sections.${sectionIndex}.links.${linkIndex}.text`}
                              label={`Link ${linkIndex + 1} text`}
                            />
                            <AutoFormInput
                              control={form.control}
                              name={`data.sections.${sectionIndex}.links.${linkIndex}.href`}
                              label={`Link ${linkIndex + 1} href`}
                            />
                          </div>
                        ))}
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
                        {"faqs" in section &&
                          section.faqs?.map((faq, faqIndex) => (
                            <AccordionItem
                              key={faqIndex}
                              value={`section-${sectionIndex}-faq-${faqIndex}`}
                            >
                              <AccordionTrigger className="flex w-full items-center justify-between">
                                FAQ {faqIndex + 1}
                              </AccordionTrigger>
                              <AccordionContent className="space-y-4 py-4">
                                {"title" in faq && (
                                  <AutoFormInput
                                    control={form.control}
                                    name={`data.sections.${sectionIndex}.faqs.${faqIndex}.question`}
                                    label="Title"
                                  />
                                )}
                                {"description" in faq && (
                                  <AutoFormTextarea
                                    control={form.control}
                                    name={`data.sections.${sectionIndex}.faqs.${faqIndex}.answer`}
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
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            {/* <Page {...props}></Page> */}
            <Block {...props}>
              <AutoFormProse control={form.control} name="body" />
            </Block>
            {props.sections?.map((section, sectionIndex) => (
              <Block key={sectionIndex} {...section}>
                <AutoFormWriteup
                  control={form.control}
                  name={`data.sections.${sectionIndex}.html`}
                />
              </Block>
            ))}
          </SidebarInset>
        </SidebarProvider>
      </form>
    </Form>
  )
}
