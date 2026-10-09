import "posthog-js/dist/web-vitals"

import { dropViewTransitionNoise } from "./analytics-exceptions.js"
import { sanitizeExceptionUrls } from "./analytics-privacy.js"

import "posthog-js/dist/exception-autocapture"

import {
  AnalyticsExtensions,
  ErrorTrackingExtensions,
} from "posthog-js/dist/extension-bundles"
import posthog from "posthog-js/dist/module.slim.no-external"

import { trackInteractions } from "./analytics-interactions.js"

export function startAnalytics() {
  posthog.init("phc_txCmZNAK3YueTeNyvtXmnh9JvK2LdbF3hK3kvxRcEJou", {
    // Netlify forwards /ingest to PostHog (netlify.toml).
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    defaults: "2025-11-30",
    cookieless_mode: "always",
    person_profiles: "never",
    autocapture: false,
    __extensionClasses: {
      ...ErrorTrackingExtensions,
      webVitalsAutocapture: AnalyticsExtensions.webVitalsAutocapture,
    },
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: true,
    },
    capture_performance: { web_vitals: true, web_vitals_attribution: false },
    mask_personal_data_properties: true,
    custom_personal_data_properties: [
      "email",
      "phone",
      "name",
      "password",
      "token",
      "access_token",
      "refresh_token",
      "code",
    ],
    disable_capture_url_hashes: true,
    property_denylist: [
      "$referrer",
      "$initial_referrer",
      "$session_entry_referrer",
    ],
    loaded: trackInteractions,
    before_send: [dropViewTransitionNoise, sanitizeExceptionUrls],
    capture_pageview: true,
    capture_pageleave: true,
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_flags: true,
    disable_external_dependency_loading: true,
  })
}
