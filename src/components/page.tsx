import { useEffect, useState } from "react"
import parse from "html-react-parser"

import type { EntrySchema } from "@/lib/schemas"
import { transformEntry } from "@/lib/transforms"
import { Block } from "@/components/block"

// CloudCannon types for live editing functionality
interface CloudCannonInstance {
  enableEvents: () => void
  value: () => Promise<any>
  set: (slug: string, value: any) => void
}

// Extend Window interface for CloudCannon
declare global {
  interface Window {
    CloudCannon?: CloudCannonInstance
  }
}

async function Page({
  children,
  content,
  images,
  ...page
}: EntrySchema & { content: any[]; images: any[] }) {
  // State to manage live page data from CloudCannon
  const [pageData, setPageData] = useState(page)

  // CloudCannon live editing setup
  useEffect(() => {
    const handleCloudCannonLoad = (e: any) => {
      const CloudCannonInstance = e.detail.CloudCannon

      // Enable events for live updates
      CloudCannonInstance.enableEvents()

      // Fetch initial data from CloudCannon
      CloudCannonInstance.value()
        .then((latestValue: any) => {
          if (latestValue) {
            const transformed = transformEntry(latestValue, content, images)
            setPageData(transformed)
          }
        })
        .catch((error: any) => {
          console.error("Error fetching initial CloudCannon value:", error)
        })
    }

    const handleCloudCannonUpdate = async (e: any) => {
      const CloudCannonInstance = e.detail.CloudCannon

      try {
        const latestValue = await CloudCannonInstance.value()
        if (latestValue) {
          const transformed = transformEntry(latestValue, content, images)
          setPageData(transformed)
        }
      } catch (error) {
        console.error("Error fetching updated data:", error)
      }
    }

    // Check if CloudCannon is already available or wait for load event
    if (typeof window !== "undefined") {
      if (!window.CloudCannon) {
        // Listen for CloudCannon load event
        document.addEventListener("cloudcannon:load", handleCloudCannonLoad)
      } else {
        // CloudCannon is already available
        handleCloudCannonLoad({ detail: { CloudCannon: window.CloudCannon } })
      }

      // Listen for CloudCannon update events
      document.addEventListener("cloudcannon:update", handleCloudCannonUpdate)
    }

    // Cleanup event listeners
    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("cloudcannon:load", handleCloudCannonLoad)
        document.removeEventListener(
          "cloudcannon:update",
          handleCloudCannonUpdate
        )
      }
    }
  }, [])

  return (
    <>
      {page.block && <Block {...pageData}>{children}</Block>}
      {pageData.blocks?.map((block, index) => (
        <div
          key={index}
          data-cms-bind={`#blocks[${index}]`}
          data-cms-bind-style="sidebar"
        >
          <Block {...block}>
            {typeof block.children === "string" && parse(block.children)}
          </Block>
        </div>
      ))}
    </>
  )
}

export { Page }
