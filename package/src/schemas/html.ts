interface DOMAttributes {
  // Clipboard Events
  oncopy?: string | undefined | null
  oncut?: string | undefined | null
  onpaste?: string | undefined | null

  // Composition Events
  oncompositionend?: string | undefined | null
  oncompositionstart?: string | undefined | null
  oncompositionupdate?: string | undefined | null

  // Focus Events
  onfocus?: string | undefined | null
  onfocusin?: string | undefined | null
  onfocusout?: string | undefined | null
  onblur?: string | undefined | null

  // Form Events
  onchange?: string | undefined | null
  oninput?: string | undefined | null
  onreset?: string | undefined | null
  onsubmit?: string | undefined | null
  oninvalid?: string | undefined | null
  onbeforeinput?: string | undefined | null

  // Image Events
  onload?: string | undefined | null
  onerror?: string | undefined | null // also a Media Event

  // Detail Events
  ontoggle?: string | undefined | null

  // Keyboard Events
  onkeydown?: string | undefined | null
  onkeypress?: string | undefined | null
  onkeyup?: string | undefined | null

  // Media Events
  onabort?: string | undefined | null
  oncanplay?: string | undefined | null
  oncanplaythrough?: string | undefined | null
  oncuechange?: string | undefined | null
  ondurationchange?: string | undefined | null
  onemptied?: string | undefined | null
  onencrypted?: string | undefined | null
  onended?: string | undefined | null
  onloadeddata?: string | undefined | null
  onloadedmetadata?: string | undefined | null
  onloadstart?: string | undefined | null
  onpause?: string | undefined | null
  onplay?: string | undefined | null
  onplaying?: string | undefined | null
  onprogress?: string | undefined | null
  onratechange?: string | undefined | null
  onseeked?: string | undefined | null
  onseeking?: string | undefined | null
  onstalled?: string | undefined | null
  onsuspend?: string | undefined | null
  ontimeupdate?: string | undefined | null
  onvolumechange?: string | undefined | null
  onwaiting?: string | undefined | null

  // MouseEvents
  onauxclick?: string | undefined | null
  onclick?: string | undefined | null
  oncontextmenu?: string | undefined | null
  ondblclick?: string | undefined | null
  ondrag?: string | undefined | null
  ondragend?: string | undefined | null
  ondragenter?: string | undefined | null
  ondragexit?: string | undefined | null
  ondragleave?: string | undefined | null
  ondragover?: string | undefined | null
  ondragstart?: string | undefined | null
  ondrop?: string | undefined | null
  onmousedown?: string | undefined | null
  onmouseenter?: string | undefined | null
  onmouseleave?: string | undefined | null
  onmousemove?: string | undefined | null
  onmouseout?: string | undefined | null
  onmouseover?: string | undefined | null
  onmouseup?: string | undefined | null

  // Selection Events
  onselect?: string | undefined | null
  onselectionchange?: string | undefined | null
  onselectstart?: string | undefined | null

  // Touch Events
  ontouchcancel?: string | undefined | null
  ontouchend?: string | undefined | null
  ontouchmove?: string | undefined | null
  ontouchstart?: string | undefined | null

  // Pointer Events
  ongotpointercapture?: string | undefined | null
  onpointercancel?: string | undefined | null
  onpointerdown?: string | undefined | null
  onpointerenter?: string | undefined | null
  onpointerleave?: string | undefined | null
  onpointermove?: string | undefined | null
  onpointerout?: string | undefined | null
  onpointerover?: string | undefined | null
  onpointerup?: string | undefined | null
  onlostpointercapture?: string | undefined | null

  // UI Events
  onscroll?: string | undefined | null
  onresize?: string | undefined | null

  // Wheel Events
  onwheel?: string | undefined | null

  // Animation Events
  onanimationstart?: string | undefined | null
  onanimationend?: string | undefined | null
  onanimationiteration?: string | undefined | null

  // Transition Events
  ontransitionstart?: string | undefined | null
  ontransitionrun?: string | undefined | null
  ontransitionend?: string | undefined | null
  ontransitioncancel?: string | undefined | null

  // Message Events
  onmessage?: string | undefined | null
  onmessageerror?: string | undefined | null

  // Global Events
  oncancel?: string | undefined | null
  onclose?: string | undefined | null
  onfullscreenchange?: string | undefined | null
  onfullscreenerror?: string | undefined | null
}

