import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

const totalPages = 10

function pagesAround(page: number): (number | "ellipsis")[] {
  if (page <= 3) return [1, 2, 3, 4, "ellipsis", totalPages]
  if (page >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages]
}

export default function Demo() {
  const [page, setPage] = React.useState(1)

  function go(event: React.MouseEvent, next: number) {
    event.preventDefault()
    setPage(Math.min(totalPages, Math.max(1, next)))
  }

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Static">
        <Pagination aria-label="Pagination example 1">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#/ui/pagination" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/ui/pagination">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/ui/pagination" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/ui/pagination">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#/ui/pagination" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Example>

      <Example title="Controlled">
        <div className="flex w-full flex-col items-center gap-2">
          <Pagination aria-label="Pagination example 2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#/ui/pagination"
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  onClick={(event) => go(event, page - 1)}
                />
              </PaginationItem>
              {pagesAround(page).map((item, index) =>
                item === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#/ui/pagination"
                      isActive={item === page}
                      onClick={(event) => go(event, item)}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#/ui/pagination"
                  aria-disabled={page === totalPages}
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                  onClick={(event) => go(event, page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
        </div>
      </Example>

      <Example title="Custom text and size">
        <Pagination aria-label="Pagination example 3">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#/ui/pagination" text="Newer" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/ui/pagination" size="sm" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/ui/pagination" size="sm">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#/ui/pagination" text="Older" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Example>
    </div>
  )
}
