import React from "react";
import { BRAND, BRAND_LOGO_URL } from "@/lib/brand";
import { cn } from "@/lib/utils";

export default function Logo({ size = 30, className, withText = true, textClass = "" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <img
        src={BRAND_LOGO_URL}
        alt={`${BRAND.name} logo`}
        loading="eager"
        decoding="async"
        style={{
          width: size,
          height: size,
          boxShadow: "0 0 0 1px hsl(var(--primary) / 0.3), 0 0 20px -4px hsl(var(--primary) / 0.55)",
        }}
        className="rounded-full shrink-0"
      />
      {withText && (
        <span className={cn("font-display font-bold tracking-tight text-foreground", textClass)}>
          {BRAND.name}
        </span>
      )}
    </span>
  );
}