interface HTMLAttributes extends DOMAttributes {
  // Standard HTML Attributes
  accesskey?: string | undefined | null
  autocapitalize?: string | undefined | null
  autofocus?: boolean | string | undefined | null
  class?: string | undefined | null
  contenteditable?:
    | 'true'
    | 'false'
    | boolean
    | 'inherit'
    | string
    | undefined
    | null
  dir?: string | undefined | null
  draggable?: 'true' | 'false' | boolean | undefined | null
  enterkeyhint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
    | undefined
    | null
  exportparts?: string | undefined | null
  hidden?: boolean | string | undefined | null
  id?: string | undefined | null
  inert?: boolean | string | undefined | null
  inputmode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined
    | null
  is?: string | undefined | null

  // Microdata API
  itemid?: string | undefined | null
  itemprop?: string | undefined | null
  itemref?: string | undefined | null
  itemscope?: boolean | string | undefined | null
  itemtype?: string | undefined | null

  lang?: string | undefined | null
  part?: string | undefined | null
  popover?: boolean | string | undefined | null
  slot?: string | undefined | null
  spellcheck?: 'true' | 'false' | boolean | undefined | null
  style?: string | undefined | null
  tabindex?: number | string | undefined | null
  title?: string | undefined | null
  translate?: 'yes' | 'no' | '' | undefined | null

  // <command>, <menuitem>
  radiogroup?: string | undefined | null

  // RDFa Attributes
  about?: string | undefined | null
  datatype?: string | undefined | null
  inlist?: any
  prefix?: string | undefined | null
  property?: string | undefined | null
  resource?: string | undefined | null
  typeof?: string | undefined | null
  vocab?: string | undefined | null

  // Non-standard Attributes
  contextmenu?: string | undefined | null // Obsolete
  autosave?: string | undefined | null // Apple exclusive
  color?: string | undefined | null
  results?: number | string | undefined | null
  security?: string | undefined | null
  unselectable?: 'on' | 'off' | undefined | null // Internet Explorer
}

type HTMLAttributeReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url'

type HTMLAttributeAnchorTarget =
  | '_self'
  | '_blank'
  | '_parent'
  | '_top'
  | (string & {})

interface AnchorHTMLAttributes extends HTMLAttributes {
  download?: string | boolean | undefined | null
  href?: string | URL | undefined | null
  hreflang?: string | undefined | null
  media?: string | undefined | null
  ping?: string | undefined | null
  rel?: string | undefined | null
  target?: HTMLAttributeAnchorTarget | undefined | null
  type?: string | undefined | null
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined | null
}

interface AudioHTMLAttributes extends MediaHTMLAttributes {}

interface AreaHTMLAttributes extends HTMLAttributes {
  alt?: string | undefined | null
  coords?: string | undefined | null
  download?: any
  href?: string | undefined | null
  hreflang?: string | undefined | null
  media?: string | undefined | null
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined | null
  rel?: string | undefined | null
  shape?: string | undefined | null
  target?: string | undefined | null
}

interface BaseHTMLAttributes extends HTMLAttributes {
  href?: string | undefined | null
  target?: string | undefined | null
}

interface BlockquoteHTMLAttributes extends HTMLAttributes {
  cite?: string | undefined | null
}

interface ButtonHTMLAttributes extends HTMLAttributes {
  autocomplete?: string | undefined | null
  disabled?: boolean | string | undefined | null
  form?: string | undefined | null
  formaction?: string | undefined | null
  formenctype?: string | undefined | null
  formmethod?: string | undefined | null
  formnovalidate?: boolean | string | undefined | null
  formtarget?: string | undefined | null
  name?: string | undefined | null
  type?: 'submit' | 'reset' | 'button' | undefined | null
  value?: string | string[] | number | undefined | null
  popovertarget?: string | undefined | null
}

interface CanvasHTMLAttributes extends HTMLAttributes {
  height?: number | string | undefined | null
  width?: number | string | undefined | null
}

