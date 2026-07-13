Projet : Hadar Real Estate (marque affichée : « Hadar Invest ») — cabinet privé
de conseil en acquisition immobilière en Israël
Repo : github.com/ucyweb28-svg/HADAR_REAL_ESTATE
Déploiement : Vercel — hadar-real-estate.vercel.app (connecté, déploiement auto
sur push main)

Stack : Next.js 14 App Router, TypeScript strict, Tailwind CSS v3.4,
Framer Motion, next-intl (FR/EN/HE avec RTL natif dès la V1)

Communication : français
Mode de travail : Claude.ai (stratégie) → Claude Code (exécution)

================================================================================
POSITIONNEMENT & CONTENU
================================================================================

Cabinet privé de conseil stratégique en acquisition immobilière — PAS une agence
immobilière classique. Accompagnement complet : sourcing, analyse, négociation,
suivi. Clientèle : acheteurs étrangers FR/US/UK/CA, familles, investisseurs
privés, family offices. Fondateur basé à Jérusalem, opère sur le terrain avec
promoteurs, avocats, banques, architectes.

Activités :
1. Achats groupés ("group purchase") : Hadar constitue des groupes de 5-10
   acheteurs sur un même projet, négocie SEUL avec le promoteur. Les acheteurs
   n'interagissent jamais entre eux et ne négocient jamais directement.
   → Décision UX : les achats groupés sont intégrés DANS la page Méthode, avec
     une formulation discrète — PAS de lien de menu séparé, PAS de mot « groupe »
     en titre.
2. Transactions individuelles classiques : sourcing, présentation, négociation
   de biens (résidentiel, location, investissement).

Expertises à faire ressortir :
- Sourcing de projets neufs / off-market avant commercialisation large
- Analyse prix, quartiers, potentiel de valorisation, conditions de paiement
- Négociation avec promoteurs
- Accompagnement investisseurs étrangers
- Suivi étapes locales : offre d'achat, contrat, mifrat technique, avocats,
  garanties bancaires, échéancier de paiement
- Coordination client / promoteur / avocat / intervenants
- Vision stratégique du marché immobilier israélien

Zones : Jérusalem, Tel Aviv, Bat Yam, autres villes israéliennes

Ton : professionnel, premium, rassurant, humain. Éviter le style "agence immo"
ou trop commercial. Inspirer confiance, discrétion, expertise terrain.

================================================================================
DESIGN SYSTEM
================================================================================

Palette (Coolors, définitive — définie dans tailwind.config.ts) :
- ink     #031927  fond sombre principal (hero, sections sombres)
- blue    #04314E  deep space blue — sections secondaires (ex. Chiffres)
- crimson #3D001C  accent profond (peu utilisé pour l'instant)
- ember   #FC7A1E  accent chaud / CTA / chiffres / glow
- linen   #F2E9DC  fond clair / texte sur fond sombre

Règles de contraste :
- Texte sur fond ink, blue ou crimson : toujours linen
- Texte sur fond linen : toujours ink, jamais ember
- ember : uniquement en fond de bouton/icône/badge (texte ink dessus) ou en
  accent court (grands chiffres) ; jamais en fond de texte long, jamais de texte
  ember sur fond linen

Fonts (chargement conditionnel par locale via next/font — app/fonts/latin.ts et
app/fonts/hebrew.ts, injectées dans app/[locale]/layout.tsx) :
- Montserrat (--font-body / classe font-body) : corps ET titres FR/EN (les
  titres utilisent font-body + font-bold → « Montserrat Bold »)
- Rubik (--font-hebrew / classe font-hebrew) : tout le contenu sur /he
  (subsets hebrew + latin). Montserrat/Trap n'ont aucun glyphe hébreu.
- Trap (--font-heading / classe font-heading, Trap-Bold.otf + Trap-Black.otf) :
  DÉFINI mais actuellement NON utilisé dans l'UI — l'ancien wordmark texte
  « HADAR » a été remplacé par le logo image. Trap reste dispo pour un usage
  titrage futur si besoin.

Logo : image public/logo/logo.png (1280×357, PNG transparent, hexagone ember
« H » + wordmark « HADAR-INVEST »). Rendu via next/image, h-10 w-auto md:h-14,
alt="Hadar Invest". Présent dans la nav du hero ET dans l'en-tête du menu.

