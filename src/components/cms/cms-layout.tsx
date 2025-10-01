import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { actions } from "astro:actions"
import { z } from "astro:schema"
import {
  ChevronRight,
  CopyPlusIcon,
  Heading1,
  ImagePlus,
  InfoIcon,
  SaveIcon,
  TextAlignStart,
  TrashIcon,
  Undo2Icon,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { pageProps, pageSchema, type PageSchema } from "@/schemas/page"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Block } from "@/components/block"
import AutoFormImage from "@/components/elements/auto-form/auto-form-image"
import AutoFormInput from "@/components/elements/auto-form/auto-form-input"
import AutoFormProse from "@/components/elements/auto-form/auto-form-prose"
import AutoFormTextarea from "@/components/elements/auto-form/auto-form-textarea"
import AutoFormWriteup from "@/components/elements/auto-form/auto-form-writeup"
import { Page } from "@/components/page"

export default function CmsLayout({
  filePath,
  id,
  digest,
  data,
  body,
}: {
  filePath?: string
  id?: string
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
        id: z.string(),
        data: pageSchema,
        body: z.string().optional(),
      })
    ),
    defaultValues: {
      id,
      data: myData,
      body,
    },
  })

  const formValues = form.watch()
  const props = pageProps.parse(formValues.data)

  async function handleSubmit() {
    if (!filePath) return
    if (!hasChanges) return
    setIsSaving(true)
    const { data: result, error } = await actions.savePage({
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
    setIsSaving(false)
    return result
  }

  async function handleUpload(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    const { data, error } = await actions.uploadImage(formData)
    if (error) throw error
    return data
  }

  const [hasChanges, setHasChanges] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)

  React.useEffect(() => {
    setHasChanges(
      JSON.stringify({ data: formValues.data, body: formValues.body }) !==
        JSON.stringify({ data: myData, body })
    )
    window.addEventListener("beforeunload", handleSubmit)
    return () => window.removeEventListener("beforeunload", handleSubmit)
  }, [formValues.data, formValues.body, myData, body])

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
          <Sidebar variant="inset">
            <SidebarHeader className="flex-row justify-end">
              <Button
                className="fixed top-4 left-4"
                variant="secondary"
                size="icon"
                asChild
              >
                <SidebarTrigger />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => setIsCopied(!isCopied)}
              >
                {isCopied ? <Undo2Icon /> : <CopyPlusIcon />}
              </Button>
              <Button type="submit" disabled={!hasChanges || isSaving}>
                Save
              </Button>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent className="flex flex-col gap-4 p-2">
                  {isCopied && (
                    <AutoFormInput
                      control={form.control}
                      name="id"
                      label="New page slug"
                      description="You're creating a new page. Please change the slug to determine the new page URL to be used for the new page."
                      className="border-primary"
                    />
                  )}
                  {"title" in data && (
                    <AutoFormInput
                      control={form.control}
                      name="data.title"
                      label="Title"
                      className="bg-background"
                    />
                  )}
                  {"description" in data && (
                    <AutoFormTextarea
                      control={form.control}
                      name="data.description"
                      label="Description"
                      className="bg-background"
                    />
                  )}
                  {"image" in data && (
                    <AutoFormImage
                      control={form.control}
                      name="data.image.src"
                      label="Image"
                      upload={handleUpload}
                      className="bg-background"
                    />
                  )}
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Sections</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarGroupContent className="flex flex-col gap-2">
                    {data.sections?.map((section, sectionIndex) => (
                      <Collapsible
                        key={sectionIndex}
                        className="group/collapsible"
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="secondary"
                            size="lg"
                            className="w-full justify-between"
                          >
                            {sectionIndex + 1}. {section.type}
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="my-6 flex flex-col gap-6 border-l px-6">
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
                            />
                          )}
                          <div className="flex w-full flex-col gap-4">
                            <Label className="mb-">Links</Label>
                            <div className="flex flex-col gap-2">
                              {"links" in section &&
                                section.links?.map((_, linkIndex) => (
                                  <div
                                    key={linkIndex}
                                    className="grid w-full grid-cols-2 gap-2"
                                  >
                                    <AutoFormInput
                                      control={form.control}
                                      name={`data.sections.${sectionIndex}.links.${linkIndex}.text`}
                                      placeholder="Link text"
                                    />
                                    <AutoFormInput
                                      control={form.control}
                                      name={`data.sections.${sectionIndex}.links.${linkIndex}.href`}
                                      placeholder="/link-href/"
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          {"image" in data && (
                            <AutoFormImage
                              control={form.control}
                              name="data.image.src"
                              label="Image"
                              upload={handleUpload}
                              className="bg-background"
                            />
                          )}
                          {"features" in section && (
                            <div className="flex flex-col gap-2">
                              <Label className="mb-2">Features</Label>
                              {section.features?.map(
                                (feature, featureIndex) => (
                                  <Collapsible
                                    key={featureIndex}
                                    className="group/collapsible"
                                  >
                                    <CollapsibleTrigger asChild>
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-full justify-between"
                                      >
                                        {feature.title}
                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                      </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="my-2 flex flex-col gap-6 py-2">
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
                                      {"image" in feature && (
                                        <AutoFormImage
                                          control={form.control}
                                          name={`data.sections.${sectionIndex}.features.${featureIndex}.image.src`}
                                          label="Image"
                                          upload={handleUpload}
                                          className="bg-background"
                                        />
                                      )}
                                    </CollapsibleContent>
                                  </Collapsible>
                                )
                              )}
                            </div>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </SidebarGroupContent>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* <SidebarGroup>
                <SidebarGroupLabel>Sections</SidebarGroupLabel>
                <SidebarGroupContent className="flex flex-col gap-4 p-2">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-2"
                  >
                    {data.sections?.map((section, sectionIndex) => (
                      <AccordionItem
                        key={sectionIndex}
                        value={`section-${sectionIndex}`}
                        className="border-b-0"
                      >
                        <AccordionTrigger className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex w-full items-center justify-between p-4 !no-underline">
                          {sectionIndex + 1}. {section.type}
                        </AccordionTrigger>
                        <AccordionContent className="my-4 space-y-4">
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
                          <div className="mt-4 flex w-full flex-col gap-4">
                            <Label className="mb-">Links</Label>
                            <div className="flex flex-col gap-2 border-l pl-6">
                              {"links" in section &&
                                section.links?.map((_, linkIndex) => (
                                  <div
                                    key={linkIndex}
                                    className="grid w-full grid-cols-2 gap-2"
                                  >
                                    <AutoFormInput
                                      control={form.control}
                                      name={`data.sections.${sectionIndex}.links.${linkIndex}.text`}
                                      placeholder="Link text"
                                    />
                                    <AutoFormInput
                                      control={form.control}
                                      name={`data.sections.${sectionIndex}.links.${linkIndex}.href`}
                                      placeholder="/link-href/"
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <Label className="mt-8 mb-3">Features</Label>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2"
                            defaultValue="item-1"
                          >
                            {"features" in section &&
                              section.features?.map((feature, featureIndex) => (
                                <AccordionItem
                                  key={featureIndex}
                                  value={`section-${sectionIndex}-feature-${featureIndex}`}
                                  className="border-b-0"
                                >
                                  <AccordionTrigger className="bg-secondary secondary-foreground hover:bg-secondary/80 flex w-full items-center justify-between p-3 text-sm !no-underline">
                                    {featureIndex + 1}. {feature.title}
                                  </AccordionTrigger>
                                  <AccordionContent className="my-4 space-y-4 border-l pl-6">
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
                </SidebarGroupContent>
              </SidebarGroup> */}
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <Page {...props}>
              <AutoFormProse control={form.control} name="body" />
            </Page>
          </SidebarInset>
        </SidebarProvider>
      </form>
    </Form>
  )
}
