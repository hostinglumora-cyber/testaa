import React from "react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export default function Logo({ size = 30, className, withText = true, textClass = "" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <span
        className="relative grid place-items-center rounded-[10px] shrink-0 overflow-hidden"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, hsl(160 70% 45%), hsl(165 75% 36%))",
          boxShadow: "0 2px 10px -2px hsl(160 70% 42% / 0.4)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: size * 0.58, height: size * 0.58 }}
        >
          <path d="M6 18h12" />
          <path d="M8.5 18v-1.2a3.5 3.5 0 013.5-3.5 3.5 3.5 0 013.5 3.5V18" />
          <path d="M12 6.5v3" />
          <path d="M5.5 10.5l1.1 1.1" />
          <path d="M18.5 10.5l-1.1 1.1" />
        </svg>
      </span>
      {withText && (
        <span className={cn("font-bold tracking-tight text-foreground", textClass)}>
          {BRAND.name}
        </span>
      )}
    </span>
  );
}