Design tokens — ÉTAT RÉEL : tailwind.config.ts ne surcharge QUE `colors` et
`fontFamily`. Il n'y a PAS (encore) de tokens custom spacing / borderRadius /
boxShadow ; on utilise les défauts Tailwind + valeurs arbitraires inline.
Conventions récurrentes de fait (à centraliser plus tard si besoin) :
- rayons : rounded-2xl (carte hero desktop), rounded-full (boutons/pills/vignette
  langue), rounded-s-[2.5rem] (côté intérieur du panneau menu)
- ombre signature (glow ember hover) : shadow-[0_0_24px_rgba(252,122,30,0.45)]
- easing doux réutilisé (Framer) : [0.16, 1, 0.3, 1]

================================================================================
STRUCTURE DES FICHIERS
================================================================================

app/[locale]/
  layout.tsx       — <html lang dir>, dir="rtl" si he, chargement font par locale
  page.tsx         — page d'accueil (Hero vidéo + sections). Contient le composant
                     inline StatNumber (compteur animé) et les data slides/videos.
  MenuOverlay.tsx  — overlay/panneau de menu (client component)
app/fonts/         — latin.ts (Montserrat + Trap), hebrew.ts (Rubik), *.otf Trap
messages/          — fr.json, en.json, he.json (clés i18n next-intl)
public/
  logo/logo.png
  images/hero/     — hero-jerusalem.webp, hero-batyam.webp (4K 3840×2160).
                     Seules ces 2 images subsistent : posters techniques des
                     vidéos + image de la section Positionnement (batyam).
                     hero-telaviv.webp et hero-entrance.webp ont été SUPPRIMÉS.
  videos/          — hero-video-cityscape.mp4 (~4 Mo), hero-video-ramatgan.mp4 (~2,9 Mo)

