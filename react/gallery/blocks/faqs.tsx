import * as React from "react"

import { Faqs1 } from "@/components/blocks/faqs-1"
import { Faqs2 } from "@/components/blocks/faqs-2"
import { Faqs3 } from "@/components/blocks/faqs-3"
import { Faqs4 } from "@/components/blocks/faqs-4"

const demos: Record<string, React.ComponentType> = {
  "faqs-1": () => {
    return (
      <>
        <Faqs1
          title="Frequently asked questions"
          description="Everything you need to know about our product. Can't find the answer you're looking for? Reach out to our support team."
          buttons={[
            { label: "Contact support", href: "#" },
            { label: "Documentation", href: "#" },
          ]}
          faqs={[
            {
              id: "faq-1-1",
              question: "How do I get started with the platform?",
              answer:
                "Sign up for an account, choose a plan that fits your needs, and follow our quick-start guide. You can be up and running in under five minutes.",
            },
            {
              id: "faq-1-2",
              question: "Can I upgrade or downgrade my plan at any time?",
              answer:
                "Yes. You can switch plans whenever you like. Changes take effect at the start of your next billing cycle and any unused credit is prorated.",
            },
            {
              id: "faq-1-3",
              question: "What payment methods do you accept?",
              answer:
                "We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also pay by invoice.",
            },
            {
              id: "faq-1-4",
              question: "Is there a free trial available?",
              answer:
                "Every new account comes with a 14-day free trial with full access to all features. No credit card required to start.",
            },
          ]}
        />
      </>
    )
  },
  "faqs-2": () => {
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
  },
  "faqs-3": () => {
    return (
      <>
        <Faqs3
          badge="Support"
          title="Common questions about billing and accounts"
          description="We have compiled answers to the questions our support team receives most frequently."
          faqs={[
            {
              id: "faq-3-1",
              question: "How do I update my billing information?",
              answer:
                "Navigate to Settings, then Billing, and update your payment method or billing address. Changes take effect immediately.",
            },
            {
              id: "faq-3-2",
              question: "Can I get a refund if I cancel early?",
              answer:
                "We offer a 30-day money-back guarantee. If you cancel within the first 30 days, we will refund your payment in full.",
            },
            {
              id: "faq-3-3",
              question: "Do you offer discounts for nonprofits?",
              answer:
                "Yes. Qualified nonprofit organizations receive 50% off any paid plan. Contact our sales team with proof of nonprofit status.",
            },
            {
              id: "faq-3-4",
              question: "How is usage calculated for metered plans?",
              answer:
                "Usage is measured in compute seconds and API calls. You can track consumption in real-time from your dashboard.",
            },
          ]}
        />
      </>
    )
  },
  "faqs-4": () => {
    return (
      <>
        <Faqs4
          title="Frequently asked questions"
          faqs={[
            {
              id: "faq-4-1",
              question: "Is my data secure on your platform?",
              answer:
                "Absolutely. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits to keep your data safe.",
            },
            {
              id: "faq-4-2",
              question: "Can I export my data if I leave?",
              answer:
                "Yes. You can export all of your data at any time in standard formats like CSV and JSON. There is no lock-in.",
            },
            {
              id: "faq-4-3",
              question: "Do you offer an uptime SLA?",
              answer:
                "Paid plans include a 99.9% uptime SLA. Enterprise plans can negotiate higher guarantees with dedicated support.",
            },
            {
              id: "faq-4-4",
              question: "How often do you release new features?",
              answer:
                "We ship updates weekly and publish a detailed changelog so you always know what is new.",
            },
          ]}
        />
      </>
    )
  },
}

export default demos
