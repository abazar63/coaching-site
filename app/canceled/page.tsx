import Link from "next/link";

export default function Canceled() {
  return (
    <main className="mx-auto max-w-xl space-y-3 text-center">
      <h1 className="text-2xl font-semibold">Checkout canceled</h1>
      <p>No charge was made. You can try again anytime.</p>
      <Link href="/" className="underline">
        Back to home
      </Link>
    </main>
  );
}
