# Data Slot integration audit, 11 September 2026

Scope: the Fulldev UI registry source, its Data Slot contracts and documentation. Baseline: fulldev-ui 0.10.0, main bd18abbd, installed @data-slot packages 0.2.166. No dependency upgrade was available at the initial version check. This branch does not release the library or update installed VDA components.

Official source: [Data Slot packages and READMEs](https://github.com/bejamas/data-slot/tree/11809efab4b3b5f173b8e1906cc58c144585e3c7/packages). Checked all 17 behavior packages plus core against installed types/runtime and our component markup, state attributes, events and examples. Sheet and Sidebar compositions were included.

## Corrections

| Integration      | Result                                                                                                                                                                                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| navigation-menu  | Content, popup and viewport start with native `hidden`; JavaScript removes it on opening. Indicator consumes the documented position/width variables, starts with `data-state="hidden"`, and uses CSS visibility because the runtime does not manage its native `hidden`.                     |
| accordion        | Closed content starts hidden rather than flashing before initialization. Explicit `hidden={false}` remains available for authored server-rendered open content.                                                                                                                               |
| tabs             | Inactive content no longer flashes before initialization. The controller activates the default panel.                                                                                                                                                                                         |
| collapsible      | Existing markup/state contract retained; lifecycle corrected.                                                                                                                                                                                                                                 |
| dialog           | Lifecycle cleanup and consistent modal stack arithmetic.                                                                                                                                                                                                                                      |
| alert-dialog     | Same modal base as Dialog/Sheet; each stack level reserves separate overlay/content positions. Previously a Dialog opened above AlertDialog could still sit below it.                                                                                                                         |
| dropdown-menu    | Existing parts, selection and positioning contract retained; lifecycle corrected. See floating-layer limitation below.                                                                                                                                                                        |
| popover          | Existing contract retained; lifecycle corrected. See floating-layer limitation below.                                                                                                                                                                                                         |
| hover-card       | `open` now reaches the controlled JavaScript option through `data-controlled-open`, instead of writing an output-only attribute. `defaultOpen` remains uncontrolled. Controlled cards require `hover-card:set` to change state; pointer requests alone do not change it.                      |
| tooltip          | Existing parts and presence contract retained; lifecycle corrected. Sidebar composition fixed separately.                                                                                                                                                                                     |
| combobox         | Lifecycle cleanup and duplicate-binding guard. Empty messages beside ComboboxList now respond to the existing content `data-empty` CSS hook, as used in the first docs examples. Messages inside the list still use runtime-managed native visibility.                                        |
| command          | Lifecycle cleanup; existing filtering and inferred item values checked. Existing link handler retained.                                                                                                                                                                                       |
| select           | Lifecycle cleanup; initial/open/value attributes checked against runtime.                                                                                                                                                                                                                     |
| radio-group      | Existing form and state contract retained; explicit disabled=false no longer leaves a presence-only styling attribute in initial HTML.                                                                                                                                                        |
| slider           | String ranges such as `"20,80"` render two thumbs, matching the advertised API and runtime. Explicit disabled=false omitted from initial presence attributes.                                                                                                                                 |
| switch           | Checked thumb matches the initial checked root before JavaScript. False disabled/readonly styling attributes omitted.                                                                                                                                                                         |
| toggle           | Initial native disabled and aria-pressed match the supplied props before JavaScript.                                                                                                                                                                                                          |
| core / lifecycle | Small shared `src/lib/data-slot.ts` initializes new roots on `astro:page-load` and destroys retained controllers before a swap, releasing portals and scroll locks. Registry items include this helper; direct core imports declare their dependency. Dialog and Sheet share one initializer. |
| sheet            | Removed duplicated custom scroll-lock implementation. Native core reference counting handles nested Sheets and other modal components.                                                                                                                                                        |
| sidebar          | Preserved tooltip-trigger and dialog-content slots; stopped manually exposing tooltip content. Tooltips open only in desktop icon mode and close on expansion. Provider inline setup reruns on page navigation. Mobile state follows dialog:change, including Escape/overlay dismissal.       |

## Browser validation

Used app-managed cua_repl with the default Chrome profile. A temporary local fixture composed the existing documentation examples on two ClientRouter routes, plus string-range/default-state, controlled HoverCard, nested Sheet and Sidebar cases. The fixture was removed after validation.

- With script execution disabled, zero navigation content/popup/viewport, accordion panels or tab panels were displayed. Initial Toggle disabled/pressed and Switch thumb state were correct. Script execution was restored.
- Reproduced the original ClientRouter failure before the lifecycle fix. After the fix, navigation, accordion, collapsible, tabs, radio group, slider, switch and toggle responded after route changes.
- Checked combobox filtering, selection and visible empty results; command filtering; Select selection; AlertDialog cancellation; Dialog open/close; Popover and Dropdown open/Escape; Tooltip and HoverCard keyboard focus.
- Navigation indicator became visible with a measured width matching its trigger; menu content opened and closed on desktop and a 375x812 viewport.
- Nested Sheets used content z-index 101/103. Closing the inner retained the scroll lock; closing the outer restored it. Navigating while a Sheet was open also restored scrolling and removed open dialogs.
- Sidebar tooltip appeared in collapsed desktop icon mode. Mobile tooltip stayed closed; the mobile Sheet opened, closed with Escape and reopened on the next click after its exit animation. Temporary viewport override was cleared.
- Chrome extension control worked after the service restart. The former Sky native pipe startup error was not observed. Native `cua.getApp('com.google.Chrome')` instead returned `cgWindowNotFound`; native access is therefore not claimed as fully restored.

## Open findings / limits

1. **Floating content inside modals:** reproduced Popover positioner z-index 50 beneath a Sheet overlay at 100. Dropdown, Select, Combobox, Tooltip and HoverCard use the same lower floating tier. Correct ordering across nested portals needs a separate shared layering decision; this audit does not add a new layer manager or claim to fix that case.
2. **Astro transition:persist:** the lifecycle cleanup recreates controllers from defaults on a swap, including explicitly persisted roots. Ordinary ClientRouter navigation is supported; preserving interactive state with transition:persist is not established by this change.
3. This is a contract audit with focused browser regression checks, not an exhaustive accessibility/device certification. Full release checks and independent review results are recorded with the handoff.

## Final checks

- `pnpm build`: passed, 80 pages (including a final build after docs and registry regeneration).
- `pnpm check`: passed, 0 errors, 0 warnings, 3 existing unused-type/import hints.
- Official registry generation: `pnpm exec shadcn build` passed. This is the generator used by `registry:build`; formatting was scoped separately to preserve unrelated `public/share` files.
- Parsed registry verification: all 138 items generated; 409 embedded text files exactly match their source. Fifteen existing binary entries were excluded from the text comparison. Generated registry index matches registry.json.
- `git diff --check` and touched-file formatting passed.
- Independent read-only Astra review completed; concrete findings were corrected and affected behavior rechecked. The two open limitations above remain explicit.
