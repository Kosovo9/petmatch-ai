import { Inter, Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://petmatch-ai.vercel.app'),
  title: {
    default: 'PetMatch AI - Elite Global Pet Ecosystem',
    template: '%s | PetMatch AI',
  },
  description:
    'The complete pet care ecosystem: Find services, book flights, get nutrition advice, connect with microinfluencers, and more. Available in 20 languages across 50+ countries.',
  keywords: [
    'pet care',
    'pet services',
    'pet adoption',
    'pet nutrition',
    'pet travel',
    'pet insurance',
    'veterinary',
    'pet grooming',
    'pet training',
    'pet sitting',
  ],
  authors: [{ name: 'PetMatch AI' }],
  creator: 'PetMatch AI',
  publisher: 'PetMatch AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://petmatch-ai.vercel.app',
    title: 'PetMatch AI - Elite Global Pet Ecosystem',
    description:
      'The complete pet care ecosystem with services in 50+ countries and 20 languages.',
    siteName: 'PetMatch AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PetMatch AI - Elite Global Pet Ecosystem',
    description:
      'The complete pet care ecosystem with services in 50+ countries and 20 languages.',
    creator: '@petmatchai',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
