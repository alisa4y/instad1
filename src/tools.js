import { each } from "js-tools"
import { createSignal, onMount } from "solid-js"

export function Signal(o) {
  const p = new Proxy(
    {},
    {
      get(t, p) {
        return t[p]()
      },
      set(t, p, v) {
        if (t[p] === undefined) {
          let handlers = createSignal(v)
          t[p] = handlers[0]
          t["_" + p] = handlers[1]
        } else t["_" + p](v)
        return true
      },
    }
  )
  o && each(o, (v, k) => (p[k] = v))
  return p
}
export function onM(fn) {
  onMount(() => {
    setTimeout(fn)
  })
}
