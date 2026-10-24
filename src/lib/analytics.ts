import posthog from "posthog-js/dist/module.slim.no-external"

import { sanitizeEventUrls } from "./analytics-privacy.js"

export function startAnalytics() {
  const fetchOptions: RequestInit = { credentials: "omit", cache: "no-store" }
  posthog.init("phc_txCmZNAK3YueTeNyvtXmnh9JvK2LdbF3hK3kvxRcEJou", {
    api_host: "https://eu.i.posthog.com",
    api_transport: "fetch",
    disable_beacon: true,
    fetch_options: fetchOptions,
    defaults: "2025-11-30",
    cookieless_mode: "always",
    persistence: "memory",
    persistence_name: "website",
    person_profiles: "never",
    save_campaign_params: false,
    property_denylist: ["ph_keyword", "$initial_ph_keyword"],
    capture_pageview: true,
    capture_pageleave: true,
    disable_scroll_properties: true,
    autocapture: false,
    capture_dead_clicks: false,
    capture_heatmaps: false,
    capture_exceptions: false,
    capture_performance: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_product_tours: true,
    disable_conversations: true,
    advanced_disable_flags: true,
    disable_external_dependency_loading: true,
    before_send: sanitizeEventUrls,
  })
}
