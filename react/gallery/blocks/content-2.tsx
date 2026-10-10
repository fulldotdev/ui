import { Content2 } from "@/components/blocks/content-2"

export default function Content2Demo() {
  return (
    <>
      <Content2
        title="Pair editorial copy with a supporting image"
        description="Use this block when screenshots, diagrams, or photos need to sit beside copy without turning the whole page into a gallery."
        features={[
          "Clear headline and intro with supporting copy",
          "One media surface with rounded treatment",
          "Concise bullet points instead of a heavy card grid",
        ]}
        buttons={[
          { label: "Get started", href: "#" },
          { label: "Learn more", href: "#" },
        ]}
      />
    </>
  )
}
