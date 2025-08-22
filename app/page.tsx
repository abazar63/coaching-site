"use client";
import { useState } from "react";

const packages = [
  {
    id: "single",
    name: "Single Session",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE ?? "",
    blurb: "One 60-min session. Great for quick wins.",
  },
  {
    id: "pack5",
    name: "5-Session Pack",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PACKAGE5 ?? "",
    blurb: "Five 60-min sessions. Save vs single buy.",
  },
  {
    id: "pack10",
    name: "10-Session Pack",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PACKAGE10 ?? "",
    blurb: "Ten 60-min sessions. Best value.",
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">Book a Coaching Session</h1>
        <p className="text-sm text-neutral-600">
          Pay securely, then pick a time. Instant payment capture via Stripe. You’ll get
          email confirmations for both payment and booking.
        </p>

        <div className="grid gap-3">
          {packages.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`rounded-2xl border p-4 text-left shadow-sm transition hover:shadow ${
                selected.id === p.id ? "border-black" : "border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium">{p.name}</div>
                  <div className="text-sm text-neutral-600">{p.blurb}</div>
                </div>
                <input type="radio" className="h-5 w-5" checked={selected.id === p.id} readOnly />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={checkout}
          disabled={loading}
          className="w-full rounded-2xl bg-black px-4 py-3 text-white disabled:opacity-60"
        >
          {loading ? "Starting checkout…" : "Pay & Continue"}
        </button>

        <div className="pt-4 text-sm">
          <a className="underline" href="/refunds">Request a refund</a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Pick a Time</h2>
        <p className="text-sm text-neutral-600">
          Bookings are confirmed after payment. You’ll receive a link by email as well.
        </p>

        {/* Replace with your real link */}
        <div className="rounded-2xl border border-neutral-200 p-2">
          <iframe
            title="Calendly"
            src="https://calendly.com/abazar63/30min?hide_gdpr_banner=1&primary_color=000000"
            className="h-[680px] w-full rounded-xl"
          />
        </div>
      </section>
    </main>
  );
}
