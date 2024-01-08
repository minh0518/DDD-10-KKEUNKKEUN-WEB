import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { ReactChildrenProps } from '@/types/common';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KKEUNKKEUN-WEB',
  description: 'DDD 10th',
};

export default function RootLayout({ children }: ReactChildrenProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
