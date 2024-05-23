import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./providers";
import { Toaster } from "@/components/sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ask Nithyananda",
  description: "World's first Spiritual AI",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ask Nithyananda",
    title: "Ask Nithyananda",
    description: "World's first Spiritual AI",
    images: [
      {
        url: "/og-banner.png",
        alt: "Ask Nithyananda",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
