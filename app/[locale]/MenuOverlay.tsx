'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { locales } from '@/i18n';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  const isRtl = locale === 'he';

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  function switchLocaleHref(loc: string) {
    const segments = pathname.split('/');
    segments[1] = loc;
    return segments.join('/') || '/';
  }

  const links = [
    { label: tNav('method') },
    { label: tNav('projects') },
    { label: tNav('founder') },
    // Contact : même comportement que le bouton CTA. La section n'existe pas
    // encore, on se contente donc de fermer le menu pour l'instant.
    { label: tNav('contact'), onClick: onClose },
  ];

  // Desktop : panneau ancré côté "end" qui glisse depuis ce même côté.
  // Mobile : overlay plein écran, simple fade + slide vertical.
  const panelVariants = isDesktop
    ? {
        hidden: { x: isRtl ? '-100%' : '100%' },
        visible: { x: '0%' },
      }
    : {
        hidden: { opacity: 0, y: -24 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop desktop : capte le clic sur le hero visible pour fermer */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 z-40 hidden md:block"
          />

          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onMouseMove={handleMouseMove}
            className="fixed inset-y-0 start-0 end-0 z-50 flex flex-col overflow-hidden bg-ink px-8 py-6 md:start-auto md:w-[70%] md:rounded-s-[2.5rem] md:border-s md:border-linen/10 md:bg-ink/75 md:px-12 md:backdrop-blur-2xl lg:w-[60%]"
          >
            {/* Grain / bruit — desktop uniquement */}
            <div
              className="pointer-events-none absolute inset-0 z-10 hidden opacity-[0.04] mix-blend-overlay md:block"
              style={noiseBackgroundStyle}
            />

            {/* Halo suivant la souris — desktop uniquement */}
            <motion.div
              className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[600px] w-[600px] rounded-full md:block"
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
                {links.map((link, index) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={link.onClick}
                    className="group flex w-full items-center border-b border-linen/10 py-6 text-start transition-colors duration-300 hover:border-linen/30 md:py-8"
                  >
                    <span className={`${bodyFont} w-12 shrink-0 pe-6 text-sm text-ember md:w-16 md:pe-8`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`${bodyFont} flex-1 text-start text-4xl font-bold text-linen/60 transition-colors duration-300 group-hover:text-linen md:text-6xl`}
                    >
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-8 w-8 shrink-0 -translate-x-2 text-linen opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ember group-hover:opacity-100" />
                  </button>
                ))}
              </nav>

              {/* Sélecteur de langue — segmented control */}
              <div
                className={`${bodyFont} inline-flex items-center gap-1 self-start rounded-full bg-linen/10 p-1`}
              >
                {locales.map((loc) => {
                  const active = loc === locale;
                  return (
                    <Link
                      key={loc}
                      href={switchLocaleHref(loc)}
                      aria-current={active ? 'true' : undefined}
                      className={`relative rounded-full px-4 py-2 text-sm uppercase tracking-wide transition-colors ${
                        active ? 'text-ink' : 'text-linen/60 hover:text-linen'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="langActive"
                          className="absolute inset-0 rounded-full bg-linen"
                          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        />
                      )}
                      <span className="relative z-10">{loc.toUpperCase()}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
