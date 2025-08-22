"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const packages = [
  {
    id: "single",
    name: "60 mins Session",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE ?? "",
    blurb: "One 60-min session one on one coaching.",
  },
  {
    id: "pack5",
    name: "90 mins sessions",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PACKAGE5 ?? "",
    blurb: "One 90-min session one on one coaching.",
  },
  {
    id: "pack10",
    name: "2 hours session",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PACKAGE10 ?? "",
    blurb: "Two hour session one on one coaching..",
  },
];

export default function Page() {
  const [selected, setSelected] = useState(packages[0]);
  const [loading, setLoading] = useState(false);

  async function checkout() {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: selected.priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error || "Unable to start checkout");
    } catch (e) {
      console.error(e);
      alert("Something went wrong starting checkout.");
    } finally { setLoading(false); }
  }

  return (
    <main className="space-y-12">
      {/* Hero Section with Logo */}
      <section className="flex flex-col items-center text-center space-y-4">
        <Image
          src="/logo.png" // place your BrazenLife Coaching logo in /public/logo.png
          alt="BrazenLife Coaching Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
        <h1 className="text-4xl font-bold tracking-tight">BrazenLife Coaching</h1>
        <p className="text-lg text-neutral-600 max-w-xl">
          Live boldly. Transform deeply. Book a coaching session today and start your journey.
        </p>
      </section>

      {/* Packages */}
      <section className="grid gap-6 md:grid-cols-3">
        {packages.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`rounded-2xl border p-6 text-left shadow-md transition hover:shadow-lg ${
              selected.id === p.id ? "border-black bg-neutral-50" : "border-neutral-200 bg-white"
            }`}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="text-xl font-semibold">{p.name}</div>
                <div className="text-sm text-neutral-600 mt-2">{p.blurb}</div>
              </div>
              <div className="mt-4 flex justify-end">
                <div className={`h-5 w-5 rounded-full border ${selected.id === p.id ? "bg-black" : "bg-white"}`} />
              </div>
            </div>
          </button>
        ))}
      </section>

      {/* Checkout button */}
      <div className="flex justify-center">
        <button
          onClick={checkout}
          disabled={loading}
          className="rounded-2xl bg-black px-8 py-4 text-lg font-medium text-white shadow hover:bg-neutral-800 disabled:opacity-60"
        >
          {loading ? "Starting checkout…" : "Pay & Continue"}
        </button>
      </div>

      {/* Booking Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">Pick a Time</h2>
        <p className="text-sm text-neutral-600 text-center max-w-md mx-auto">
          After payment, book your session instantly. You’ll receive an email confirmation with the details.
        </p>
        <div className="rounded-2xl border border-neutral-200 p-2 max-w-3xl mx-auto">
          <iframe
            title="Calendly"
            src="https://calendly.com/abazar63/60min?hide_gdpr_banner=1&primary_color=000000"
            className="h-[680px] w-full rounded-xl"
          />
        </div>
      </section>

      {/* Refund link */}
      <div className="text-center text-sm">
        <Link href="/refunds" className="underline">
          Request a refund
        </Link>
      </div>
    </main>
  );
}