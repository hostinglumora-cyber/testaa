const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from "react";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { safeReturnTo } from "@/lib/authReturnTo";
import { BRAND } from "@/lib/brand";

export default function Login() {
  const [redirecting, setRedirecting] = useState(false);
  const returnTo = safeReturnTo();

  const handleSignIn = () => {
    setRedirecting(true);
    db.auth.redirectToLogin(returnTo);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-primary/10 blur-[150px]" />

      <div className="relative w-full max-w-md text-center">
        <div className="inline-flex flex-col items-center">
          <img
            src="https://media.base44.com/images/public/6a8ac9d8de32e5eaaaddbfe8/14bd5696a_image.png"
            alt={`${BRAND.name} logo`}
            width={64}
            height={64}
            className="rounded-full mb-7"
            style={{ boxShadow: "0 0 0 1px hsl(var(--primary)/0.3), 0 0 36px -6px hsl(var(--primary)/0.6)" }}
          />
        </div>
        <p className="label-mono text-primary mb-3">Secure access</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-glow">
          Sign in to {BRAND.name}
        </h1>
        <p className="text-muted-foreground mt-3 mb-9 leading-relaxed max-w-sm mx-auto">
          Continue to your account through our secure platform sign-in. Your marketplace data, listings, and orders are waiting.
        </p>

        <button
          onClick={handleSignIn}
          disabled={redirecting}
          className="group w-full inline-flex items-center justify-center gap-2 bg-primary hover:opacity-90 text-primary-foreground font-semibold px-6 py-3.5 rounded-xl transition text-base glow-primary disabled:opacity-70"
        >
          {redirecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Redirecting…
            </>
          ) : (
            <>
              Continue to sign in
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 mt-8 text-xs text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          Scam-protected · Verified sellers · Instant delivery
        </div>
      </div>
    </div>
  );
}
