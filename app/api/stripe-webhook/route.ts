import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  // In some Next.js setups, headers() is typed as Promise<ReadonlyHeaders>
  const sig = (await headers()).get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Webhook secret missing", { status: 500 });
  }
  if (!sig) {
    return new NextResponse("Missing Stripe signature header", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // TODO: send email with Calendly link, mark credits, etc.
        break;
      }
      case "charge.refunded": {
        // TODO: notify customer of refund
        break;
      }
      default:
        // no-op
        break;
    }
    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown handler error";
    return new NextResponse(message, { status: 500 });
  }
}
