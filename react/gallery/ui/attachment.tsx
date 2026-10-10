import * as React from "react"
import {
  DownloadIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  RotateCwIcon,
  XIcon,
} from "lucide-react"

import { placeholderImage } from "@/lib/placeholder-image"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"

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

function RemovableAttachments() {
  const [files, setFiles] = React.useState([
    { name: "invoice-0412.pdf", size: "220 KB" },
    { name: "floor-plan.pdf", size: "1.4 MB" },
    { name: "menu.txt", size: "4 KB" },
  ])

  return (
    <div className="flex w-full flex-col items-start gap-3">
      <AttachmentGroup className="w-full max-w-md">
        {files.map((file) => (
          <Attachment key={file.name} size="sm">
            <AttachmentMedia>
              <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>{file.size}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                aria-label={`Remove ${file.name}`}
                onClick={() =>
                  setFiles((current) =>
                    current.filter((item) => item.name !== file.name)
                  )
                }
              >
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}
      </AttachmentGroup>
      {files.length === 0 && (
        <p className="text-sm text-muted-foreground">No attachments left.</p>
      )}
    </div>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="With download action">
        <Attachment>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>LICENCE</AttachmentTitle>
            <AttachmentDescription>Text document</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction
              nativeButton={false}
              render={
                <a
                  href="https://raw.githubusercontent.com/fulldotdev/ui/main/LICENCE"
                  download
                />
              }
              aria-label="Download LICENCE"
            >
              <DownloadIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </Example>
      <Example title="Sizes">
        <div className="flex w-full flex-col items-start gap-3">
          <Attachment size="xs">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>notes.txt</AttachmentTitle>
            </AttachmentContent>
          </Attachment>
          <Attachment size="sm">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>brief.txt</AttachmentTitle>
              <AttachmentDescription>18 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>proposal.txt</AttachmentTitle>
              <AttachmentDescription>42 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </div>
      </Example>
      <Example title="States">
        <Attachment state="idle">
          <AttachmentMedia>
            <FileIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>queued.csv</AttachmentTitle>
            <AttachmentDescription>Ready</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment state="uploading">
          <AttachmentMedia>
            <Spinner />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>photos.zip</AttachmentTitle>
            <AttachmentDescription>Uploading, 40%</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment state="processing">
          <AttachmentMedia>
            <FileIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>report.csv</AttachmentTitle>
            <AttachmentDescription>Processing</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment state="error">
          <AttachmentMedia>
            <FileIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>archive.zip</AttachmentTitle>
            <AttachmentDescription>File is too large</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Retry archive.zip">
              <RotateCwIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </Example>
      <Example title="Vertical group with image media">
        <AttachmentGroup className="w-full max-w-md">
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img src={placeholderImage.src} alt="Cover photo preview" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>cover.jpg</AttachmentTitle>
              <AttachmentDescription>1.8 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <ImageIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>logo.svg</AttachmentTitle>
              <AttachmentDescription>12 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>outline.pdf</AttachmentTitle>
              <AttachmentDescription>320 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </AttachmentGroup>
      </Example>
      <Example title="Whole card as a link">
        <Attachment>
          <AttachmentTrigger render={<a href="#/ui/attachment" />}>
            <span className="sr-only">Open price-list.pdf</span>
          </AttachmentTrigger>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>price-list.pdf</AttachmentTitle>
            <AttachmentDescription>96 KB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      </Example>
      <Example title="Removable">
        <RemovableAttachments />
      </Example>
    </div>
  )
}
