"use client"

import * as React from "react"
import { cn } from "cn"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
} from "lucide-react"
import { siClaude, siCursor, siMarkdown, type SimpleIcon } from "simple-icons"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SectionContainer } from "@/components/ui/section"
import {
  Toc,
  TocMenu,
  TocMenuItem,
  TocMenuLink,
  TocTitle,
} from "@/components/ui/toc"
import {
  Typography,
  TypographyH1,
  TypographyLead,
} from "@/components/ui/typography"

// Copies text and shows a check for a moment; a failed copy can be retried.
function useCopy() {
  const [copied, setCopied] = React.useState(false)
  React.useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1200)
    return () => clearTimeout(timeout)
  }, [copied])
  const copy = (text: string) =>
    navigator.clipboard.writeText(text).then(
      () => setCopied(true),
      () => {}
    )
  return { copied, copy }
}

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  )
}

function ChatGPTIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.182a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .511 4.91 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.989 5.989 0 0 0 3.998-2.9 6.056 6.056 0 0 0-.748-7.073ZM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.142-.081 4.778-2.758a.795.795 0 0 0 .393-.681v-6.737l2.02 1.169a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.494Zm-9.66-4.125a4.471 4.471 0 0 1-.535-3.014l.142.085 4.783 2.758a.771.771 0 0 0 .781 0l5.843-3.368v2.332a.08.08 0 0 1-.034.062L9.74 19.95a4.499 4.499 0 0 1-6.14-1.646ZM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.814 3.354-2.02 1.169a.076.076 0 0 1-.071 0l-4.83-2.787A4.504 4.504 0 0 1 2.34 7.872Zm16.596 3.856-5.833-3.388L15.12 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.677a.79.79 0 0 0-.407-.667Zm2.011-3.024-.142-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.499 4.499 0 0 1 6.68 4.66ZM8.307 12.863l-2.02-1.164a.08.08 0 0 1-.038-.057V6.074a4.499 4.499 0 0 1 7.376-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681Zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z" />
    </svg>
  )
}

// One callback ref for several refs. A callback ref's own cleanup runs when
// the node detaches (React 19); other refs are set back to null.
function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") {
        const cleanup = ref(node)
        return typeof cleanup === "function" ? cleanup : () => ref(null)
      }
      if (ref) {
        ref.current = node
        return () => {
          ref.current = null
        }
      }
    })
    return () => cleanups.forEach((cleanup) => cleanup?.())
  }
}

const CopyLabelContext = React.createContext("Copy code")

