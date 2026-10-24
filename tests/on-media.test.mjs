import assert from "node:assert/strict"
import { test } from "node:test"

import { onMedia } from "../src/lib/on-media.ts"

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
