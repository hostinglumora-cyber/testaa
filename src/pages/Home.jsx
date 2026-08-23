const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Store, ShieldCheck, BadgeCheck, TrendingUp, Package, Heart } from "lucide-react";

import SiteNav from "@/components/SiteNav";
import { DEPARTMENTS } from "@/lib/departments";
import { Image } from "@/components/ui/image";
import Logo from "@/components/Logo";
import { BRAND } from "@/lib/brand";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.Listing.filter({ status: "active" }, "-created_date", 6)
      .then(setListings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[15%] w-[600px] h-[400px] bg-primary/[0.07] rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(160_70%_42%/0.05),transparent_55%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Scam-protected marketplace
                </span>
                <Link to="/status" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-muted-foreground text-xs hover:text-foreground transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> All systems operational
                </Link>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-5">
                The trusted marketplace for{" "}
                <span className="text-primary">ER:LC</span> creators.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                Liveries, uniforms, ELS, and map templates from verified Liberty County developers. Every transaction secured, every creator vetted.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/marketplace" className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-primary-foreground font-semibold px-6 py-3 rounded-xl transition text-base">
                  Browse Marketplace <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/sell" className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/70 border border-border text-foreground font-medium px-6 py-3 rounded-xl transition text-base">
                  Start Selling
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> Scam-protected</span>
                <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-primary" /> Verified sellers</span>
                <span className="flex items-center gap-1.5"><Package className="w-4 h-4 text-primary" /> Instant delivery</span>
              </div>
            </div>

            {/* Right: marketplace preview */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-medium text-muted-foreground">Featured today</span>
                  <span className="text-xs text-primary font-medium">Live</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="aspect-[4/3] rounded-lg bg-secondary animate-pulse" />
                    ))
                  ) : listings.slice(0, 4).map((l) => (
                    <PreviewCard key={l.id} listing={l} />
                  ))}
                  {!loading && listings.length === 0 && (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="aspect-[4/3] rounded-lg bg-secondary/50 grid place-items-center">
                        <Store className="w-6 h-6 text-muted-foreground/30" />
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="absolute -bottom-3 -left-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-xl hidden sm:flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/15 grid place-items-center"><TrendingUp className="w-3.5 h-3.5 text-primary" /></div>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-none">New listings</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">every day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary text-sm font-medium mb-1.5">Departments</p>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Shop by department</h2>
          </div>
          <Link to="/marketplace" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {DEPARTMENTS.map((d) => (
            <Link
              key={d.id}
              to={`/marketplace?dept=${d.id}`}
              className="group rounded-xl bg-card border border-border p-5 hover:border-primary/40 transition"
            >
              <div className="w-14 h-14 mb-4 rounded-lg overflow-hidden bg-secondary/50 ring-1 ring-border grid place-items-center">
                <Image src={d.logo} alt={d.name} fittingType="contain" className="w-full h-full object-contain p-1.5 mix-blend-screen" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 text-sm">{d.name}</h3>
              <p className="text-xs text-muted-foreground leading-snug mb-3">{d.blurb}</p>
              <span className="inline-flex items-center gap-1 text-xs text-primary group-hover:gap-2 transition-all">
                Browse <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 border-t border-border">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary text-sm font-medium mb-1.5">Fresh drops</p>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Latest listings</h2>
          </div>
          <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
            All listings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="aspect-[4/3] bg-secondary animate-pulse" />
                  <div className="p-4 space-y-2"><div className="h-4 bg-secondary rounded w-2/3 animate-pulse" /><div className="h-3 bg-secondary rounded w-1/3 animate-pulse" /></div>
                </div>
              ))
            : listings.length === 0
            ? <div className="col-span-full rounded-xl border border-border bg-card py-16 text-center">
                <Store className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No listings yet — be the first to sell.</p>
                <Link to="/sell" className="inline-flex items-center gap-1.5 mt-4 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg text-sm">Create a listing <ArrowRight className="w-3.5 h-3.5" /></Link>
              </div>
            : listings.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { v: "4", l: "Departments" },
            { v: "10", l: "Photos per listing" },
            { v: "100%", l: "Scam-protected" },
            { v: "0%", l: "Listing fees" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-card border border-border p-6">
              <div className="text-3xl lg:text-4xl font-bold text-foreground">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 pb-24">
        <div className="relative rounded-2xl overflow-hidden bg-card border border-primary/20 p-10 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(160_70%_42%/0.08),transparent_70%)]" />
          <div className="relative text-center">
            <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-3">Ready to list your assets?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-7">Create a listing in minutes. Free or paid in Robux — your choice.</p>
            <Link to="/sell" className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-primary-foreground font-semibold px-7 py-3.5 rounded-xl transition">
              Create your first listing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PreviewCard({ listing }) {
  const cover = listing.images?.[0];
  const isFree = listing.price_type === "Free";
  return (
    <Link to={`/listing/${listing.id}`} className="group block rounded-lg overflow-hidden bg-secondary/40 border border-border hover:border-primary/30 transition">
      <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
        {cover ? <Image src={cover} fittingType="fill" className="w-full h-full group-hover:scale-105 transition duration-500" /> : <div className="w-full h-full grid place-items-center"><Store className="w-6 h-6 text-muted-foreground/30" /></div>}
        {isFree && <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground">FREE</span>}
      </div>
      <div className="p-2.5">
        <p className="text-xs font-medium text-foreground truncate">{listing.title}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{isFree ? "Free" : `${listing.price} R$`}</p>
      </div>
    </Link>
  );
}

export function ListingCard({ listing }) {
  const cover = listing.images?.[0];
  const isFree = listing.price_type === "Free";
  const priceLabel = isFree ? "Free" : `${listing.price} R$`;
  return (
    <Link to={`/listing/${listing.id}`} className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition">
      <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
        {cover ? (
          <Image src={cover} alt={listing.title} fittingType="fill" className="w-full h-full group-hover:scale-105 transition duration-500" />
        ) : (
          <div className="w-full h-full grid place-items-center text-muted-foreground/30"><Store className="w-10 h-10" /></div>
        )}
        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-background/80 backdrop-blur text-[11px] font-medium text-foreground">{listing.category}</span>
        {isFree ? (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-primary text-primary-foreground text-[11px] font-bold">FREE</span>
        ) : (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-background/80 backdrop-blur text-[11px] font-bold text-foreground">{priceLabel}</span>
        )}
        <button onClick={(e) => { e.preventDefault(); }} className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-background/80 backdrop-blur grid place-items-center text-muted-foreground hover:text-primary transition opacity-0 group-hover:opacity-100">
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition">{listing.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
          by {listing.seller_name || "Anonymous"}
          {listing.featured && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}
        </p>
        {listing.departments?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {listing.departments.slice(0, 3).map((d) => (
              <span key={d} className="px-2 py-0.5 rounded text-[11px] bg-secondary border border-border text-muted-foreground">{d}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-2 lg:col-span-1">
          <div className="mb-3"><Logo size={28} textClass="text-base" /></div>
          <p className="text-sm text-muted-foreground max-w-xs">{BRAND.tagline}</p>
        </div>
        {[
          { h: "Product", links: [["Marketplace", "/marketplace"], ["Status", "/status"], ["Sell", "/sell"]] },
          { h: "Resources", links: [["Documentation", "/docs"], ["Privacy", "/privacy"], ["Terms", "/tos"]] },
          { h: "Account", links: [["Sign in", "/login"], ["Dashboard", "/dashboard"], ["Admin", "/admin"]] },
        ].map((col) => (
          <div key={col.h}>
            <h4 className="text-sm font-semibold text-foreground mb-3">{col.h}</h4>
            <ul className="space-y-2">
              {col.links.map(([l, to]) => (
                <li key={l}><Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BRAND.name}. Not affiliated with Roblox or ER:LC.
      </div>
    </footer>
  );
}