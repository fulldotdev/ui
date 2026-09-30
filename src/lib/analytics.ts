import "posthog-js/dist/exception-autocapture"

import { ErrorTrackingExtensions } from "posthog-js/dist/extension-bundles"
import posthog from "posthog-js/dist/module.slim.no-external"

import { trackInteractions } from "./analytics-interactions.js"

export function startAnalytics() {
  posthog.init("phc_mVacbe8Xydu0UZlh4bNw5EGisvzyRcpqXEEuEEp5lOY", {
    api_host: "https://eu.i.posthog.com",
    defaults: "2025-11-30",
    cookieless_mode: "always",
    person_profiles: "never",
    autocapture: false,
    __extensionClasses: { ...ErrorTrackingExtensions },
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    capture_performance: false,
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
    loaded: trackInteractions,
    capture_pageview: true,
    capture_pageleave: true,
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_flags: true,
    disable_external_dependency_loading: true,
  })
}
