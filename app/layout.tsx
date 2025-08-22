import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BrazenLife Coaching",
  description: "Book coaching sessions and pay instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <div className="mx-auto max-w-6xl p-6">{children}</div>
      </body>
    </html>
  );
}
