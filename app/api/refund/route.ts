import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { payment_intent, reason } = await req.json();
    if (!payment_intent) {
      return NextResponse.json({ error: "payment_intent required" }, { status: 400 });
    }

    const refund = await stripe.refunds.create({ payment_intent, reason });
    return NextResponse.json({ id: refund.id, status: refund.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
