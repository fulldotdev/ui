import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Import all block schemas
import { articleSchema } from "@/schemas/blocks/article"
import { articlesSchema } from "@/schemas/blocks/articles"
import { bannerSchema } from "@/schemas/blocks/banner"
import { blocksSchema } from "@/schemas/blocks/blocks"
import { contactSchema } from "@/schemas/blocks/contact"
import { contentSchema } from "@/schemas/blocks/content"
import { ctaSchema } from "@/schemas/blocks/cta"
import { faqsSchema } from "@/schemas/blocks/faqs"
import { featureSchema } from "@/schemas/blocks/feature"
import { featuresSchema } from "@/schemas/blocks/features"
import { footerSchema } from "@/schemas/blocks/footer"
import { headerSchema } from "@/schemas/blocks/header"
import { jobSchema } from "@/schemas/blocks/job"
import { jobsSchema } from "@/schemas/blocks/jobs"
import { mapSchema } from "@/schemas/blocks/map"
import { pagesSchema } from "@/schemas/blocks/pages"
import { personSchema } from "@/schemas/blocks/person"
import { personsSchema } from "@/schemas/blocks/persons"
import { pricingsSchema } from "@/schemas/blocks/pricings"
import { productSchema } from "@/schemas/blocks/product"
import { productsSchema } from "@/schemas/blocks/products"
import { quoteSchema } from "@/schemas/blocks/quote"
import { reviewSchema } from "@/schemas/blocks/review"
import { reviewsSchema } from "@/schemas/blocks/reviews"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Block type mapping
const blockSchemas = {
  article: articleSchema,
  articles: articlesSchema,
  banner: bannerSchema,
  blocks: blocksSchema,
  contact: contactSchema,
  content: contentSchema,
  cta: ctaSchema,
  faqs: faqsSchema,
  feature: featureSchema,
  features: featuresSchema,
  footer: footerSchema,
  header: headerSchema,
  job: jobSchema,
  jobs: jobsSchema,
  map: mapSchema,
  pages: pagesSchema,
  person: personSchema,
  persons: personsSchema,
  pricings: pricingsSchema,
  product: productSchema,
  products: productsSchema,
  quote: quoteSchema,
  review: reviewSchema,
  reviews: reviewsSchema,
} as const

type BlockType = keyof typeof blockSchemas

interface CmsBlockProps {
  blockType: BlockType
  block?: Record<string, any>
  onSubmit?: (data: Record<string, any>) => void
}

function CmsBlock({ blockType, block = {}, onSubmit }: CmsBlockProps) {
  const schema = blockSchemas[blockType]

  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: block,
  })

  // Get the shape of the schema to determine which fields to render
  const schemaShape = (schema as any)._def.shape()

  const handleSubmit = (data: Record<string, any>) => {
    onSubmit?.(data)
  }

  const renderField = (
    fieldName: string,
    fieldSchema: any,
    path: string = fieldName
  ) => {
    const fieldType =
      fieldSchema._def?.typeName || fieldSchema.constructor?.name

    // Handle optional fields
    const actualSchema = fieldSchema._def?.innerType || fieldSchema

    switch (fieldType) {
      case "ZodString":
        if (fieldName.includes("html") || fieldName.includes("description")) {
          return (
            <FormField
              key={path}
              control={form.control}
              name={path as keyof typeof block}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {fieldName.replace(/([A-Z])/g, " $1")}
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        }
        return (
          <FormField
            key={path}
            control={form.control}
            name={path as keyof typeof block}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {fieldName.replace(/([A-Z])/g, " $1")}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case "ZodEnum":
        const enumValues = actualSchema._def?.values || []
        return (
          <FormField
            key={path}
            control={form.control}
            name={path as keyof typeof block}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {fieldName.replace(/([A-Z])/g, " $1")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${fieldName}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enumValues.map((value: string) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case "ZodObject":
        // Handle nested objects like image
        if (fieldName === "image") {
          const imageShape = actualSchema._def?.shape()
          return (
            <div key={path} className="space-y-4 rounded-lg border p-4">
              <h3 className="font-medium capitalize">{fieldName}</h3>
              {Object.entries(imageShape || {}).map(
                ([nestedField, nestedSchema]) =>
                  renderField(
                    nestedField,
                    nestedSchema as any,
                    `${path}.${nestedField}`
                  )
              )}
            </div>
          )
        }
        break

      case "ZodArray":
        // Handle arrays - simplified version
        return (
          <div key={path} className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium capitalize">{fieldName}</h3>
            <p className="text-muted-foreground text-sm">
              Array field - implement array handling as needed
            </p>
          </div>
        )

      case "ZodDate":
        return (
          <FormField
            key={path}
            control={form.control}
            name={path as keyof typeof block}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {fieldName.replace(/([A-Z])/g, " $1")}
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      default:
        // Fallback for other types
        return (
          <FormField
            key={path}
            control={form.control}
            name={path as keyof typeof block}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {fieldName.replace(/([A-Z])/g, " $1")}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold capitalize">
            {blockType} Block
          </h2>

          {Object.entries(schemaShape).map(([fieldName, fieldSchema]) =>
            renderField(fieldName, fieldSchema as any)
          )}
        </div>

        {onSubmit && (
          <Button type="submit" className="w-full">
            Save Block
          </Button>
        )}
      </form>
    </Form>
  )
}

export default CmsBlock
