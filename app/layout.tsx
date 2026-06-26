import type { ReactNode } from 'react';

// Pass-through root layout. The real <html>/<body> is rendered by the
// locale layout (app/[locale]/layout.tsx); this exists so the global
// not-found page has a root layout to attach to.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
