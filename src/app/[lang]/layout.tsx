import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

import { config } from '@fortawesome/fontawesome-svg-core';
import { auth } from '@joy/auth';
import Footer from '@joy/components/Footer';
import Header from '@joy/components/Header';
import NewUserCheck from '@joy/components/operation/NewUserCheck';
import ScrollTopHolder from '@joy/components/ScrollTopHolder';
import Sidebar from '@joy/components/Sidebar';
import Seo from '@joy/data/seo.json';
import { languages } from '@joy/i18n/config';
import colors from '@joy/theme/colors';
import fonts from '@joy/theme/font';
import ThemeRegistry from '@joy/theme/ThemeRegistry';
import { Language, ParamsWithLng } from '@joy/types/i18n';

import Providers from '../Providers';

import Loading from './loading';

import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

// revalidate at some frequency
export const revalidate = 600;

export const metadata: Metadata = {
  metadataBase: new URL(Seo.siteUrl),
  title: Seo.title,
  description: Seo.description,
  keywords: Seo.keywords,
  openGraph: {
    title: Seo.title,
    description: Seo.description,
  },
  twitter: {
    title: Seo.title,
    description: Seo.description,
  },
};

export async function generateStaticParams() {
  return languages.map((lang: Language) => ({ lang: lang.code }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: ParamsWithLng;
}) {
  const session = await auth();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={fonts.default.className} id='root'>
        <style>{`
          :root {
            --primary-color: ${session?.user?.username};
          }
        `}</style>
        <NextTopLoader color={colors.primaryMain} shadow='none' />
        <Providers>
          <main className='flex'>
            <ThemeRegistry>
              <SessionProvider session={session}>
                <NewUserCheck />
                <Sidebar />
              </SessionProvider>
              <ScrollTopHolder>
                <SessionProvider session={session}>
                  <Header />
                </SessionProvider>
                <Suspense fallback={<Loading />}>{children}</Suspense>
                <Footer />
              </ScrollTopHolder>
            </ThemeRegistry>
          </main>
        </Providers>
      </body>
    </html>
  );
}
