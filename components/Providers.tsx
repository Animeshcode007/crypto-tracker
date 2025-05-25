'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    // ThemeProvider will only run on the client, so no SSR mismatch
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}