interface ColHTMLAttributes extends HTMLAttributes {
  span?: number | string | undefined | null
  width?: number | string | undefined | null
}

interface ColgroupHTMLAttributes extends HTMLAttributes {
  span?: number | string | undefined | null
}

interface DataHTMLAttributes extends HTMLAttributes {
  value?: string | string[] | number | undefined | null
}

interface DetailsHTMLAttributes extends HTMLAttributes {
  open?: boolean | string | undefined | null
  name?: string | undefined | null
}

interface DelHTMLAttributes extends HTMLAttributes {
  cite?: string | undefined | null
  datetime?: string | undefined | null
}

interface DialogHTMLAttributes extends HTMLAttributes {
  open?: boolean | string | undefined | null
}

interface EmbedHTMLAttributes extends HTMLAttributes {
  height?: number | string | undefined | null
  src?: string | undefined | null
  type?: string | undefined | null
  width?: number | string | undefined | null
}

interface FieldsetHTMLAttributes extends HTMLAttributes {
  disabled?: boolean | string | undefined | null
  form?: string | undefined | null
  name?: string | undefined | null
}

interface FormHTMLAttributes extends HTMLAttributes {
  'accept-charset'?: string | undefined | null
  action?: string | undefined | null
  autocomplete?: string | undefined | null
  autocorrect?: string | undefined | null
  enctype?: string | undefined | null
  method?: string | undefined | null
  name?: string | undefined | null
  novalidate?: boolean | string | undefined | null
  target?: string | undefined | null
}

interface HtmlHTMLAttributes extends HTMLAttributes {
  manifest?: string | undefined | null
}

interface IframeHTMLAttributes extends HTMLAttributes {
  allow?: string | undefined | null
  allowfullscreen?: boolean | string | undefined | null
  allowtransparency?: boolean | string | undefined | null
  fetchpriority?: 'auto' | 'high' | 'low' | undefined | null
  /** @deprecated */
  frameborder?: number | string | undefined | null
  height?: number | string | undefined | null
  loading?: 'eager' | 'lazy' | undefined | null
  /** @deprecated */
  marginheight?: number | string | undefined | null
  /** @deprecated */
  marginwidth?: number | string | undefined | null
  name?: string | undefined | null
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined | null
  sandbox?: string | undefined | null
  /** @deprecated */
  scrolling?: string | undefined | null
  seamless?: boolean | string | undefined | null
  src?: string | undefined | null
  srcdoc?: string | undefined | null
  width?: number | string | undefined | null
}

interface ImgHTMLAttributes extends HTMLAttributes {
  alt?: string | undefined | null
  crossorigin?: 'anonymous' | 'use-credentials' | '' | undefined | null
  decoding?: 'async' | 'auto' | 'sync' | undefined | null
  fetchpriority?: 'auto' | 'high' | 'low' | undefined | null
  height?: number | string | undefined | null
  loading?: 'eager' | 'lazy' | undefined | null
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined | null
  sizes?: string | undefined | null
  src?: string | undefined | null
  srcset?: string | undefined | null
  usemap?: string | undefined | null
  width?: number | string | undefined | null
}

interface InsHTMLAttributes extends HTMLAttributes {
  cite?: string | undefined | null
  datetime?: string | undefined | null
}

type HTMLInputTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

interface InputHTMLAttributes extends HTMLAttributes {
  accept?: string | undefined | null
  alt?: string | undefined | null
  autocomplete?: string | undefined | null
  autocorrect?: string | undefined | null
  capture?: boolean | string | undefined | null
  checked?: boolean | string | undefined | null
  crossorigin?: string | undefined | null
  dirname?: string | undefined | null
  disabled?: boolean | string | undefined | null
  form?: string | undefined | null
  formaction?: string | undefined | null
  formenctype?: string | undefined | null
  formmethod?: string | undefined | null
  formnovalidate?: boolean | string | undefined | null
  formtarget?: string | undefined | null
  height?: number | string | undefined | null
  list?: string | undefined | null
  max?: number | string | undefined | null
  maxlength?: number | string | undefined | null
  min?: number | string | undefined | null
  minlength?: number | string | undefined | null
  multiple?: boolean | string | undefined | null
  name?: string | undefined | null
  pattern?: string | undefined | null
  placeholder?: string | undefined | null
  readonly?: boolean | string | undefined | null
  required?: boolean | string | undefined | null
  size?: number | string | undefined | null
  src?: string | undefined | null
  step?: number | string | undefined | null
  type?: HTMLInputTypeAttribute | undefined | null
  value?: string | string[] | number | undefined | null
  width?: number | string | undefined | null
  popovertarget?: string | undefined | null
}