Clés i18n (messages/*.json) :
- nav : menu, closeMenu, home, method, projects, founder, contact, contactCta
- home.hero.slides.{jerusalem,telaviv,batyam,entrance}.{title,subtitle}
- home.positioning.{title,p1,p2,p3}
- home.stats.{title,experience,transactions,zones}

================================================================================
ÉTAT DES COMPOSANTS (construit & validé)
================================================================================

HERO (page.tsx) — carrousel VIDÉO (uniquement des vidéos, sur TOUS les appareils) :
- 2 vidéos de fond seulement : cityscape (videos[0]) et ramatgan (videos[1]).
- 4 blocs de texte (titre + sous-titre) rattachés par paire à une vidéo :
  slides 0-1 (jerusalem, telaviv) → vidéo cityscape ; slides 2-3 (batyam,
  entrance) → vidéo ramatgan. Le texte change toutes les 6 s ; passer entre 2
  textes d'une même vidéo NE redémarre PAS la vidéo.
- AUCUNE image statique en fond, sur aucun appareil. Les 2 images WebP restantes
  (jerusalem, batyam) ne servent QUE d'attribut `poster` technique (filet
  pendant le très bref chargement initial avant la 1re frame). Plus de branche
  image / plus de matchMedia isDesktop : les vidéos jouent aussi sur mobile
  (autoPlay muted loop playsInline).
- Transition sans résidu : les 2 <video> sont montées en permanence (absolute
  inset-0, preload="auto"), jouent en fond en continu même invisibles ; on ne
  fait que croiser leur opacité (Framer), et seulement une fois la vidéo cible
  prête (état isReady via onCanPlay) → plus de flash noir. Pas de scale Ken Burns
  (provoquait un tremblement) ; willChange:'opacity'.
- Dégradés renforcés : haut from-ink/80 (h-1/5, lisibilité nav) ; bas
  from-ink/90 via-ink/40 (h-2/3, lisibilité titre même sur frames lumineuses).
  Centre dégagé pour voir le ciel / le mouvement.
- Nav overlay : logo image + boutons « Menu » et « Nous contacter » (ce dernier
  hidden sur mobile). Boutons : pill border-linen/30, hover → border-ember +
  glow ember + scale 1.02 (Framer). Vignettes carrousel + bouton flèche flottant
  alignés sur le même centre vertical (bottom-6 md:bottom-12, h-11/md:h-14).

MENU (MenuOverlay.tsx) :
- Desktop (≥ md) : panneau glassmorphique ancré côté « end » (droite en LTR,
  gauche en RTL via classes logiques + dir), largeur w-[70%] md / w-[60%] lg,
  bg-ink/75 + backdrop-blur-2xl, coin intérieur rounded-s-[2.5rem], bordure
  intérieure border-s. Slide depuis le côté ancré. Backdrop cliquable ferme.
- Mobile (< md) : overlay plein écran bg-ink (pas de blur/panneau).
- Texture desktop uniquement : grain SVG (feTurbulence) + halo ember qui suit la
  souris (coordonnées relatives au panneau). Pas de grille/blueprint.
- Liens (icônes Phosphor @phosphor-icons/react, weight light) numérotés 01–04 :
  01 Home (House, scroll top + ferme), 02 Méthode (Compass), 03 Projets
  (Buildings), 04 Fondateur (UserCircle). Contact n'est PAS dans la liste : c'est
  un bouton CTA bg-linen/text-ink avec icône EnvelopeSimple, au-dessus du
  sélecteur de langue (ferme le menu pour l'instant).
- Sélecteur de langue : segmented control FR/EN/HE (pilule bg-linen/10, actif
  bg-linen/text-ink avec indicateur layoutId Framer). RTL correct.

SECTIONS DE PAGE construites (page.tsx, sous le hero) :
- Positionnement (id="next", fond linen clair, texte ink) : titre + 3 paragraphes
  qui apparaissent en cascade au scroll (whileInView, stagger 130 ms, once) +
  image (hero-batyam.webp) qui zoome 0.85→1 liée au scroll (useScroll/
  useTransform). C'est la cible du bouton flèche « défiler » du hero.
- Chiffres (« Hadar en chiffres », fond blue, texte linen, chiffres ember) :
  3 compteurs qui s'incrémentent 0→valeur au scroll (StatNumber, useMotionValue
  + animate, once). ⚠️ VALEURS TEMPORAIRES marquées `// TODO: remplacer par les
  vraies statistiques de Hadar` : 3 ans d'expérience, 40+ transactions
  accompagnées, 3 zones couvertes.
Alternance de fonds validée : Hero (ink) → Positionnement (linen) → Chiffres
(blue), transition-colors douce.

================================================================================
PARCOURS CIBLE DU SITE (nav finale)
================================================================================

Nav / menu : Home / Méthode / Projets / Fondateur  +  bouton Contact
(Achats groupés intégrés dans Méthode, sans lien de menu séparé.)

Parcours prévu :
Hero → Positionnement → Chiffres clés → Méthode → Projets (scroll horizontal
prévu) → Fondateur → Contact
CONSTRUIT à ce jour : Hero, Positionnement, Chiffres. Les liens de menu Méthode /
Projets / Fondateur n'ont pas encore de section cible (pas d'ancre/scroll).

================================================================================
RESTE À FAIRE
================================================================================
- Section Projets : contenu réel des biens (en attente) + scroll horizontal
  (pattern d'animation #5 prévu, à faire quand le contenu sera fourni).
- Chiffres : remplacer les 3 stats TEMPORAIRES par les vraies données Hadar.
- Section Méthode (avec achats groupés intégrés discrètement).
- Section Fondateur.
- Section Contact (le lien/bouton Contact ne fait que fermer le menu pour
  l'instant ; à câbler vers la vraie section une fois construite).
- Ancres de scroll pour les liens de menu Méthode / Projets / Fondateur.
- Vérifier le responsive mobile des nouvelles sections une fois construites.
- (Optionnel) centraliser des tokens spacing/borderRadius/boxShadow dans
  tailwind.config.ts si on veut un vrai design system nommé.

================================================================================
RÈGLES DE TRAVAIL
================================================================================
- Ne jamais hardcoder les API keys
- Toujours `npx tsc --noEmit` avant de commit
- Commits en anglais, format "feat/fix/chore: description"
- Lire CLAUDE.md au début de chaque session Claude Code
- RTL : dir="rtl" dynamique selon la locale HE ; classes logiques Tailwind
  (ms-/me-, ps-/pe-, start-/end-, rounded-s-/rounded-e-) plutôt que ml-/mr- etc.
- Chargement de police conditionnel par locale via next/font
- Tester visuellement desktop ET mobile (iPhone) sur /fr, /en, /he ; vérifier
  que les animations se déclenchent au scroll et non au chargement
