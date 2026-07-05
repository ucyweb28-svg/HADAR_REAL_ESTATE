'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { locales } from '@/i18n';

const slides = [
  {
    key: 'jerusalem',
    src: '/images/hero/hero-jerusalem.webp',
    alt: 'Villa à Jérusalem',
    overlay: 'from-ink/80 via-ink/10',
  },
  {
    key: 'telaviv',
    src: '/images/hero/hero-telaviv.webp',
    alt: 'Immeuble à Tel Aviv',
    overlay: 'from-ink/90 via-ink/40',
  },
  {
    key: 'batyam',
    src: '/images/hero/hero-batyam.webp',
    alt: 'Bord de mer à Bat Yam',
    overlay: 'from-ink/90 via-ink/50',
  },
  {
    key: 'entrance',
    src: '/images/hero/hero-entrance.webp',
    alt: 'Entrée de villa',
    overlay: 'from-ink/80 via-ink/10',
  },
];

export default function HomePage() {
  const t = useTranslations('home.hero.slides');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const bodyFont = locale === 'he' ? 'font-hebrew' : 'font-body';
  const [current, setCurrent] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  function switchLocaleHref(locale: string) {
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/') || '/';
  }

  const activeSlide = slides[current];

  return (
    <main className="min-h-screen bg-ink p-6">
      <div className="relative h-[calc(100vh-3rem)] w-full overflow-hidden rounded-2xl">
        {/* Slides image */}
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 6, ease: 'linear' }}
              className="relative h-full w-full"
            >
              <Image
                src={activeSlide.src}
                alt={activeSlide.alt}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dégradé bas, réglé par image */}
        <div
          className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${activeSlide.overlay} to-transparent`}
        />

        {/* Nav overlay */}
        <nav className="absolute inset-x-0 top-0 flex items-center justify-between px-8 py-6 md:px-12">
          <span className="font-heading text-xl tracking-widest text-linen">
            HADAR
          </span>
          <div className={`hidden gap-8 ${bodyFont} text-sm tracking-wide text-linen md:flex`}>
            <span className="cursor-pointer opacity-90 hover:opacity-100">
              {tNav('method')}
            </span>
            <span className="cursor-pointer opacity-90 hover:opacity-100">
              {tNav('groupPurchase')}
            </span>
            <span className="cursor-pointer opacity-90 hover:opacity-100">
              {tNav('zones')}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-3">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={switchLocaleHref(loc)}
                  className="font-body text-xs uppercase tracking-wide text-linen/70 transition hover:text-linen"
                >
                  {loc}
                </Link>
              ))}
            </div>
            <button
              className={`rounded-full border border-linen px-5 py-2 ${bodyFont} text-sm font-medium text-linen transition hover:bg-linen hover:text-ink`}
            >
              {tNav('contact')}
            </button>
          </div>
        </nav>

        {/* Texte principal, dynamique par slide */}
        <div className="absolute inset-x-0 bottom-24 px-8 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={`${bodyFont} max-w-2xl text-3xl font-bold leading-tight text-linen md:text-5xl`}>
                {t(`${activeSlide.key}.title`)}
              </h1>
              <p className={`mt-4 max-w-xl ${bodyFont} text-base text-linen/90 md:text-lg`}>
                {t(`${activeSlide.key}.subtitle`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vignettes en bas à gauche */}
        <div className="absolute bottom-8 start-8 flex gap-2 md:start-12">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              onClick={() => setCurrent(index)}
              className={`h-1 rounded-full transition-all ${
                index === current ? 'w-8 bg-linen' : 'w-4 bg-linen/40'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}