interface KeygenHTMLAttributes extends HTMLAttributes {
  challenge?: string | undefined | null
  disabled?: boolean | string | undefined | null
  form?: string | undefined | null
  keytype?: string | undefined | null
  keyparams?: string | undefined | null
  name?: string | undefined | null
}

interface LabelHTMLAttributes extends HTMLAttributes {
  form?: string | undefined | null
  for?: string | undefined | null
}

interface LiHTMLAttributes extends HTMLAttributes {
  value?: string | number | undefined | null
}

interface LinkHTMLAttributes extends HTMLAttributes {
  as?: string | undefined | null
  crossorigin?: boolean | string | undefined | null
  href?: string | URL | undefined | null
  hreflang?: string | undefined | null
  fetchpriority?: 'auto' | 'high' | 'low' | undefined | null
  integrity?: string | undefined | null
  media?: string | undefined | null
  imagesrcset?: string | undefined | null
  imagesizes?: string | undefined | null
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined | null
  rel?: string | undefined | null
  sizes?: string | undefined | null
  type?: string | undefined | null
  charset?: string | undefined | null
}

interface MapHTMLAttributes extends HTMLAttributes {
  name?: string | undefined | null
}

interface MenuHTMLAttributes extends HTMLAttributes {
  type?: string | undefined | null
}

interface MediaHTMLAttributes extends HTMLAttributes {
  autoplay?: boolean | string | undefined | null
  controls?: boolean | string | undefined | null
  controlslist?: string | undefined | null
  crossorigin?: string | undefined | null
  loop?: boolean | string | undefined | null
  mediagroup?: string | undefined | null
  muted?: boolean | string | undefined | null
  playsinline?: boolean | string | undefined | null
  preload?: string | undefined | null
  src?: string | undefined | null
}

interface MetaHTMLAttributes extends HTMLAttributes {
  charset?: string | undefined | null
  content?: string | URL | undefined | null
  'http-equiv'?: string | undefined | null
  name?: string | undefined | null
  media?: string | undefined | null
}

interface MeterHTMLAttributes extends HTMLAttributes {
  form?: string | undefined | null
  high?: number | string | undefined | null
  low?: number | string | undefined | null
  max?: number | string | undefined | null
  min?: number | string | undefined | null
  optimum?: number | string | undefined | null
  value?: string | string[] | number | undefined | null
}

interface QuoteHTMLAttributes extends HTMLAttributes {
  cite?: string | undefined | null
}

interface ObjectHTMLAttributes extends HTMLAttributes {
  classid?: string | undefined | null
  data?: string | undefined | null
  form?: string | undefined | null
  height?: number | string | undefined | null
  name?: string | undefined | null
  type?: string | undefined | null
  usemap?: string | undefined | null
  width?: number | string | undefined | null
  wmode?: string | undefined | null
}

interface OlHTMLAttributes extends HTMLAttributes {
  reversed?: boolean | string | undefined | null
  start?: number | string | undefined | null
  type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined | null
}

interface OptgroupHTMLAttributes extends HTMLAttributes {
  disabled?: boolean | string | undefined | null
  label?: string | undefined | null
}

interface OptionHTMLAttributes extends HTMLAttributes {
  disabled?: boolean | string | undefined | null
  label?: string | undefined | null
  selected?: boolean | string | undefined | null
  value?: string | string[] | number | undefined | null
}

interface OutputHTMLAttributes extends HTMLAttributes {
  form?: string | undefined | null
  for?: string | undefined | null
  name?: string | undefined | null
}

interface ParamHTMLAttributes extends HTMLAttributes {
  name?: string | undefined | null
  value?: string | string[] | number | undefined | null
}

