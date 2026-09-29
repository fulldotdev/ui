import posthog from "posthog-js/dist/module.slim.no-external"

export function startAnalytics() {
  // Core includes pageview/pageleave and cookieless tracking. No extensions needed.
  posthog.init("phc_mVacbe8Xydu0UZlh4bNw5EGisvzyRcpqXEEuEEp5lOY", {
    api_host: "https://eu.i.posthog.com",
    defaults: "2025-11-30",
    cookieless_mode: "always",
    person_profiles: "never",
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_flags: true,
    disable_external_dependency_loading: true,
  })
}
