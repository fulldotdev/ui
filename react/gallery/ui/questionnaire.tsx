import * as React from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

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

const projectItems = [
  {
    name: "goal",
    required: true,
    choices: [{ value: "launch" }, { value: "redesign" }, { value: "content" }],
  },
  {
    name: "pages",
    choices: [{ value: "home" }, { value: "pricing" }, { value: "blog" }],
  },
  { name: "email", required: true },
] as const

const planItems = [
  {
    name: "plan",
    required: true,
    choices: [
      { value: "starter" },
      { value: "business" },
      { value: "enterprise", disabled: true },
    ],
  },
] as const

function Navigation() {
  return (
    <QuestionnaireActions>
      <QuestionnairePrevious />
      <QuestionnaireSkip />
      <QuestionnaireNext />
      <QuestionnaireSubmit>Send answers</QuestionnaireSubmit>
    </QuestionnaireActions>
  )
}

function useSubmitted() {
  const [result, setResult] = React.useState<string>()
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setResult(
      [...data.entries()]
        .map(([key, value]) => `${key}: ${String(value)}`)
        .join(", ")
    )
  }
  return { result, onSubmit }
}

export default function Demo() {
  const standalone = useSubmitted()
  const card = useSubmitted()
  const disabled = useSubmitted()
  const [current, setCurrent] = React.useState("goal")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Standalone with letter shortcuts">
        <div className="flex w-full max-w-lg flex-col gap-3">
          <Questionnaire
            defaultItem="goal"
            items={projectItems}
            shortcuts="letters"
            onSubmit={standalone.onSubmit}
          >
            <QuestionnaireProgress />
            <QuestionnaireItem name="goal" required>
              <QuestionnaireTitle>What is the main goal?</QuestionnaireTitle>
              <QuestionnaireDescription>
                Choose one or describe your own.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="launch">
                  <span className="font-medium">Launch a new site</span>
                  <QuestionnaireChoiceDescription>
                    Start from a fresh design and content.
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
                <QuestionnaireChoice value="redesign">
                  <span className="font-medium">Redesign</span>
                  <QuestionnaireChoiceDescription>
                    Keep the content, refresh the look.
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
                <QuestionnaireChoice value="content">
                  <span className="font-medium">Content update</span>
                  <QuestionnaireChoiceDescription>
                    New pages, texts and images.
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
                <QuestionnaireInput
                  aria-label="Another goal"
                  placeholder="Type another goal"
                />
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="pages" multiple>
              <QuestionnaireTitle>Which pages are included?</QuestionnaireTitle>
              <QuestionnaireDescription>
                Select all that apply, or skip this question.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="home">Home</QuestionnaireChoice>
                <QuestionnaireChoice value="pricing">
                  Pricing
                </QuestionnaireChoice>
                <QuestionnaireChoice value="blog">Blog</QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="email" required>
              <QuestionnaireTitle>Where can we reach you?</QuestionnaireTitle>
              <QuestionnaireDescription>
                We send the proposal to this address.
              </QuestionnaireDescription>
              <QuestionnaireInput
                type="email"
                aria-label="Email"
                placeholder="you@example.com"
              />
              <QuestionnaireError />
            </QuestionnaireItem>
            <Navigation />
          </Questionnaire>
          {standalone.result && (
            <p className="text-sm text-muted-foreground">
              Submitted {standalone.result}
            </p>
          )}
        </div>
      </Example>

      <Example title="Controlled item in a card with number shortcuts">
        <div className="flex w-full max-w-lg flex-col gap-3">
          <Questionnaire
            item={current}
            onItemChange={setCurrent}
            items={projectItems}
            shortcuts="numbers"
            onSubmit={card.onSubmit}
          >
            <Card>
              <CardHeader>
                <CardTitle>Project intake</CardTitle>
                <CardDescription>Current question: {current}</CardDescription>
                <CardAction>
                  <QuestionnaireProgress
                    render={(props, state) => (
                      <span {...props}>
                        Question {state.current} of {state.total}
                      </span>
                    )}
                  />
                </CardAction>
              </CardHeader>
              <CardContent>
                <QuestionnaireItem name="goal" required>
                  <QuestionnaireTitle>
                    What is the main goal?
                  </QuestionnaireTitle>
                  <QuestionnaireChoices>
                    <QuestionnaireChoice value="launch">
                      Launch a new site
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="redesign">
                      Redesign
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="content">
                      Content update
                    </QuestionnaireChoice>
                  </QuestionnaireChoices>
                  <QuestionnaireError />
                </QuestionnaireItem>
                <QuestionnaireItem name="pages" multiple>
                  <QuestionnaireTitle>
                    Which pages are included?
                  </QuestionnaireTitle>
                  <QuestionnaireChoices>
                    <QuestionnaireChoice value="home">Home</QuestionnaireChoice>
                    <QuestionnaireChoice value="pricing">
                      Pricing
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="blog">Blog</QuestionnaireChoice>
                  </QuestionnaireChoices>
                </QuestionnaireItem>
                <QuestionnaireItem name="email" required>
                  <QuestionnaireTitle>
                    Where can we reach you?
                  </QuestionnaireTitle>
                  <QuestionnaireInput
                    type="email"
                    aria-label="Email"
                    placeholder="you@example.com"
                  />
                  <QuestionnaireError />
                </QuestionnaireItem>
              </CardContent>
              <CardFooter>
                <Navigation />
              </CardFooter>
            </Card>
          </Questionnaire>
          {card.result && (
            <p className="text-sm text-muted-foreground">
              Submitted {card.result}
            </p>
          )}
        </div>
      </Example>

      <Example title="Disabled choice">
        <div className="flex w-full max-w-lg flex-col gap-3">
          <Questionnaire
            defaultItem="plan"
            items={planItems}
            onSubmit={disabled.onSubmit}
          >
            <QuestionnaireItem name="plan" required>
              <QuestionnaireTitle>Choose a plan</QuestionnaireTitle>
              <QuestionnaireDescription>
                Enterprise is not available on your account.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="starter">
                  Starter
                </QuestionnaireChoice>
                <QuestionnaireChoice value="business">
                  Business
                </QuestionnaireChoice>
                <QuestionnaireChoice value="enterprise" disabled>
                  Enterprise
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <Navigation />
          </Questionnaire>
          {disabled.result && (
            <p className="text-sm text-muted-foreground">
              Submitted {disabled.result}
            </p>
          )}
        </div>
      </Example>
    </div>
  )
}
