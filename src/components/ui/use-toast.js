import { toast as sonnerToast } from "sonner"

// Compatibility shim for the legacy shadcn `use-toast` API (`toast({ title, description })`)
// backed by Sonner, which is what renders the toasts in this app.
export function toast({ title, description, ...opts }) {
  return sonnerToast(title, { description, ...opts })
}
