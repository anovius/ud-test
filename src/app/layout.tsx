import React from 'react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "UD-Test",
  description: "Firebase CRUD operations using Next.js",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        <nav style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', margin: 0, padding: 0 }}>
            <li>
              <Link href="/humanization">List</Link>
            </li>
            <li>
              <Link href="/humanization/submit">Submit Document</Link>
            </li>
            <li>
              <Link href="/dashboard">CRUD</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
