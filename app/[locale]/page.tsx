'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MenuOverlay from './MenuOverlay';

const scrollCtaVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

const scrollCtaIconVariants = {
  rest: { rotate: 0 },
  hover: { rotate: 45 },
};

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  function handleScrollNext() {
    const next = document.getElementById('next');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  }

  const activeSlide = slides[current];

  return (
    <main className="min-h-screen bg-ink md:p-6">
      <div className="relative h-[100dvh] w-full overflow-hidden md:h-[calc(100vh-3rem)] md:rounded-2xl">
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
                sizes="100vw"
                quality={90}
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
        <nav className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 md:px-12">
          <span className="font-heading text-xl tracking-widest text-linen">
            HADAR
          </span>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={`${bodyFont} text-sm tracking-wide text-linen transition hover:opacity-80`}
            >
              {tNav('menu')}
            </button>
            <button
              className={`hidden rounded-full border border-linen px-5 py-2 ${bodyFont} text-sm font-medium text-linen transition hover:bg-linen hover:text-ink md:block`}
            >
              {tNav('contactCta')}
            </button>
          </div>
        </nav>

        <MenuOverlay
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          locale={locale}
          bodyFont={bodyFont}
        />

        {/* Texte principal, dynamique par slide */}
        <div className="absolute inset-x-0 bottom-24 px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={`${bodyFont} max-w-full text-balance text-2xl font-bold leading-tight tracking-tight text-linen sm:max-w-2xl sm:text-3xl sm:tracking-normal md:text-5xl`}>
                {t(`${activeSlide.key}.title`)}
              </h1>
              <p className={`mt-4 max-w-full ${bodyFont} text-pretty text-sm text-linen/90 sm:max-w-xl sm:text-base md:text-lg`}>
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

        {/* Bouton flottant : défiler vers la section suivante */}
        <motion.button
          type="button"
          onClick={handleScrollNext}
          variants={scrollCtaVariants}
          initial="rest"
          whileHover="hover"
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute bottom-8 end-8 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ember md:bottom-12 md:end-12 md:h-14 md:w-14"
          aria-label="Découvrir la suite"
        >
          <motion.span variants={scrollCtaIconVariants} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <ArrowUpRight className="h-5 w-5 text-ink md:h-6 md:w-6" />
          </motion.span>
        </motion.button>
      </div>
    </main>
  );
}