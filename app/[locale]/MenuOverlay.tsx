'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { locales } from '@/i18n';

const overlayVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0 },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const gridBackgroundStyle = {
  backgroundImage:
    'linear-gradient(to right, rgba(242,233,220,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,233,220,0.04) 1px, transparent 1px)',
  backgroundSize: '70px 70px',
};

const noiseSvg = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>'
);

const noiseBackgroundStyle = {
  backgroundImage: `url("data:image/svg+xml,${noiseSvg}")`,
};

export default function MenuOverlay({
  isOpen,
  onClose,
  locale,
  bodyFont,
}: {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  bodyFont: string;
}) {
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    setMousePos({ x: event.clientX, y: event.clientY });
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setIsLangOpen(false);
  }, [isOpen]);

  function switchLocaleHref(loc: string) {
    const segments = pathname.split('/');
    segments[1] = loc;
    return segments.join('/') || '/';
  }

  const links = [
    tNav('method'),
    tNav('groupPurchase'),
    tNav('individualTransactions'),
    tNav('zones'),
    tNav('founder'),
  ];

  const otherLocales = locales.filter((loc) => loc !== locale);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-ink px-8 py-6 md:px-12"
        >
          {/* 1. Grille fine (plan d'architecte) */}
          <div className="pointer-events-none absolute inset-0 z-0" style={gridBackgroundStyle} />

          {/* 2. Grain / bruit */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.04] mix-blend-overlay"
            style={noiseBackgroundStyle}
          />

          {/* 3. Halo suivant la souris */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-20 h-[600px] w-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(252,122,30,0.15), transparent 70%)',
            }}
            animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }}
            transition={{ type: 'spring', damping: 26, stiffness: 170, mass: 0.5 }}
          />

          <div className="relative z-30 flex flex-1 flex-col">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xl tracking-widest text-linen">HADAR</span>
              <button
                type="button"
                onClick={onClose}
                aria-label={tNav('closeMenu')}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-linen text-linen transition hover:bg-linen hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center">
              {links.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  className="group flex w-full items-center border-b border-linen/10 py-6 text-start transition-colors duration-300 hover:border-linen/30 md:py-8"
                >
                  <span className={`${bodyFont} w-12 shrink-0 pe-6 text-sm text-ember md:w-16 md:pe-8`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`${bodyFont} flex-1 text-start text-4xl font-bold text-linen/60 transition-colors duration-300 group-hover:text-linen md:text-6xl`}
                  >
                    {label}
                  </span>
                  <ArrowUpRight className="h-8 w-8 shrink-0 -translate-x-2 text-linen opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ember group-hover:opacity-100" />
                </button>
              ))}
            </nav>

            <div className="relative self-start">
              <button
                type="button"
                onClick={() => setIsLangOpen((value) => !value)}
                className={`${bodyFont} text-sm uppercase tracking-wide text-linen/80 transition hover:text-linen`}
              >
                {locale.toUpperCase()} ▾
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute bottom-full mb-2 flex flex-col overflow-hidden rounded-lg border border-linen/20 bg-ink"
                  >
                    {otherLocales.map((loc) => (
                      <Link
                        key={loc}
                        href={switchLocaleHref(loc)}
                        onClick={() => setIsLangOpen(false)}
                        className={`${bodyFont} px-4 py-2 text-sm uppercase tracking-wide text-linen/80 transition hover:bg-linen/10 hover:text-linen`}
                      >
                        {loc.toUpperCase()}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
