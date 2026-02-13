import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://benelmarketinghub.com'),
  title: {
    default: 'BenEl Marketing Hub',
    template: '%s | BenEl Marketing Hub',
  },
  description:
    'Expert strategies and actionable frameworks for modern marketers, sales leaders, and brand builders.',
  keywords: [
    'marketing',
    'sales',
    'branding',
    'content marketing',
    'digital marketing',
    'sales strategy',
    'brand identity',
    'marketing hub',
    'BenEl',
  ],
  authors: [{ name: 'BenEl Team' }],
  creator: 'BenEl Marketing Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://benelmarketinghub.com',
    siteName: 'BenEl Marketing Hub',
    title: 'BenEl Marketing Hub',
    description:
      'Expert strategies and actionable frameworks for modern marketers, sales leaders, and brand builders.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BenEl Marketing Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BenEl Marketing Hub',
    description:
      'Expert strategies and actionable frameworks for modern marketers, sales leaders, and brand builders.',
    images: ['/og-image.png'],
    creator: '@benelmarketing',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-placeholder',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'BenEl Marketing Hub',
              description:
                'Expert strategies and actionable frameworks for modern marketers, sales leaders, and brand builders.',
              url: 'https://benelmarketinghub.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://benelmarketinghub.com/blog?search={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <Navbar />
        <main className="min-h-screen pt-[73px] page-enter">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
