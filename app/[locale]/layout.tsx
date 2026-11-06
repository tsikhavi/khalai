import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';

import '@/styles/globals.css';
import {AlertProvider} from '@/components/ui/alert';
import {AuthProvider} from '@/providers/AuthProvider'; // ← adjust if path changes
import {ConditionalNavbar} from '@/components/ConditionalNavbar';
import {ConditionalMain} from '@/components/ConditionalMain';

import {locales, localeNames, type Locale} from '../../i18n/config';
import {ThemeProvider} from '@/providers/ThemeProvider';
import {ChatWidget} from '@/components/ChatWidget';
import {LensHint, LensProvider} from '@/components/studio/LensToggle';
import {CookieConsent} from '@/components/ui/CookieConsent';
import {SplashGate} from '@/components/splash-gate';

/* ------------------------------------------------------------------ */
/*  Static params — pre-render every locale at build time             */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

/* ------------------------------------------------------------------ */
/*  Translated metadata                                               */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});

  return {
    title: t('title'),
    description: t('description'),
  };
}

/* ------------------------------------------------------------------ */
/*  Layout                                                            */
/* ------------------------------------------------------------------ */
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>; // Next.js 16: params is a Promise
}>) {
  const {locale} = await params;

  // Reject unknown locales early
  if (!locales.includes(locale as Locale)) notFound();

  // Enables static rendering of this locale
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = localeNames[locale as Locale].dir;

  return (
    <html
      lang={locale}
      dir={dir}
      className="h-full antialiased"
      suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function () {
          var s = 'Encountered a script tag while rendering React component';
          var ce = console.error;
          console.error = function () {
            if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].indexOf(s) !== -1) return;
            return ce.apply(console, arguments);
          };
        })();
      `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground pb-3.5">
        <SplashGate>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              <AuthProvider>
                <AlertProvider>
                  <LensProvider>
                    <ConditionalNavbar />
                    <ConditionalMain>{children}</ConditionalMain>
                    <ChatWidget />
                    <CookieConsent locale={locale} />
                    <LensHint />
                  </LensProvider>
                </AlertProvider>
              </AuthProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </SplashGate>
      </body>
    </html>
  );
}
