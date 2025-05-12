import { cn } from "@/lib/utils"
import { Writeup } from "@/components/ui/writeup"
import { Channels } from "@/components/channels"
import { Form } from "@/components/form"

export interface Contact2Props extends React.ComponentProps<"section"> {
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
}

function Contact2({
  className,
  children,
  channels,
  form,
  ...props
}: Contact2Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto grid w-full max-w-screen-xl gap-8 px-4 md:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-start">
          {children && <Writeup size="4xl">{children}</Writeup>}
          {channels && (
            <Channels className="items-start not-first:mt-8" {...channels} />
          )}
        </div>
        {form && <Form {...form} />}
      </div>
    </section>
  )
}

export { Contact2 }