interface ProgressHTMLAttributes extends HTMLAttributes {
  max?: number | string | undefined | null
  value?: string | string[] | number | undefined | null
}

interface SlotHTMLAttributes extends HTMLAttributes {
  name?: string | undefined | null
}

interface ScriptHTMLAttributes extends HTMLAttributes {
  async?: boolean | string | undefined | null
  charset?: string | undefined | null
  crossorigin?: string | undefined | null
  defer?: boolean | string | undefined | null
  fetchpriority?: 'auto' | 'high' | 'low' | undefined | null
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined | null
  integrity?: string | undefined | null
  nomodule?: boolean | string | undefined | null
  nonce?: string | undefined | null
  src?: string | undefined | null
  type?: string | undefined | null
}

interface SelectHTMLAttributes extends HTMLAttributes {
  autocomplete?: string | undefined | null
  autocorrect?: string | undefined | null
  disabled?: boolean | string | undefined | null
  form?: string | undefined | null
  multiple?: boolean | string | undefined | null
  name?: string | undefined | null
  required?: boolean | string | undefined | null
  size?: number | string | undefined | null
  value?: string | string[] | number | undefined | null
}

interface SourceHTMLAttributes extends HTMLAttributes {
  height?: number | string | undefined | null
  media?: string | undefined | null
  sizes?: string | undefined | null
  src?: string | undefined | null
  srcset?: string | undefined | null
  type?: string | undefined | null
  width?: number | string | undefined | null
}

interface StyleHTMLAttributes extends HTMLAttributes {
  media?: string | undefined | null
  nonce?: string | undefined | null
  scoped?: boolean | string | undefined | null
  type?: string | undefined | null
}

interface TableHTMLAttributes extends HTMLAttributes {
  align?: 'left' | 'center' | 'right' | undefined | null
  bgcolor?: string | undefined | null
  border?: string | number | undefined | null
  cellpadding?: number | string | undefined | null
  cellspacing?: number | string | undefined | null
  frame?: boolean | 'false' | 'true' | undefined | null
  rules?: 'none' | 'groups' | 'rows' | 'columns' | 'all' | undefined | null
  summary?: string | undefined | null
  width?: number | string | undefined | null
}

interface TextareaHTMLAttributes extends HTMLAttributes {
  autocomplete?: string | undefined | null
  autocorrect?: string | undefined | null
  cols?: number | string | undefined | null
  dirname?: string | undefined | null
  disabled?: boolean | string | undefined | null
  form?: string | undefined | null
  maxlength?: number | string | undefined | null
  minlength?: number | string | undefined | null
  name?: string | undefined | null
  placeholder?: string | undefined | null
  readonly?: boolean | string | undefined | null
  required?: boolean | string | undefined | null
  rows?: number | string | undefined | null
  value?: string | string[] | number | undefined | null
  wrap?: string | undefined | null
}

interface TdHTMLAttributes extends HTMLAttributes {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined | null
  colspan?: number | string | undefined | null
  headers?: string | undefined | null
  rowspan?: number | string | undefined | null
  scope?: string | undefined | null
  abbr?: string | undefined | null
  valign?: 'top' | 'middle' | 'bottom' | 'baseline' | undefined | null
}

interface ThHTMLAttributes extends HTMLAttributes {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined | null
  colspan?: number | string | undefined | null
  headers?: string | undefined | null
  rowspan?: number | string | undefined | null
  scope?: string | undefined | null
  abbr?: string | undefined | null
}

interface TimeHTMLAttributes extends HTMLAttributes {
  datetime?: string | undefined | null
}

interface TrackHTMLAttributes extends HTMLAttributes {
  default?: boolean | string | undefined | null
  kind?: string | undefined | null
  label?: string | undefined | null
  src?: string | undefined | null
  srclang?: string | undefined | null
}

interface VideoHTMLAttributes extends MediaHTMLAttributes {
  height?: number | string | undefined | null
  playsinline?: boolean | string | undefined | null
  poster?: string | undefined | null
  width?: number | string | undefined | null
  disablepictureinpicture?: boolean | string | undefined | null
}

