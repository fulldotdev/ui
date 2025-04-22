import { cn } from "@/lib/utils"
import { Channels } from "@/components/channels"
import { Description } from "@/components/description"
import { Form } from "@/components/form"
import { Title } from "@/components/title"

export interface Contact1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
}

function Contact1({
  className,
  level = 2,
  title,
  description,
  channels,
  form,
  ...props
}: Contact1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-md px-4 lg:px-8">
        <div className="flex flex-col">
          <Title size="4xl" level={level}>
            {title}
          </Title>
          {description && (
            <Description className="not-first:mt-4">{description}</Description>
          )}
          {channels && <Channels className="not-first:mt-8" {...channels} />}
          {form && <Form className="not-first:mt-16" {...form} />}
        </div>
      </div>
    </section>
  )
}

export { Contact1 }
