"use client";
import { useState } from "react";

export default function RefundPage() {
  const [pi, setPi] = useState("");
  const [reason, setReason] = useState("requested_by_customer");
  const [submitting, setSubmitting] = useState(false);

  async function submitRefund() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_intent: pi, reason }),
      });
      const data = await res.json();
      if (data.status === "succeeded") alert("Refund created. Check your email.");
      else alert(data.error || "Could not create refund");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Request a Refund</h1>
      <p className="text-sm text-neutral-600">
        Enter the Payment Intent ID from your receipt email. Refunds follow our policy
        (see below). Approved refunds are processed immediately via Stripe.
      </p>
      <input
        value={pi}
        onChange={(e) => setPi(e.target.value)}
        placeholder="pi_123..."
        className="w-full rounded-xl border border-neutral-300 p-3"
      />
      <label className="block text-sm font-medium">Reason</label>
      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full rounded-xl border border-neutral-300 p-3"
      >
        <option value="requested_by_customer">Requested by customer</option>
        <option value="duplicate">Duplicate</option>
        <option value="fraudulent">Fraudulent</option>
      </select>
      <button
        onClick={submitRefund}
        disabled={!pi || submitting}
        className="w-full rounded-2xl bg-black px-4 py-3 text-white disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit refund"}
      </button>

      <section className="rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-700">
        <h2 className="mb-2 text-base font-semibold">Refund Policy</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Full refund if canceled 24 hours before the session start time.</li>
          <li>50% refund if canceled within 24 hours but before the session.</li>
          <li>No-show: no refund. Edge cases handled at our discretion.</li>
        </ul>
        <p className="mt-2">
          Questions? Email {process.env.NEXT_PUBLIC_COACH_SUPPORT_EMAIL ?? "support@yourdomain.com"}
        </p>
      </section>
    </main>
  );
}
