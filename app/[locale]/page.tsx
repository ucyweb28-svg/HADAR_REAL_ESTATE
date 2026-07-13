'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
} from 'framer-motion';
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

// 2 vidéos de fond seulement. Les images existantes ne servent plus que de
// poster (chargement / autoplay bloqué) et de fallback mobile (la vidéo n'est
// chargée que sur desktop).
type Video = {
  src: string;
  poster: string;
  alt: string;
};

const videos: Video[] = [
  {
    src: '/videos/hero-video-cityscape.mp4',
    poster: '/images/hero/hero-jerusalem.webp',
    alt: 'Vue aérienne de Jérusalem',
  },
  {
    src: '/videos/hero-video-ramatgan.mp4',
    poster: '/images/hero/hero-batyam.webp',
    alt: 'Vue aérienne de Ramat Gan',
  },
];

// 4 blocs de texte (titre + sous-titre par clé de traduction), chacun rattaché
// à l'une des 2 vidéos. Passer du texte 0 au texte 1 garde la même vidéo (0) :
// le fond ne redémarre pas. Le texte 1 → 2 change réellement de vidéo (0 → 1).
type Slide = {
  key: string;
  video: number;
};

const slides: Slide[] = [
  { key: 'jerusalem', video: 0 },
  { key: 'telaviv', video: 0 },
  { key: 'batyam', video: 1 },
  { key: 'entrance', video: 1 },
];

// Courbe d'easing douce (easeOutExpo-like), typée en tuple pour Framer Motion.
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Pattern 1 — texte en cascade : le conteneur orchestre l'apparition
// décalée (stagger) de chaque bloc enfant, déclenchée au scroll.
const cascadeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cascadeItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

// Pattern 3 — chiffres animés. TODO: remplacer par les vraies statistiques de Hadar
const stats = [
  { key: 'experience', value: 3, suffix: '' },
  { key: 'transactions', value: 40, suffix: '+' },
  { key: 'zones', value: 3, suffix: '' },
];

