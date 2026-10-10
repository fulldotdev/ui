import { Faqs2 } from "@/components/blocks/faqs-2"

export default function Faqs2Demo() {
  return (
    <>
      <Faqs2
        title="Questions & answers"
        description="Find quick answers to the questions we hear most from teams evaluating the product."
        buttons={[
          { label: "Get started", href: "#" },
          { label: "Talk to sales", href: "#" },
        ]}
        faqs={[
          {
            id: "faq-2-1",
            question: "How many team members can I invite?",
            answer:
              "There is no limit on team size for paid plans. Free plans support up to five members with full access to core features.",
          },
          {
            id: "faq-2-2",
            question: "Do you offer onboarding assistance?",
            answer:
              "Yes. Every paid plan includes a guided onboarding session with our customer success team to help you hit the ground running.",
          },
          {
            id: "faq-2-3",
            question: "Can I integrate with existing tools?",
            answer:
              "We offer native integrations with popular tools like Slack, GitHub, Linear, and Figma. Custom integrations are available via our REST API.",
          },
          {
            id: "faq-2-4",
            question: "What happens when my trial ends?",
            answer:
              "You will be downgraded to the free plan automatically. No charges are made unless you explicitly choose to upgrade.",
          },
        ]}
      />
    </>
  )
}
