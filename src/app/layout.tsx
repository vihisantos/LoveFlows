import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-lato",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Love Flow | Convite de Casamento",
  description: "Template premium de convite de casamento com RSVP e contagem regressiva.",
  manifest: "/manifest.json",
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  openGraph: {
    title: "Noivo & Noiva | 01.01.2027",
    description: "Celebre o nosso amor conosco. Detalhes, RSVP, local e muito mais.",
    url: "https://love-flows.vercel.app",
    siteName: "Noivo & Noiva Wedding",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
        width: 1200,
        height: 630,
      }
    ],
    locale: "pt_BR",
    type: "website",
  }
};

export const viewport = {
  themeColor: "#B8860B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${lato.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
