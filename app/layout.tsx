import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "BrazenLife Coaching",
  description: "Book coaching sessions and pay instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-neutral-900 antialiased">
        <header className="sticky top-0 z-30 border-b border-amber-200/60 bg-white/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-3">
              {/* Put your logo file in /public/brazenlife-logo.jpeg (or .png) */}
              <Image
                src="/logo.png"   // <-- DO NOT prefix with /public
                alt="BrazenLife"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full border border-amber-300 object-cover"
                priority
              />
              <span className="text-lg font-semibold tracking-tight">BrazenLife Coaching</span>
            </Link>

            <nav className="hidden items-center gap-6 sm:flex">
              <Link href="#pricing" className="text-sm text-neutral-700 hover:text-black">Pricing</Link>
              <Link href="#booking" className="text-sm text-neutral-700 hover:text-black">Booking</Link>
              <Link href="/refunds" className="text-sm text-neutral-700 hover:text-black">Refunds</Link>
            </nav>

            <Link href="#pricing" className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90">
              Book now
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-6">{children}</main>

        <footer className="border-t border-amber-200/60 bg-white/60">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 p-6 text-xs text-neutral-600 sm:flex-row">
            <p>© {new Date().getFullYear()} BrazenLife Coaching LLC. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/refunds" className="hover:text-black">Refunds</Link>
              <Link href="#" className="hover:text-black">Terms</Link>
              <Link href="#" className="hover:text-black">Privacy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