// Compteur qui s'incrémente de 0 à sa valeur finale quand il entre dans le
// viewport (une seule fois), via useMotionValue + animate().
function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.8, ease: easeOut });
    return () => controls.stop();
  }, [inView, value, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function HomePage() {
  const t = useTranslations('home.hero.slides');
  const tNav = useTranslations('nav');
  const tPos = useTranslations('home.positioning');
  const tStats = useTranslations('home.stats');
  const locale = useLocale();
  const bodyFont = locale === 'he' ? 'font-hebrew' : 'font-body';
  const [current, setCurrent] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Vidéos uniquement sur desktop : sur mobile on garde le poster image.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Pattern 2 — zoom au scroll : l'image de la section Positionnement grandit
  // (0.85 → 1) à mesure que la section entre dans le viewport, liée au scroll.
  const positioningRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: positioningRef,
    offset: ['start end', 'center center'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

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
  const videoIndex = activeSlide.video;
  const activeVideo = videos[videoIndex];

  return (
    <main className="min-h-screen bg-ink">
      {/* Section Hero (fond ink) */}
      <div className="md:p-6">
        <div className="relative h-[100dvh] w-full overflow-hidden md:h-[calc(100vh-3rem)] md:rounded-2xl">
        {/* Fond vidéo — keyé par la vidéo (pas par le texte) : ne remonte donc
            que lors d'un vrai changement de vidéo (texte 1 → 2). Pas de scale
            Ken Burns sur la vidéo (le mouvement du drone suffit et le scale
            provoquait un tremblement) : seule l'opacité s'anime au changement. */}
        <AnimatePresence>
          <motion.div
            key={videoIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ willChange: 'opacity' }}
            className="absolute inset-0"
          >
            {isDesktop ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={activeVideo.poster}
                className="h-full w-full object-cover"
              >
                <source src={activeVideo.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={activeVideo.poster}
                alt={activeVideo.alt}
                fill
                priority
                sizes="100vw"
                quality={90}
                className="object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dégradé haut : lisibilité du nav sur les ~20% supérieurs, transparent
            ensuite (le centre reste dégagé pour voir le ciel / le mouvement) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-ink/80 to-transparent" />

        {/* Dégradé bas renforcé : ink/90 au plus sombre, sur h-2/3, pour garder
            le titre lisible même sur les zones lumineuses de la vidéo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

        {/* Nav overlay */}
        <nav className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 md:px-12">
          <Image
            src="/logo/logo.png"
            alt="Hadar Invest"
            width={1280}
            height={357}
            priority
            className="h-10 w-auto md:h-14"
          />
          <div className="flex items-center gap-5">
            <motion.button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`rounded-full border border-linen/30 bg-transparent px-5 py-2 ${bodyFont} text-sm font-medium tracking-wide text-linen transition-[border-color,box-shadow] duration-[250ms] hover:border-ember hover:shadow-[0_0_24px_rgba(252,122,30,0.45)]`}
            >
              {tNav('menu')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`hidden rounded-full border border-linen/30 bg-transparent px-5 py-2 ${bodyFont} text-sm font-medium tracking-wide text-linen transition-[border-color,box-shadow] duration-[250ms] hover:border-ember hover:shadow-[0_0_24px_rgba(252,122,30,0.45)] md:block`}
            >
              {tNav('contactCta')}
            </motion.button>
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

        {/* Vignettes en bas à gauche — conteneur de même hauteur que le bouton
            flèche, barres centrées verticalement pour un alignement optique */}
        <div className="absolute bottom-6 start-8 flex h-11 items-center gap-2 md:bottom-12 md:start-12 md:h-14">
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
          className="absolute bottom-6 end-8 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ember md:bottom-12 md:end-12 md:h-14 md:w-14"
          aria-label="Découvrir la suite"
        >
          <motion.span variants={scrollCtaIconVariants} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <ArrowUpRight className="h-5 w-5 text-ink md:h-6 md:w-6" />
          </motion.span>
        </motion.button>
        </div>
      </div>

      {/* Section Positionnement (fond linen clair — contraste avec le hero ink).
          Pattern 1 : texte en cascade au scroll. Pattern 2 : zoom de l'image. */}
      <section
        id="next"
        ref={positioningRef}
        className={`${bodyFont} relative overflow-hidden bg-linen px-6 py-24 text-ink transition-colors duration-700 md:px-12 md:py-32`}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            variants={cascadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={cascadeItem}
              className="text-balance text-3xl font-bold leading-tight md:text-4xl"
            >
              {tPos('title')}
            </motion.h2>
            <motion.p variants={cascadeItem} className="mt-6 text-pretty text-base leading-relaxed text-ink/80 md:text-lg">
              {tPos('p1')}
            </motion.p>
            <motion.p variants={cascadeItem} className="mt-4 text-pretty text-base leading-relaxed text-ink/80 md:text-lg">
              {tPos('p2')}
            </motion.p>
            <motion.p variants={cascadeItem} className="mt-4 text-pretty text-base leading-relaxed text-ink/80 md:text-lg">
              {tPos('p3')}
            </motion.p>
          </motion.div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <motion.div style={{ scale: imageScale }} className="relative h-full w-full">
              <Image
                src="/images/hero/hero-telaviv.webp"
                alt="Projet immobilier en Israël"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={90}
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Hadar en chiffres (fond blue foncé — re-bascule sombre).
          Pattern 3 : chiffres qui s'incrémentent au scroll. */}
      <section className={`${bodyFont} bg-blue px-6 py-24 text-linen transition-colors duration-700 md:px-12 md:py-32`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">{tStats('title')}</h2>
          <div className="mt-14 grid gap-12 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-5xl font-bold text-ember md:text-6xl">
                  <StatNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 text-sm text-linen/80 md:text-base">{tStats(stat.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}