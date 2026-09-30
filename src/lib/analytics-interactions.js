let started = false

/**
 * Record intent only, never form values, link text or contact details.
 * @param {{ capture: (name: string, properties: Record<string, string>) => unknown }} posthog
 */
export function trackInteractions(posthog) {
  if (started) return
  started = true
  const ignored =
    ".ph-no-capture, .ph-no-autocapture, [data-ph-no-capture], [data-ph-no-autocapture]"
  const capture = (/** @type {string} */ type) => {
    posthog.capture("website_interaction", { interaction_type: type })
  }

  document.addEventListener(
    "submit",
    (event) => {
      if (
        event.target instanceof HTMLFormElement &&
        !event.target.closest(ignored)
      ) {
        capture("form_submit_attempt")
      }
    },
    true
  )

  document.addEventListener(
    "click",
    (event) => {
      if (!(event.target instanceof Element) || event.target.closest(ignored))
        return
      const link = event.target.closest("a[href]")
      if (!(link instanceof HTMLAnchorElement)) return
      let url
      try {
        url = new URL(link.href)
      } catch {
        return
      }
      if (url.protocol === "tel:") capture("phone_click")
      else if (url.protocol === "mailto:") capture("email_click")
      else if (url.protocol === "whatsapp:") capture("whatsapp_click")
      else if (url.protocol === "https:" || url.protocol === "http:") {
        if (
          ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(
            url.hostname
          )
        ) {
          capture("whatsapp_click")
        } else if (
          link.hasAttribute("download") ||
          /\.(pdf|docx?|xlsx?|pptx?|csv|zip)$/i.test(url.pathname)
        ) {
          capture("download_click")
        } else if (
          url.hostname.replace(/^www\./, "") !==
          window.location.hostname.replace(/^www\./, "")
        ) {
          capture("outbound_click")
        }
      }
    },
    { capture: true, passive: true }
  )
}
