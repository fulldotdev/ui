import { cn } from "@/lib/utils"
import { Prose } from "@/components/prose"

export interface Content1Props extends React.ComponentProps<"section"> {
  content?: string
  children?: React.ReactNode
}

function Content1({ className, content, children, ...props }: Content1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col">
          <Prose>
            {content}
            {children}
          </Prose>
        </div>
      </div>
    </section>
  )
}

export { Content1 }
