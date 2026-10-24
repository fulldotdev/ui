import assert from "node:assert/strict"
import { test } from "node:test"

const { onMedia } = await import(
  new URL("../src/lib/on-media.ts", import.meta.url)
)

test("media loading cancels stale imports and recreates on return", async () => {
  const media = new EventTarget()
  media.matches = false
  const previous = globalThis.window
  globalThis.window = { matchMedia: () => media }
  let loads = 0
  let mounts = 0
  let destroys = 0
  const resolve = []
  const dispose = onMedia(
    "test",
    () => {
      loads++
      return new Promise((done) => resolve.push(done))
    },
    () => {
      mounts++
      return () => destroys++
    }
  )
  const change = (matches) => {
    media.matches = matches
    media.dispatchEvent(new Event("change"))
  }
  try {
    assert.equal(loads, 0)
    change(true)
    change(false)
    resolve.shift()({})
    await Promise.resolve()
    assert.equal(mounts, 0)
    change(true)
    resolve.shift()({})
    await Promise.resolve()
    assert.equal(mounts, 1)
    change(false)
    assert.equal(destroys, 1)
    change(true)
    resolve.shift()({})
    await Promise.resolve()
    assert.equal(mounts, 2)
    dispose()
    assert.equal(destroys, 2)
    change(true)
    assert.equal(loads, 3)
  } finally {
    dispose()
    globalThis.window = previous
  }
})

test("disposing during import prevents a later mount", async () => {
  const previous = globalThis.window
  const media = new EventTarget()
  media.matches = true
  globalThis.window = { matchMedia: () => media }
  let done
  let mounts = 0
  const dispose = onMedia(
    "all",
    () =>
      new Promise((resolve) => {
        done = resolve
      }),
    () => {
      mounts++
      return () => {}
    }
  )
  dispose()
  done({})
  await Promise.resolve()
  assert.equal(mounts, 0)
  globalThis.window = previous
})

for (const stale of [false, true])
  for (const action of ["click", "request"])
    test(`retains ${action} before the media change event arrives, stale=${stale}`, async () => {
      const previous = {
        window: globalThis.window,
        Element: globalThis.Element,
        MouseEvent: globalThis.MouseEvent,
      }
      class Element extends EventTarget {
        isConnected = true
        closest() {
          return this
        }
        contains(target) {
          return target === this
        }
      }
      const media = new EventTarget()
      media.matches = false
      let current = false
      let reads = 0
      globalThis.window = {
        matchMedia: () => (stale && reads++ > 0 ? { matches: current } : media),
      }
      globalThis.Element = Element
      globalThis.MouseEvent = Event
      const root = new Element()
      const received = []
      const event = action === "click" ? "click" : "dialog:set"
      const receive = (event) => received.push(event.detail?.open ?? "click")
      const dispose = onMedia(
        "mobile",
        async () => ({}),
        () => {
          root.addEventListener(event, receive)
          return () => root.removeEventListener(event, receive)
        },
        { root, selector: "button", event: "dialog:set" }
      )
      try {
        current = true
        if (!stale) media.matches = true
        root.dispatchEvent(
          action === "click"
            ? new Event("click", { cancelable: true })
            : new CustomEvent("dialog:set", { detail: { open: true } })
        )
        assert.deepEqual(received, [])
        media.matches = true
        media.dispatchEvent(new Event("change"))
        await Promise.resolve()
        assert.deepEqual(received, [action === "click" ? "click" : true])
        current = media.matches = false
        media.dispatchEvent(new Event("change"))
        current = media.matches = true
        media.dispatchEvent(new Event("change"))
        await Promise.resolve()
        assert.equal(received.length, 1)
      } finally {
        dispose()
        Object.assign(globalThis, previous)
      }
    })

for (const action of ["click", "request"])
  for (const observer of ["import", "click", "request"])
    test(`discards ${action} when ${observer} observes exit before its notification`, async () => {
      const previous = {
        window: globalThis.window,
        Element: globalThis.Element,
        MouseEvent: globalThis.MouseEvent,
      }
      class Element extends EventTarget {
        isConnected = true
        closest() {
          return this
        }
        contains(target) {
          return target === this
        }
      }
      const media = new EventTarget()
      media.matches = true
      let current = true
      let reads = 0
      globalThis.window = {
        matchMedia: () => (reads++ === 0 ? media : { matches: current }),
      }
      globalThis.Element = Element
      globalThis.MouseEvent = Event
      const root = new Element()
      const received = []
      const resolves = []
      let mounts = 0
      const event = action === "click" ? "click" : "dialog:set"
      const receive = (event) => received.push(event.detail?.open ?? "click")
      const activate = () =>
        root.dispatchEvent(
          action === "click"
            ? new Event("click", { cancelable: true })
            : new CustomEvent("dialog:set", { detail: { open: true } })
        )
      const dispose = onMedia(
        "mobile",
        () => new Promise((done) => resolves.push(done)),
        () => {
          mounts++
          root.addEventListener(event, receive)
          return () => root.removeEventListener(event, receive)
        },
        { root, selector: "button", event: "dialog:set" }
      )
      try {
        activate()
        current = false
        if (observer === "import") {
          resolves.shift()({})
          await Promise.resolve()
        } else {
          root.dispatchEvent(
            observer === "click"
              ? new Event("click", { cancelable: true })
              : new CustomEvent("dialog:set", { detail: { open: false } })
          )
        }
        assert.equal(mounts, 0)
        assert.deepEqual(received, [])
        current = true
        media.dispatchEvent(new Event("change"))
        if (observer !== "import") {
          resolves.shift()({})
          await Promise.resolve()
          assert.equal(mounts, 0)
        }
        resolves.shift()({})
        await Promise.resolve()
        assert.equal(mounts, 1)
        assert.deepEqual(received, [])
        activate()
        assert.deepEqual(received, [action === "click" ? "click" : true])
      } finally {
        dispose()
        Object.assign(globalThis, previous)
      }
    })
