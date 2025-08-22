"use client";
import { useState } from "react";

export default function RefundPage() {
  const [pi, setPi] = useState("");
  const [reason, setReason] = useState("requested_by_customer");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitRequest() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/refund-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_intent: pi, reason, email }),
      });
      const data = await res.json();
      if (res.ok) alert("Your refund request was submitted. We'll review it and email you.");
      else alert(data.error || "Could not submit request");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Request a Refund</h1>
      <p className="text-sm text-neutral-600">
        Submit a request below. We review each case against our policy and confirm by email.
      </p>

      <label className="block text-sm font-medium">Payment Intent ID</label>
      <input
        value={pi}
        onChange={(e) => setPi(e.target.value)}
        placeholder="pi_123..."
        className="w-full rounded-xl border border-neutral-300 p-3"
      />

      <label className="block text-sm font-medium mt-2">Your Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-xl border border-neutral-300 p-3"
      />

      <label className="block text-sm font-medium mt-2">Reason</label>
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
        onClick={submitRequest}
        disabled={!pi || !email || submitting}
        className="w-full rounded-2xl bg-black px-4 py-3 text-white disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit request"}
      </button>

      <section className="rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-700">
        <h2 className="mb-2 text-base font-semibold">Refund Policy</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Full refund if canceled 24 hours before the session start time.</li>
          <li>50% refund if canceled within 24 hours but before the session.</li>
          <li>No-show: no refund. Edge cases at our discretion.</li>
        </ul>
        <p className="mt-2">We usually review requests within 2 business days.</p>
      </section>
    </main>
  );
}
