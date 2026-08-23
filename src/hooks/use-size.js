import * as React from "react"

// Measures the rendered size of an element via ResizeObserver.
// Returns `null` on the first (pre-measurement) render, then the measured
// `{ width, height }` once the layout effect has run (before paint).
export function useSize(ref) {
  const [size, setSize] = React.useState(null)

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])

  return size
}
