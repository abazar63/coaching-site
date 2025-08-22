export default function Success() {
  return (
    <main className="mx-auto max-w-xl space-y-3 text-center">
      <h1 className="text-2xl font-semibold">Payment received ✅</h1>
      <p>We sent a confirmation email with your booking link. See you soon!</p>
      <a className="underline" href="/">Back to home</a>
    </main>
  );
}
