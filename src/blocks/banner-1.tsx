import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Container } from "@/components/container"

function Banner1({ className, id, list }: BlockSchema) {
  return list ? (
    <header
      className={`banner bg-primary text-primary-foreground relative z-10 flex h-8 items-center text-center text-sm leading-3.5 font-medium ${className}`}
      id={id}
    >
      <Container className="flex items-center justify-evenly text-xs">
        {list?.map((item, i) => (
          <span
            key={item}
            className={cn({
              "max-md:hidden": i > 0,
              "max-lg:hidden": i > 1,
              "max-xl:hidden": i > 2,
              hidden: i > 3,
            })}
          >
            {item}
          </span>
        ))}
      </Container>
      <style>
        {`
          :root {
            --banner-height: calc(var(--spacing) * 8);
          }
        `}
      </style>
    </header>
  ) : null
}

export { Banner1 }
