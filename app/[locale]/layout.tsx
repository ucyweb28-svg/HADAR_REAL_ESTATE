import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n';
import '../globals.css';

async function loadFonts(locale: string) {
  if (locale === 'he') {
    const { rubik } = await import('../fonts/hebrew');
    return { fontVars: rubik.variable, fontClass: 'font-hebrew' };
  }
  const { montserrat, trap } = await import('../fonts/latin');
  return { fontVars: `${montserrat.variable} ${trap.variable}`, fontClass: 'font-body' };
}

export const metadata: Metadata = {
  title: 'Hadar Real Estate',
  description: 'Conseil en acquisition immobilière en Israël',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const dir = locale === 'he' ? 'rtl' : 'ltr';
  const { fontVars, fontClass } = await loadFonts(locale);

  return (
    <html lang={locale} dir={dir}>
      <body className={`${fontVars} ${fontClass}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}