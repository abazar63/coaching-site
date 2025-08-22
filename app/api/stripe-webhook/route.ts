import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");
  let event;
  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) throw new Error("Webhook secret missing");
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
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
        break;
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
