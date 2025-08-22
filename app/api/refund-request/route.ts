import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { payment_intent, reason, email } = await req.json();

    if (!payment_intent || !email) {
      return NextResponse.json({ error: "payment_intent and email are required" }, { status: 400 });
    }

    // Verify the PI exists under this account/key
    const pi = await stripe.paymentIntents.retrieve(payment_intent);

    // Mark request in metadata for dashboard review
    await stripe.paymentIntents.update(payment_intent, {
      metadata: {
        refund_requested: "true",
        refund_reason: reason || "requested_by_customer",
        refund_request_email: email,
        refund_request_time: new Date().toISOString(),
      },
    });

    // OPTIONAL: email your support inbox (e.g., via Resend/SendGrid)
    // await sendRefundEmail({ email, payment_intent, reason });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
