import Link from 'next/link';
import { cormorant, mulish } from '@/lib/fonts';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${cormorant.variable} ${mulish.variable}`}>
      <body className="grid min-h-screen place-items-center bg-base px-6 text-center">
        <div className="flex flex-col items-center gap-5">
          <div className="accent-bar w-24 rounded-full" />
          <p className="eyebrow">404</p>
          <h1 className="font-serif text-5xl text-warm">Page not found</h1>
          <p className="max-w-md text-muted">
            The page you’re looking for has moved or no longer exists.
          </p>
          <Link
            href="/"
            className="rounded-full bg-gold-sweep bg-[length:200%_auto] px-6 py-3 text-sm font-semibold text-deeper transition hover:bg-[position:100%_0]"
          >
            Return home
          </Link>
        </div>
      </body>
    </html>
  );
}