interface DefinedIntrinsicElements {
  a: AnchorHTMLAttributes
  abbr: HTMLAttributes
  address: HTMLAttributes
  area: AreaHTMLAttributes
  article: HTMLAttributes
  aside: HTMLAttributes
  audio: AudioHTMLAttributes
  b: HTMLAttributes
  base: BaseHTMLAttributes
  bdi: HTMLAttributes
  bdo: HTMLAttributes
  big: HTMLAttributes
  blockquote: BlockquoteHTMLAttributes
  body: HTMLAttributes
  br: HTMLAttributes
  button: ButtonHTMLAttributes
  canvas: CanvasHTMLAttributes
  caption: HTMLAttributes
  cite: HTMLAttributes
  code: HTMLAttributes
  col: ColHTMLAttributes
  colgroup: ColgroupHTMLAttributes
  data: DataHTMLAttributes
  datalist: HTMLAttributes
  dd: HTMLAttributes
  del: DelHTMLAttributes
  details: DetailsHTMLAttributes
  dfn: HTMLAttributes
  dialog: DialogHTMLAttributes
  div: HTMLAttributes
  dl: HTMLAttributes
  dt: HTMLAttributes
  em: HTMLAttributes
  embed: EmbedHTMLAttributes
  fieldset: FieldsetHTMLAttributes
  figcaption: HTMLAttributes
  figure: HTMLAttributes
  footer: HTMLAttributes
  form: FormHTMLAttributes
  h1: HTMLAttributes
  h2: HTMLAttributes
  h3: HTMLAttributes
  h4: HTMLAttributes
  h5: HTMLAttributes
  h6: HTMLAttributes
  head: HTMLAttributes
  header: HTMLAttributes
  hgroup: HTMLAttributes
  hr: HTMLAttributes
  html: HtmlHTMLAttributes
  i: HTMLAttributes
  iframe: IframeHTMLAttributes
  img: ImgHTMLAttributes
  input: InputHTMLAttributes
  ins: InsHTMLAttributes
  kbd: HTMLAttributes
  keygen: KeygenHTMLAttributes
  label: LabelHTMLAttributes
  legend: HTMLAttributes
  li: LiHTMLAttributes
  link: LinkHTMLAttributes
  main: HTMLAttributes
  map: MapHTMLAttributes
  mark: HTMLAttributes
  menu: MenuHTMLAttributes
  menuitem: HTMLAttributes
  meta: MetaHTMLAttributes
  meter: MeterHTMLAttributes
  nav: HTMLAttributes
  noindex: HTMLAttributes
  noscript: HTMLAttributes
  object: ObjectHTMLAttributes
  ol: OlHTMLAttributes
  optgroup: OptgroupHTMLAttributes
  option: OptionHTMLAttributes
  output: OutputHTMLAttributes
  p: HTMLAttributes
  param: ParamHTMLAttributes
  picture: HTMLAttributes
  pre: HTMLAttributes
  progress: ProgressHTMLAttributes
  q: QuoteHTMLAttributes
  rp: HTMLAttributes
  rt: HTMLAttributes
  ruby: HTMLAttributes
  s: HTMLAttributes
  samp: HTMLAttributes
  slot: SlotHTMLAttributes
  script: ScriptHTMLAttributes
  section: HTMLAttributes
  select: SelectHTMLAttributes
  small: HTMLAttributes
  source: SourceHTMLAttributes
  span: HTMLAttributes
  strong: HTMLAttributes
  style: StyleHTMLAttributes
  sub: HTMLAttributes
  summary: HTMLAttributes
  sup: HTMLAttributes
  table: TableHTMLAttributes
  tbody: HTMLAttributes
  td: TdHTMLAttributes
  textarea: TextareaHTMLAttributes
  tfoot: HTMLAttributes
  th: ThHTMLAttributes
  thead: HTMLAttributes
  time: TimeHTMLAttributes
  title: HTMLAttributes
  tr: HTMLAttributes
  track: TrackHTMLAttributes
  u: HTMLAttributes
  ul: HTMLAttributes
  var: HTMLAttributes
  video: VideoHTMLAttributes
  wbr: HTMLAttributes
}
