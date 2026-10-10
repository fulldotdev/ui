import { Pricing2 } from "@/components/blocks/pricing-2"

export default function Pricing2Demo() {
  return (
    <>
      <Pricing2
        locale="en-US"
        discountLabel="Save"
        title="Pick the plan that matches your needs"
        description="Start small and scale as you grow. All plans include a 14-day free trial."
        plans={[
          {
            name: "Basic",
            description: "Essential tools for personal use and small projects.",
            price: {
              value: 29,
              currency: "USD",
              unit: "month",
            },
            features: [
              "5 projects",
              "Basic analytics",
              "Email support",
              "2 GB storage",
            ],
            button: { label: "Start free trial", href: "/docs/" },
          },
          {
            name: "Pro",
            description:
              "Advanced features for professionals and growing teams.",
            price: {
              value: 79,
              compareAt: 99,
              currency: "USD",
              unit: "month",
            },
            featured: true,
            features: [
              "Unlimited projects",
              "Advanced analytics",
              "Priority support",
              "50 GB storage",
              "Custom domains",
              "API access",
            ],
            button: { label: "Start free trial", href: "/docs/" },
          },
        ]}
      />
    </>
  )
}
