import type { Metadata } from 'next';
import {
  Inter,
  Manrope,
  Noto_Sans_Tamil,
  Playfair_Display,
  DM_Sans,
  Cormorant_Garamond,
  IBM_Plex_Sans,
} from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { GlobalClientWidgets } from '@/components/layout/GlobalClientWidgets';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-tamil',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm-plex',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Compete Academy | Dream • Prepare • Become',
  description:
    'Compete Academy is Tamil Nadu’s premier institute for high-stakes competitive examinations: NEET (UG) Medical, IIT-JEE, UPSC Civil Services, TNPSC State Administration, and Secondary School Foundations in Chennai.',
  keywords: [
    'Compete Academy',
    'NEET Coaching Chennai',
    'IIT JEE Coaching Guindy',
    'TNPSC Coaching Tamil Nadu',
    'UPSC Academy Chennai',
    'Competitive Exam Study Materials',
  ],
  authors: [{ name: 'Compete Academy Academic Council' }],
  openGraph: {
    title: 'Compete Academy | Dream • Prepare • Become',
    description:
      'Disciplined Courses. Uncompromising Standards. Excellence in Education. Confidence in Competition.',
    url: 'https://competeacademy.in',
    siteName: 'Compete Academy',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${notoSansTamil.variable} ${playfairDisplay.variable} ${dmSans.variable} ${cormorantGaramond.variable} ${ibmPlexSans.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-surface font-sans text-on-surface flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="flex-1 w-full min-w-0 max-w-full pt-[var(--header-total-height)] bg-surface pb-20 md:pb-0 overflow-x-clip">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        <GlobalClientWidgets />
      </body>
    </html>
  );
}
