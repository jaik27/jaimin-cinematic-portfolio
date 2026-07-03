import type { Metadata, Viewport } from 'next';
import './globals.css';

const title = 'Jaimin Shah | Full Stack Dev, Data Analyst, Operations Management, Digital Sales';
const description = 'Cinematic portfolio for Jaimin Shah: Full Stack Dev, Data Analyst, Operations Management for SMEs, Digital Sales & Marketer, and Verified Journalist.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jaimin-shah-portfolio.vercel.app'),
  title,
  description,
  applicationName: 'Jaimin Shah Portfolio',
  authors: [{ name: 'Jaimin Shah' }],
  openGraph: {
    title: 'Jaimin Shah',
    description,
    type: 'website',
    url: '/',
    siteName: 'Jaimin Shah Portfolio',
    images: [
      {
        url: '/media/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Jaimin Shah portfolio preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaimin Shah',
    description,
    images: ['/media/og-preview.png']
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