// A code block with a copy button. Doc1 uses it for the <pre> elements it
// gets as direct children. Content from a component, such as compiled MDX,
// renders its own <pre>, so map it there: <Content components={{ pre: Doc1CodeBlock }} />.
function Doc1CodeBlock({
  className,
  ref,
  ...props
}: React.ComponentProps<"pre">) {
  const label = React.useContext(CopyLabelContext)
  const pre = React.useRef<HTMLPreElement>(null)
  const setPre = React.useMemo(() => composeRefs(pre, ref), [ref])
  const { copied, copy } = useCopy()
  return (
    <div
      data-not-typeset=""
      className="relative mt-(--typeset-flow) overflow-hidden rounded-xl border bg-muted/60"
    >
      <pre
        ref={setPre}
        className={cn(
          "m-0 overflow-x-auto rounded-none border-0 bg-transparent! py-4 ps-4 pe-14 font-mono text-sm [&_code]:font-[inherit] [&_code]:text-(--shiki-light,var(--color-foreground)) dark:[&_code]:text-(--shiki-dark,var(--color-foreground)) dark:[&_span[style*=--shiki-dark]]:text-(--shiki-dark)!",
          className
        )}
        {...props}
      />
      <button
        type="button"
        aria-label={label}
        onClick={() => copy(pre.current?.textContent?.replace(/\n$/, "") ?? "")}
        className="absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-md border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  )
}

function Doc1({
  className,
  title,
  description,
  copyButton,
  markdownUrl,
  tocItems,
  callout,
  previousPage,
  nextPage,
  labels,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: string
  description: string
  copyButton?: {
    id: string
    source: string
  }
  markdownUrl?: string
  tocItems: {
    depth: number
    href: string
    label: string
  }[]
  callout?: {
    description: string
    button: {
      label: string
      href: string
    }
  }
  previousPage?: {
    href: string
    title: string
  }
  nextPage?: {
    href: string
    title: string
  }
  labels: {
    copyMarkdown: string
    openIn: string
    openInMarkdown: string
    openInChatGPT: string
    openInClaude: string
    openInCursor: string
    assistantPrompt: string
    copyCode: string
    pagination: string
    toc: string
  }
}) {
  const { copied, copy } = useCopy()
  const prompt = encodeURIComponent(labels.assistantPrompt)
  const openLinks = markdownUrl
    ? [
        {
          label: labels.openInMarkdown,
          href: markdownUrl,
          icon: <BrandIcon icon={siMarkdown} />,
        },
        {
          label: labels.openInChatGPT,
          href: `https://chatgpt.com/?hints=search&q=${prompt}`,
          icon: <ChatGPTIcon />,
        },
        {
          label: labels.openInClaude,
          href: `https://claude.ai/new?q=${prompt}`,
          icon: <BrandIcon icon={siClaude} />,
        },
        {
          label: labels.openInCursor,
          href: `https://cursor.com/link/prompt?text=${prompt}`,
          icon: <BrandIcon icon={siCursor} />,
        },
      ]
    : []

  return (
    <SectionContainer
      className={cn(
        "flex flex-col gap-10 pt-10 pb-8 sm:pt-12 sm:pb-10 xl:grid xl:grid-cols-[minmax(0,1fr)_16rem] xl:items-start xl:gap-x-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <TypographyH1
              size="sm"
              className="text-left tracking-tight text-foreground"
            >
              {title}
            </TypographyH1>
            <TypographyLead size="sm" className="max-w-2xl leading-7">
              {description}
            </TypographyLead>
          </div>
          <div className="flex shrink-0 items-center gap-2 self-start">
            {copyButton && (
              <Button
                id={copyButton.id}
                type="button"
                variant="outline"
                size="xs"
                aria-label={labels.copyMarkdown}
                onClick={() => copy(copyButton.source)}
              >
                {copied ? (
                  <CheckIcon className="size-3.5" />
                ) : (
                  <CopyIcon className="size-3.5" />
                )}
                <span>{labels.copyMarkdown}</span>
              </Button>
            )}
            {openLinks.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={buttonVariants({ variant: "outline", size: "xs" })}
                >
                  <span>{labels.openIn}</span>
                  <ChevronDownIcon className="size-3.5 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={6}
                  className="w-56"
                >
                  <DropdownMenuGroup>
                    {openLinks.map((link) => (
                      <DropdownMenuItem
                        key={link.label}
                        render={
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer noopener"
                          />
                        }
                      >
                        {link.icon}
                        <span>{link.label}</span>
                        <ExternalLinkIcon className="ml-auto size-3.5 text-muted-foreground" />
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        <CopyLabelContext.Provider value={labels.copyCode}>
          <Typography render={<article />} size="sm">
            {React.Children.map(children, (child) =>
              React.isValidElement<React.ComponentProps<"pre">>(child) &&
              child.type === "pre" ? (
                <Doc1CodeBlock {...child.props} />
              ) : (
                child
              )
            )}
          </Typography>
        </CopyLabelContext.Provider>

        {(previousPage || nextPage) && (
          <nav
            aria-label={labels.pagination}
            className="flex items-center justify-between gap-3"
          >
            {previousPage ? (
              <a
                href={previousPage.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-auto min-w-0 items-center justify-start gap-2 px-3 py-2 whitespace-normal"
                )}
              >
                <ArrowLeftIcon className="size-4" />
                <span className="truncate text-sm font-medium">
                  {previousPage.title}
                </span>
              </a>
            ) : (
              <div aria-hidden="true" />
            )}
            {nextPage ? (
              <a
                href={nextPage.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-auto min-w-0 items-center justify-end gap-2 px-3 py-2 text-right whitespace-normal"
                )}
              >
                <span className="truncate text-sm font-medium">
                  {nextPage.title}
                </span>
                <ArrowRightIcon className="size-4" />
              </a>
            ) : (
              <div aria-hidden="true" />
            )}
          </nav>
        )}
      </div>

      {(tocItems.length > 0 || callout) && (
        <div className="hidden w-64 xl:sticky xl:top-12 xl:mr-0 xl:ml-auto xl:block xl:self-start">
          <div className="flex flex-col gap-6">
            {tocItems.length > 0 && (
              <Toc aria-label={labels.toc}>
                <TocTitle>{labels.toc}</TocTitle>
                <TocMenu>
                  {tocItems.map((item) => (
                    <TocMenuItem key={item.href}>
                      <TocMenuLink href={item.href} depth={item.depth}>
                        {item.label}
                      </TocMenuLink>
                    </TocMenuItem>
                  ))}
                </TocMenu>
              </Toc>
            )}
            {callout && (
              <Card size="sm">
                <CardHeader>
                  <CardDescription>{callout.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <a
                    href={callout.button.href}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    {callout.button.label}
                  </a>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      )}
    </SectionContainer>
  )
}

export { Doc1, Doc1CodeBlock }
