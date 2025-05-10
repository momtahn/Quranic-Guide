import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// GeistSans and GeistMono are imported as font objects.
// Their .variable property provides the CSS variable name (e.g., '--font-geist-sans')
// and is used to apply the font globally.

export const metadata: Metadata = {
  title: 'Quranic Guide',
  description: 'An AI-powered guide answering questions based on the Quran and the teachings of Prophet Muhammad.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
